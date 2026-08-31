import { useState } from 'react';

// Mock checkout for dev fork — no Razorpay script, no API, always succeeds after 900ms
export default function RazorpayCheckout({
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
  amount = 100,
  currency = 'INR',
  buttonText = 'Pay',
  disabled = false,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const openCheckout = async () => {
    if (disabled) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    // Simulate network
    await new Promise((r) => setTimeout(r, 900));
    try {
      const fakeId = `pay_mock_${Date.now()}`;
      const fakeOrder = `order_mock_${Date.now()}`;
      setSuccess(`Mock payment — ID: ${fakeId} (no charge)`);
      onSuccess({ razorpay_payment_id: fakeId, razorpay_order_id: fakeOrder, razorpay_signature: 'mock' });
    } catch (e) {
      setError(e.message);
      onError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={openCheckout}
        disabled={loading || disabled}
        className="w-full bg-coral hover:bg-coral/90 disabled:bg-ink/20 disabled:text-ink/40 disabled:border-ink/20 disabled:cursor-not-allowed text-white font-black text-base border-2 border-black rounded-xl px-6 py-4 transition-all flex items-center justify-center gap-2"
        style={{ boxShadow: disabled ? 'none' : '4px 4px 0px 0px #0A0A0A' }}
      >
        {loading ? 'Opening checkout…' : buttonText}
      </button>
      {error && <p className="mt-3 text-sm font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
      {success && <p className="mt-3 text-sm font-bold text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{success} — dev mock, no charge.</p>}
      <p className="text-[11px] font-bold text-ink/30 mt-2 text-center">Dev mock — no Razorpay charge. Use prod for real payments.</p>
    </div>
  );
}

export { RazorpayCheckout };
