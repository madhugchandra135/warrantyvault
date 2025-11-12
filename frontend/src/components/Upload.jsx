import React, {useState} from 'react';
import axios from 'axios';
export default function Upload(){
  const [file,setFile] = useState(null);
  const [status,setStatus] = useState('');
  async function onSubmit(e){
    e.preventDefault();
    if(!file) return alert('pick a file');
    setStatus('Requesting upload URL...');
    const resp = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/upload/url?filename=${encodeURIComponent(file.name)}`);
    const { uploadUrl, key } = resp.data;
    setStatus('Uploading to storage...');
    await axios.put(uploadUrl, file, { headers: { 'Content-Type': file.type }});
    setStatus('Triggering OCR & parse...');
    const create = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/receipts`, { key, filename: file.name });
    setStatus('Done — parsed: ' + (create.data.parsed && JSON.stringify(create.data.parsed).slice(0,200)));
  }
  return (
    <div className="card">
      <h3>Upload receipt</h3>
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/*,application/pdf" onChange={e=>setFile(e.target.files[0])} />
        <button type="submit">Upload & Parse</button>
      </form>
      <div style={{marginTop:10}}><small className="muted">{status}</small></div>
    </div>
  )
}
