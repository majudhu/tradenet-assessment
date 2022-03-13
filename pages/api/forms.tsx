import { sessionOptions } from '@/utils/iron-session';
import clientPromise from '@/utils/mongodb';
import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = (await clientPromise).db().collection('forms');
  switch (req.method) {
    case 'GET': {
      if (req.session.isLoggedIn) {
        if (req.query.formId) {
          const form = await collection.findOne({ _id: req.query.formId });
          return res.status(200).json(form);
        } else {
          const forms = await collection.find().toArray();
          return res.status(200).json(forms);
        }
      } else {
        return res.status(401).json([]);
      }
    }
    case 'POST': {
      req.body.date = new Date();
      await collection.insertOne(req.body);
      return res.status(200).json({ success: true });
    }
    case 'PUT': {
      if (req.session.isLoggedIn) {
        await collection.updateOne({ _id: req.body._id }, req.body);
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({});
      }
    }
    case 'DELETE': {
      if (req.session.isLoggedIn) {
        await collection.deleteOne({ _id: req.body._id });
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({});
      }
    }
    default: {
      return res.status(501).send({ success: false });
    }
  }
},
sessionOptions);
