import save from './save';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    error?: string,
    ok?: boolean,
  }

  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ){
    if (req.method !== 'POST') return res.status(404).json({ error: 'not supported' });
    console.log('DATA XXXX', req.body);
    save(req.body.name, req.body.value);
    res.status(200).json({ ok: true });

  }

