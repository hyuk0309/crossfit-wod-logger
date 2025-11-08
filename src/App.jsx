import React, { useMemo, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import BrowsePage from './pages/BrowsePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

export default function App() {
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), [])

  // simple client-side navigation
  const [view, setView] = useState('home') // 'home' | 'browse' | 'register'

  // in-memory WOD storage
  const [wods, setWods] = useState([])

  const addWod = (wod) => {
    setWods((prev) => [...prev, wod])
    setView('browse')
  }
  const removeWod = (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    setWods((prev) => prev.filter((w) => w.id !== id))
  }
  const updateWod = (next) => {
    setWods((prev) => prev.map((w) => (w.id === next.id ? { ...w, ...next } : w)))
  }

  return (
    <div className="container">
      <header style={{ padding: '16px 0' }}>
        <h1 style={{ marginBottom: 4 }}>CrossFit WOD Logger</h1>
        <p className="muted" style={{ marginTop: 0 }}>이미지 OCR로 운동 기록을 빠르게 저장하세요.</p>

        <nav className="row" style={{ gap: 8, marginTop: 12 }}>
          <button className={`btn ${view === 'home' ? '' : 'secondary'}`} onClick={() => setView('home')}>홈</button>
          <button className={`btn ${view === 'browse' ? '' : 'secondary'}`} onClick={() => setView('browse')}>WOD 조회</button>
          <button className={`btn ${view === 'register' ? '' : 'secondary'}`} onClick={() => setView('register')}>WOD 등록</button>
        </nav>
      </header>

      {view === 'home' && (
        <HomePage onNavigate={setView} />
      )}
      {view === 'browse' && (
        <BrowsePage wods={wods} onUpdateWod={updateWod} onRemoveWod={removeWod} initialDate={todayStr} />
      )}
      {view === 'register' && (
        <RegisterPage onAddWod={addWod} defaultDate={todayStr} />
      )}

      <footer className="muted" style={{ padding: '24px 0' }}>
        <small>Prototype — React + Vite + Tesseract.js</small>
      </footer>
    </div>
  )
}
