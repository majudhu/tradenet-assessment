import { sessionOptions } from '@/utils/iron-session';
import clientPromise from '@/utils/mongodb';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ObjectId } from 'mongodb';
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
          const form = await collection.findOne({
            _id: new ObjectId(req.query.formId as string),
          });
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
        const { _id, ...doc } = req.body;
        const x = await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: doc }
        );
        console.log(x);
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({});
      }
    }
    case 'DELETE': {
      if (req.query.formId) {
        console.log(req.query.formId);
        const x = await collection.deleteOne({
          _id: new ObjectId(req.query.formId as string),
        });
        console.log(x);
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
