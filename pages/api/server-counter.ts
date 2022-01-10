// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

import client from '../../backend/client';


interface UpdateServerCounterResponse {
  counter: number;
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<UpdateServerCounterResponse>) {
  await client.site.update({
    where: {
      id: 1,
    },
    data: {
      lastIncident: new Date(),
    },
  });

  res.status(200).json({counter: 0});
}
