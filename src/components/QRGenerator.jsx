import { useEffect, useState } from 'react'
import QRDisplay from './QRDisplay.jsx'
import QRControls from './QRControls.jsx'
import './QRGenerator.css'

function QRGenerator() {
  const [inputText, setInputText] = useState('')
  const [word, setWord] = useState('')
  const [size, setSize] = useState(300)
  const [bgColor, setBgColor] = useState('0a0a0f')
  const [fgColor, setFgColor] = useState('00ff9d')
  const [qrCode, setQrCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (word) {
      setIsGenerating(true)
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(word)}&size=${size}x${size}&bgcolor=${bgColor}&color=${fgColor}&margin=10`
      // small delay for animation effect
      const t = setTimeout(() => {
        setQrCode(url)
        setIsGenerating(false)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [word, size, bgColor, fgColor])

  const handleGenerate = () => {
    if (!inputText.trim()) return
    setWord(inputText.trim())
    setHistory(prev => {
      const updated = [inputText.trim(), ...prev.filter(h => h !== inputText.trim())]
      return updated.slice(0, 5)
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGenerate()
  }

  return (
    <div className="generator-grid">
      <div className="panel panel-left">
        <div className="panel-label">// INPUT</div>

        <div className="input-group">
          <label className="field-label">DATA_STRING</label>
          <div className="input-row">
            <input
              type="text"
              className="cyber-input"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="enter text or URL..."
              spellCheck={false}
            />
            <button className="cyber-btn primary" onClick={handleGenerate}>
              <span className="btn-text">ENCODE</span>
              <span className="btn-arrow">›</span>
            </button>
          </div>
        </div>

        <QRControls
          size={size}
          setSize={setSize}
          bgColor={bgColor}
          setBgColor={setBgColor}
          fgColor={fgColor}
          setFgColor={setFgColor}
        />

        {history.length > 0 && (
          <div className="history-section">
            <div className="field-label">RECENT_ENCODES</div>
            <div className="history-list">
              {history.map((item, i) => (
                <button
                  key={i}
                  className="history-item"
                  onClick={() => { setInputText(item); setWord(item); }}
                >
                  <span className="history-icon">▸</span>
                  <span className="history-text">{item.length > 30 ? item.slice(0, 30) + '…' : item}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="panel panel-right">
        <div className="panel-label">// OUTPUT</div>
        <QRDisplay qrCode={qrCode} isGenerating={isGenerating} word={word} size={size} />
      </div>
    </div>
  )
}

export default QRGenerator
