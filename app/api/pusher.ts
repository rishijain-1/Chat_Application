// pages/api/pusher.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: 'your-app-id',
  key: 'your-key',
  secret: 'your-secret',
  cluster: 'your-cluster',
  useTLS: true,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;
    
    // Trigger the event on the Pusher channel
    pusher.trigger('my-channel', 'my-event', { message });

    res.status(200).json({ success: true });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
