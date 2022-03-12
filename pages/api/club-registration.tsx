import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/utils/mongodb';

export default async function ClubRegistration(
  req: NextApiRequest,
  res: NextApiResponse<ClubRegistrationResponse>
) {
  switch (req.method) {
    case 'POST': {
      const { db } = await clientPromise;
      await db().collection('clubs').insertOne(req.body);
      return res.status(200).json({ success: true });
    }
    default: {
      return res.status(501).send({ success: false });
    }
  }
}

export type ClubRegistrationResponse = {
  success: Boolean;
};
