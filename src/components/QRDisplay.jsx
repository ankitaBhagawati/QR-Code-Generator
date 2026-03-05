import { useState } from 'react'
import './QRDisplay.css'

function QRDisplay({ qrCode, isGenerating, word, size }) {
  const [copied, setCopied] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleCopyURL = async () => {
    if (!word) return
    try {
      await navigator.clipboard.writeText(word)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="qr-display">
      <div className={`qr-frame ${isGenerating ? 'scanning' : ''} ${qrCode && imgLoaded ? 'has-code' : ''}`}>
        {!qrCode && !isGenerating && (
          <div className="qr-placeholder">
            <div className="placeholder-grid">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className="placeholder-cell" style={{ animationDelay: `${(i * 0.03) % 1.5}s` }} />
              ))}
            </div>
            <p className="placeholder-text">AWAITING INPUT</p>
          </div>
        )}

        {isGenerating && (
          <div className="scanning-state">
            <div className="scan-line" />
            <p className="scan-text">ENCODING...</p>
          </div>
        )}

        {qrCode && !isGenerating && (
          <img
            src={qrCode}
            alt="Generated QR Code"
            className={`qr-image ${imgLoaded ? 'loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(false)}
          />
        )}

        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
      </div>

      {qrCode && (
        <div className="qr-meta">
          <div className="meta-row">
            <span className="meta-label">CHARS</span>
            <span className="meta-value">{word.length}</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">SIZE</span>
            <span className="meta-value">{size}px</span>
          </div>
        </div>
      )}

      <div className="action-row">
        <a
          href={qrCode || '#'}
          download="qrcode.png"
          className={`cyber-btn download-btn ${!qrCode ? 'disabled' : ''}`}
          onClick={e => !qrCode && e.preventDefault()}
        >
          ↓ DOWNLOAD
        </a>
        <button
          className={`cyber-btn copy-btn ${!qrCode ? 'disabled' : ''} ${copied ? 'copied' : ''}`}
          onClick={handleCopyURL}
          disabled={!qrCode}
        >
          {copied ? '✓ COPIED' : '⎘ COPY TEXT'}
        </button>
      </div>
    </div>
  )
}

export default QRDisplay
