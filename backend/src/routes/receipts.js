import express from 'express';
import { runOcrOnUrl } from '../services/ocr.js';
import { parseReceiptText } from '../services/parser.js';
import { v4 as uuidv4 } from 'uuid';
import { getPublicUrl } from '../services/storage.js';
const router = express.Router();
const DB = { receipts: [], products: [] };
router.post('/', async (req, res) => {
  const { key, filename } = req.body;
  if (!key) return res.status(400).json({ error: 'missing_key' });
  const receiptId = uuidv4();
  const fileUrl = getPublicUrl(key);
  try {
    const text = await runOcrOnUrl(fileUrl);
    const parsed = parseReceiptText(text);
    DB.receipts.push({ id: receiptId, key, filename, ocr_text: text, parsed });
    const prod = { id: uuidv4(), receipt_id: receiptId, name: parsed.items?.[0]?.name || parsed.vendor || 'Unknown', price: parsed.price || null, invoice_date: parsed.invoice_date || null, warranty_phrase: parsed.warranty_phrase || null, warranty_expires: null };
    DB.products.push(prod);
    return res.json({ id: receiptId, parsed, product: prod });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'ocr_failed' });
  }
});
router.get('/products', (req, res) => {
  res.json(DB.products);
});
export default router;
