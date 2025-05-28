import { createRoot } from 'react-dom/client'
import './index.css'
import { SnackbarProvider } from 'notistack'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <SnackbarProvider autoHideDuration={3000}>
        <App />
    </SnackbarProvider>
)