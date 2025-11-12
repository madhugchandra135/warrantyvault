import React, {useEffect, useState} from 'react';
import axios from 'axios';
export default function Dashboard(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ fetchItems() },[]);
  async function fetchItems(){ const r=await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/receipts/products`); setItems(r.data || []); }
  return (
    <div className="card">
      <h3>Products</h3>
      <ul>
        {items.map(it=> <li key={it.id}><strong>{it.name}</strong> <br /><small className="muted">expires: {it.warranty_expires || 'unknown'}</small></li>)}
      </ul>
    </div>
  )
}
