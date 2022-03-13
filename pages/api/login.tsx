import { sessionOptions } from '@/utils/iron-session';
import clientPromise from '@/utils/mongodb';
import argon2 from '@node-rs/argon2';
import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = (await clientPromise).db().collection('users');

  // uncomment the follwing lines to create the default user
  // await collection
  //   .insertOne({
  //     email: 'testuser@youth.gov.mv',
  //     password: await argon2.hash('welcome123'),
  //   });

  switch (req.method) {
    case 'GET': {
      if (req.session.isLoggedIn) {
        return res.status(200).json(req.session);
      } else {
        return res.status(401).json({});
      }
    }
    case 'POST': {
      const user = await collection.findOne({ email: req.body.email });
      if (
        user &&
        (await argon2.verify(user.password ?? '', req.body.password))
      ) {
        req.session.isLoggedIn = true;
        req.session.email = req.body.email;
        await req.session.save();
        return res.status(200).json(req.session);
      }
      return res.status(401).json({});
    }
    case 'DELETE': {
      req.session.destroy();
      return res.status(200).json({});
    }
    default: {
      return res.status(501).send({ success: false });
    }
  }
},
sessionOptions);
