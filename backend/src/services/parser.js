export function parseReceiptText(text) {
  const out = { vendor: null, invoice_date: null, items: [], price: null, warranty_phrase: null, items_raw: [] };
  const dateRegex = /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/g;
  const dates = text.match(dateRegex);
  if (dates && dates.length) out.invoice_date = dates[0];
  const priceRegex = /(?:₹|Rs\.?|INR)\s?[\d,]+(?:\.\d{1,2})?/i;
  const priceMatch = text.match(priceRegex);
  if (priceMatch) out.price = priceMatch[0];
  const warrRegex = /(?:(warranty|guarantee|warr))[:\s]*((\d+)\s*(months?|years?)|until\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}))/i;
  const w = text.match(warrRegex);
  if (w) out.warranty_phrase = w[0];
  const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
  if (lines.length) out.vendor = lines[0];
  return out;
}
