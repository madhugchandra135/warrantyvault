import Tesseract from 'tesseract.js';
import axios from 'axios';
export async function runOcrOnUrl(url) {
  const resp = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(resp.data, 'binary');
  const { data } = await Tesseract.recognize(buffer, 'eng', { logger: m => {} });
  return data.text || '';
}
