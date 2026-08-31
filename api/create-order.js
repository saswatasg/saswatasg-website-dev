// Dev mock — no Razorpay SDK, always succeeds
import { z } from 'zod';

const orderSchema = z.object({
  amount: z.number().int().min(100).max(5000000),
  currency: z.enum(['INR']).default('INR'),
  receipt: z.string().max(40).regex(/^[A-Za-z0-9_-]+$/).optional().default('receipt_1'),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const parsed = orderSchema.safeParse(req.body || {});
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0]?.message || 'Invalid request' });
  const { amount, currency, receipt } = parsed.data;
  // Mock order — no external call
  return res.status(200).json({ order_id: `order_mock_${Date.now()}`, amount, currency, receipt, mock: true });
}
