import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;
    try {
      // Save the code to the database (implement your database logic here)
      // For demo purposes, we return the code received
      res.status(200).json({ status: 'success', code });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', error: error.message });
        } else {
            res.status(400).json({ status: 'error', error: 'Unknown error' });
        }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
