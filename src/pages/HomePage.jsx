import React, { useMemo, useState } from 'react'
import WodForm from '../components/WodForm.jsx'

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function HomePage() {
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const [selectedDate, setSelectedDate] = useState(todayStr)
  const [wods, setWods] = useState([])
  const [editingId, setEditingId] = useState(null)

  const wodsForDate = useMemo(
    () => wods.filter((w) => w.date === selectedDate).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    [wods, selectedDate]
  )

  const addWod = (wod) => {
    setWods((prev) => [...prev, wod])
  }

  const removeWod = (id) => {
    if (!confirm('삭제하시겠습니까?')) return
    setWods((prev) => prev.filter((w) => w.id !== id))
  }

  const updateWod = (next) => {
    setWods((prev) => prev.map((w) => (w.id === next.id ? { ...w, ...next } : w)))
    setEditingId(null)
  }

  const startEdit = (id) => setEditingId(id)
  const cancelEdit = () => setEditingId(null)

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <section className="card">
        <div className="row">
          <div className="col">
            <label className="muted" htmlFor="home-date">조회 날짜</label>
            <input id="home-date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
        </div>
        <div className="spacer" />
        <WodForm initialDate={selectedDate} onSubmit={addWod} />
      </section>

      <section>
        <h2 style={{ margin: '8px 0' }}>{selectedDate}의 WOD 목록</h2>
        {wodsForDate.length === 0 ? (
          <p className="muted">아직 등록된 WOD가 없습니다. 상단 폼에서 추가하세요.</p>
        ) : (
          <div className="list">
            {wodsForDate.map((w) => (
              <article key={w.id} className="card" style={{ display: 'grid', gap: 8 }}>
                <header className="row" style={{ alignItems: 'center' }}>
                  <div className="col">
                    <strong>작성 시각:</strong> <span className="muted">{formatTime(w.createdAt)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn secondary" onClick={() => startEdit(w.id)}>수정</button>
                    <button className="btn danger" onClick={() => removeWod(w.id)}>삭제</button>
                  </div>
                </header>

                {editingId === w.id ? (
                  <WodForm
                    initialDate={w.date}
                    initialDescription={w.description}
                    initialImageUrl={w.imageUrl}
                    onSubmit={(edited) => updateWod({ ...edited, id: w.id, createdAt: w.createdAt })}
                    onCancel={cancelEdit}
                  />
                ) : (
                  <details>
                    <summary>상세 보기</summary>
                    <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
                      {w.imageUrl && (
                        <img src={w.imageUrl} className="preview" alt="업로드 이미지" />
                      )}
                      <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{w.description}</pre>
                    </div>
                  </details>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
