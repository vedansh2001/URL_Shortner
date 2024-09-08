import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import ShortenedURL from './pages/ShortenedURL.jsx'
import Analytics from './pages/Analytics.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/shortened/:shortId' element={<ShortenedURL/>} />
        <Route path='/analytics/:shortId' element={<Analytics/>} />
      </Routes>
    </Router>
    
  </StrictMode>,
)
