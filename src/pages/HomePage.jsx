import React from 'react'

export default function HomePage({ onNavigate }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <section className="card" style={{ display: 'grid', gap: 8 }}>
        <h2 style={{ margin: 0 }}>환영합니다 👋</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          이 앱은 이미지 OCR을 활용해 CrossFit WOD를 빠르게 기록하고 조회할 수 있는 프로토타입입니다.
        </p>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn" onClick={() => onNavigate?.('browse')}>WOD 조회</button>
          <button className="btn secondary" onClick={() => onNavigate?.('register')}>WOD 등록</button>
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: 8 }}>
        <h3 style={{ margin: 0 }}>무엇을 할 수 있나요?</h3>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>이미지를 업로드하고 OCR로 텍스트 추출</li>
          <li>텍스트 편집 후 날짜와 함께 저장</li>
          <li>날짜별로 리스트를 조회하고 수정/삭제</li>
        </ul>
      </section>
    </div>
  )
}
