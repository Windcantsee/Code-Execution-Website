import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;
    console.log('Received code:', code); // Log the received code for debugging

    try {
      exec(`python -c "${code}"`, (error, stdout, stderr) => {
        if (error) {
          console.error('Execution error:', stderr); // Log the error for debugging
          res.status(400).json({ status: 'error', error: stderr });
          return;
        }
        res.status(200).json({ status: 'success', result: stdout });
      });
    } catch (error: unknown) {
      console.error('Execution error:', error); // Log the error for debugging
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

