import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import SuppliersBrowsing from '@/components/SuppliersBrowsing/SuppliersBrowsing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <SuppliersBrowsing />
    </>
  )
}

export default App
