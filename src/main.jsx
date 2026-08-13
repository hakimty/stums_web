import { createRoot } from 'react-dom/client'

import { HashRouter } from "react-router-dom";
import './index.css'
// import "./style/global.css"
// import "./style/theme.css"
import AppRouter from './routes/AppRouter.jsx'
import App from './App.jsx';

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <AppRouter/>
    </BrowserRouter>

)