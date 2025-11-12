import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUploadUrl } from '../services/storage.js';
const router = express.Router();
router.get('/url', async (req, res) => {
  const filename = req.query.filename || `${Date.now()}.jpg`;
  const key = `receipts/${uuidv4()}-${filename}`;
  try {
    const uploadUrl = await getSignedUploadUrl(key, req.query.contentType || 'image/jpeg');
    return res.json({ uploadUrl, key });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'upload-url-failed' });
  }
});
export default router;
