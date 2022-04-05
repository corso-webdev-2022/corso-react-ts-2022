const bcrypt = require('bcryptjs');

import save from './save';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    error: string
  }

  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ){
    if (req.method !== 'POST') return res.status(404).json({ error: 'not supported' });
    save(req.body.name, req.body.data);

  }

