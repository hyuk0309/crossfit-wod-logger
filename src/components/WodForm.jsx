import React, { useEffect, useMemo, useState } from 'react'
import ImageUploader from './ImageUploader.jsx'

/**
 * WodForm
 * Props:
 * - initialDate: string (YYYY-MM-DD)
 * - initialContent: string
 * - onSubmit: (wod) => void
 * - onCancel?: () => void
 */
export default function WodForm({ initialDate, initialContent = '', onSubmit, onCancel }) {
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const [date, setDate] = useState(initialDate || todayStr)
  const [content, setContent] = useState(initialContent)

  useEffect(() => {
    if (initialDate) setDate(initialDate)
  }, [initialDate])
  useEffect(() => {
    setContent(initialContent || '')
  }, [initialContent])

  const handleExtract = (text) => {
    // Append extracted text to existing content with a separator
    const trimmed = text?.trim() || ''
    if (!trimmed) return
    setContent((prev) => (prev ? prev + '\n\n' + trimmed : trimmed))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date) return alert('날짜를 선택하세요.')
    if (!content.trim()) return alert('운동 내용을 입력하거나 OCR로 불러오세요.')

    const wod = {
      date, // YYYY-MM-DD
      content: content.trim(),
    }
    onSubmit?.(wod)
    // Reset
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
      <div>
        <label className="muted" htmlFor="wod-date">운동 날짜</label>
        <input id="wod-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <ImageUploader onExtract={handleExtract} />

      <div>
        <label className="muted" htmlFor="wod-content">운동 내용</label>
        <textarea id="wod-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder={`예)\n- For time: 21-15-9 thrusters & pull-ups\n- Time: 12:34`}></textarea>
      </div>

      <div className="row" style={{ justifyContent: 'flex-end' }}>
        {onCancel && (
          <button type="button" className="btn secondary" onClick={onCancel}>취소</button>
        )}
        <button type="submit" className="btn">저장</button>
      </div>
    </form>
  )
}
