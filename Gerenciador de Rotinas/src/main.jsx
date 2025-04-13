import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

       <div className='titulo'>
       <h1>Seu Gerenciador de rotinas</h1> 
       </div>
    <div className="main-container">
      
      <div className="app-container">
        <App />
      </div>
    </div>
  </StrictMode>
);
