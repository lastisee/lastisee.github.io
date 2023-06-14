import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  LayoutRoute
} from "react-router-dom";
import BlogDetail from './pages/BlogDetail';
import MyLayout from './layouts/MyLayout'
import BlogList from './pages/BlogList';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter basename={'/'}>
        <Routes basePath={'/'}>
          <Route path='/' element={<MyLayout />}>
            <Route path='/' element={<App />} />
            <Route path='/javascript' element={<BlogList archiveName='javascript' />} />
            <Route path='/react' element={<BlogList archiveName='react' />} />
            <Route path='/note' element={<BlogList archiveName='note' />} />
            <Route path='/blog' element={<BlogDetail />} />
          </Route>
          
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
