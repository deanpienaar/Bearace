// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

import {Site} from '../../typings/Site';
import client from '../../backend/client';


interface UpdateServerCounterRequest {
  counter: number;
}

interface UpdateServerCounterResponse {
  counter: number;
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<UpdateServerCounterResponse>) {
  const {counter} = req.body;

  const updatedSite: Site = await client.site.update({
    where: {
      id: 1,
    },
    data: {
      counter,
    },
  });

  res.status(200).json({counter: updatedSite.counter});
}
