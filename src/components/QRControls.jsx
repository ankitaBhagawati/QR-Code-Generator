import './QRControls.css'

function QRControls({ size, setSize, bgColor, setBgColor, fgColor, setFgColor }) {
  const presets = [
    { label: 'MATRIX', fg: '00ff9d', bg: '0a0a0f' },
    { label: 'CYAN',   fg: '00e5ff', bg: '0a0a0f' },
    { label: 'PINK',   fg: 'ff006e', bg: '0a0a0f' },
    { label: 'CLASSIC',fg: '000000', bg: 'ffffff' },
  ]

  return (
    <div className="controls">
      <div className="control-group">
        <label className="field-label">SIZE_PX — <span className="value-tag">{size}×{size}</span></label>
        <input
          type="range"
          min="150"
          max="500"
          step="50"
          value={size}
          onChange={e => setSize(Number(e.target.value))}
          className="cyber-range"
        />
        <div className="range-ticks">
          {[150, 200, 250, 300, 350, 400, 450, 500].map(v => (
            <span key={v} className={`tick ${v === size ? 'active' : ''}`}>{v}</span>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label className="field-label">COLOR_PRESETS</label>
        <div className="presets-row">
          {presets.map(p => (
            <button
              key={p.label}
              className={`preset-btn ${fgColor === p.fg && bgColor === p.bg ? 'active' : ''}`}
              onClick={() => { setFgColor(p.fg); setBgColor(p.bg); }}
              style={{ '--preset-color': `#${p.fg}` }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="color-row">
        <div className="color-field">
          <label className="field-label">FG_COLOR</label>
          <div className="color-pick-wrap">
            <input
              type="color"
              value={`#${fgColor}`}
              onChange={e => setFgColor(e.target.value.substring(1))}
              className="color-pick"
            />
            <span className="color-hex">#{fgColor.toUpperCase()}</span>
          </div>
        </div>
        <div className="color-field">
          <label className="field-label">BG_COLOR</label>
          <div className="color-pick-wrap">
            <input
              type="color"
              value={`#${bgColor}`}
              onChange={e => setBgColor(e.target.value.substring(1))}
              className="color-pick"
            />
            <span className="color-hex">#{bgColor.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRControls
