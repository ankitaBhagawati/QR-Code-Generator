import QRGenerator from './components/QRGenerator.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <QRGenerator />
      </main>
    </div>
  )
}

export default App
