import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WishlistProvider } from './context/WishlistContext';

createRoot(document.getElementById('root')).render(
    <WishlistProvider>
        <App />
    </WishlistProvider>,
    document.getElementById('root')
)
