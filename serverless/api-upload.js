// Vercel function example
export default async function handler(req, res) {
  res.json({ uploadUrl: 'https://example.com/upload', key: 'receipts/demo.jpg' });
}
