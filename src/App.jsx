import React from 'react'
import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <div className="container">
      <header style={{ padding: '16px 0' }}>
        <h1>CrossFit WOD Logger</h1>
        <p className="muted">이미지 OCR로 운동 기록을 빠르게 저장하세요.</p>
      </header>
      <HomePage />
      <footer className="muted" style={{ padding: '24px 0' }}>
        <small>Prototype — React + Vite + Tesseract.js</small>
      </footer>
    </div>
  )
}
