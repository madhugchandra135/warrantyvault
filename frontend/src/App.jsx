import React from 'react'
import Upload from './components/Upload'
import Dashboard from './components/Dashboard'
export default function App(){
  return (
    <div className="app">
      <header className="topbar">WarrantyVault</header>
      <main className="container">
        <div className="left">
          <Upload />
        </div>
        <aside className="right">
          <Dashboard />
        </aside>
      </main>
    </div>
  )
}
