// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

import client from '../../backend/client';


type UpdateServerCounterResponse = '' | {
  counter: number;
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<UpdateServerCounterResponse>) {
  const {password} = await req.body;
  const site = await client.site.findUnique({where: {id: 1}});

  if (!site || site.password !== password) {
    res.status(401).send('');
    return;
  }

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
