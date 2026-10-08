// Bound both destinations independently: an unavailable archive must not hold
// up delivery, and a stalled email service must release the form.
export async function withRequestDeadline(request, timeoutMs) {
  const controller = new AbortController();
  let timeout;
  const deadline = new Promise((_, reject) => {
    timeout = setTimeout(() => {
      controller.abort();
      reject(new Error("The request took too long."));
    }, timeoutMs);
  });
  try {
    return await Promise.race([
      Promise.resolve().then(() => request(controller.signal)),
      deadline,
    ]);
  } finally {
    clearTimeout(timeout);
  }
}

export async function deliverContactMessage(
  payload,
  { store, fetcher = fetch, archiveTimeout = 4000, deliveryTimeout = 12000 },
) {
  // Start together. Archiving is best effort; only confirmed email delivery
  // earns a success message. Its timeout cannot delay the email request.
  void withRequestDeadline(store, archiveTimeout).catch(() => null);
  const delivery = withRequestDeadline(async (signal) => {
    const response = await fetcher(
      "https://formsubmit.co/ajax/saswatasg@gmail.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal,
      },
    );
    if (!response.ok)
      throw new Error("The message service could not send your message.");
    const result = await response.json();
    if (result.success !== true && result.success !== "true")
      throw new Error("The message service did not confirm delivery.");
  }, deliveryTimeout);
  await delivery;
}
