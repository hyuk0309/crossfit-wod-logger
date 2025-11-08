import React, { useState, useRef } from 'react'
import Tesseract from 'tesseract.js'

/**
 * ImageUploader
 * - Accepts image files
 * - Runs Tesseract.js OCR on the selected image
 * - Emits extracted text via onExtract(text)
 * - Emits selected image URL via onImageUrl(url)
 */
export default function ImageUploader({ onExtract, onImageUrl, accept = 'image/*' }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const inputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    onImageUrl?.(url)

    setIsRunning(true)
    setStatus('이미지 분석 시작')
    setProgress(0)
    try {
      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status) setStatus(m.status)
          if (m.progress != null) setProgress(Math.round(m.progress * 100))
        },
      })
      const text = (data?.text || '').trim()
      onExtract?.(text)
      setStatus('완료')
      setProgress(100)
    } catch (err) {
      console.error(err)
      setStatus('에러 발생')
      onExtract?.('')
      alert('OCR 처리 중 오류가 발생했습니다. 콘솔을 확인하세요.')
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setPreviewUrl(null)
    setProgress(0)
    setStatus('')
    onImageUrl?.(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="card" style={{ padding: 12 }}>
      <label className="muted" htmlFor="wod-image">WOD 사진 업로드 (선택)</label>
      <input
        ref={inputRef}
        id="wod-image"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={isRunning}
      />
      {status && (
        <div style={{ marginTop: 8 }}>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
          <div className="muted" style={{ marginTop: 6 }}>상태: {status} {progress ? `(${progress}%)` : ''}</div>
        </div>
      )}
      {previewUrl && (
        <div style={{ marginTop: 12 }}>
          <img src={previewUrl} alt="미리보기" className="preview" />
          <div className="spacer" />
          <button type="button" className="btn secondary" onClick={handleReset}>이미지 제거</button>
        </div>
      )}
    </div>
  )
}
