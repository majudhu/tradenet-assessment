import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/utils/mongodb';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/utils/iron-session';

export default withIronSessionApiRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await clientPromise;
  switch (req.method) {
    case 'GET': {
      if (req.session) {
        if (req.query.formId) {
          const form = await db()
            .collection('forms')
            .findOne({ _id: req.query.formId });
          return res.status(200).json(form);
        } else {
          const forms = await db().collection('forms').find();
          return res.status(200).json(forms);
        }
      } else {
        return res.status(401).json([]);
      }
    }
    case 'POST': {
      req.body.date = new Date();
      await db().collection('forms').insertOne(req.body);
      return res.status(200).json({ success: true });
    }
    case 'PUT': {
      if (req.session) {
        await db()
          .collection('forms')
          .updateOne({ _id: req.body._id }, req.body);
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({});
      }
    }
    case 'DELETE': {
      if (req.session) {
        await db().collection('forms').deleteOne({ _id: req.body._id });
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
