import { createRoot } from 'react-dom/client'
import './i18n'
import './responsive.css'
import './design-system.css'
import App from './App'
import ErrorBoundary from './ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
