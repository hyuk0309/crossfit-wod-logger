import React, { useMemo } from 'react'
import WodForm from '../components/WodForm.jsx'

export default function RegisterPage({ onAddWod, defaultDate }) {
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const initialDate = defaultDate || todayStr

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <section>
        <h2 style={{ margin: '8px 0' }}>WOD 등록</h2>
        <p className="muted" style={{ marginTop: 0 }}>이미지를 업로드하면 OCR로 텍스트를 추출해 드립니다.</p>
      </section>

      <WodForm initialDate={initialDate} onSubmit={onAddWod} />
    </div>
  )
}
