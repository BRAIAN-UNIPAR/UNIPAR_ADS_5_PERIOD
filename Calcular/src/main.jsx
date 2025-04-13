import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Branco from './Branco'
import Boddy from './Boddy'
import Titulo from './Tittle'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Titulo />
      <main className='Main'>
        <div className="conteudo">
          <Branco />
          <Boddy />
        </div>
      </main>  
    <App />
    
  </StrictMode>,
)
