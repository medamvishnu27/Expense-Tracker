import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

AOS.init(); // Initialize AOS

createRoot(document.getElementById('root')).render(
    <App />
);