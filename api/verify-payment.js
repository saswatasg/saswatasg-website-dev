// Dev mock — always verifies
import { z } from 'zod';

const verifySchema = z.object({
  order_id: z.string().min(1).max(100),
  payment_id: z.string().min(1).max(100),
  signature: z.string().min(1).max(256),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const parsed = verifySchema.safeParse(req.body || {});
  if (!parsed.success) return res.status(400).json({ error: 'Missing fields' });
  return res.status(200).json({ success: true, message: 'Mock verified', mock: true });
}
