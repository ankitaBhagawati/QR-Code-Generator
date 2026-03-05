import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-bracket">[</span>
          <span className="logo-text">QR Bagiwtty</span>
          <span className="logo-bracket">]</span>
        </div>
        <div className="header-meta">
          <span className="status-dot"></span>
          <span className="status-text">SYSTEM ONLINE</span>
        </div>
      </div>
      <div className="header-line"></div>
    </header>
  )
}

export default Header
