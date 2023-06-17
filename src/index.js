import React from 'react';
import ReactDOM from 'react-dom/client';
import MobileDetect from 'mobile-detect'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import BlogDetail from './pages/BlogDetail';
import MyLayout from './layouts/MyLayout'
import MyLayoutM from './layouts/MyLayoutM'
import BlogList from './pages/BlogList';
import HomeM from './pages/mobile/HomeM';
import NotFound from './pages/NotFound';
import BlogListM from './pages/mobile/BlogListM';
import BlogDetailM from './pages/mobile/BlogDetailM';

const root = ReactDOM.createRoot(document.getElementById('root'));
const deviceType = new MobileDetect(window.navigator.userAgent)
const reg = /(Mobile|Android|iPhone|BlackBerry|iPod|Windows Phone)/i
const isWeb = !reg.test(deviceType.ua)

root.render(
  <React.StrictMode>
    <BrowserRouter basename={'/'}>
        <Routes basePath={'/'}>
          {isWeb ?<Route path='/' element={<MyLayout />}>
            <Route path='/*' element={<NotFound />} />
            <Route path='/' element={<App />} />
            <Route path='/javascript' element={<BlogList archiveName='javascript' />} />
            <Route path='/react' element={<BlogList archiveName='react' />} />
            <Route path='/note' element={<BlogList archiveName='note' />} />
            <Route path='/blog/:id' element={<BlogDetail />} />
          </Route>
          :
          <Route path='/' element={<MyLayoutM />}>
              <Route path='/*' element={<NotFound />} />
              <Route path='/' element={<HomeM />} />
              <Route path='/javascript' element={<BlogListM archiveName='javascript' />} />
              <Route path='/react' element={<BlogListM archiveName='react' />} />
              <Route path='/note' element={<BlogListM archiveName='note' />} />
              <Route path='/blog/:id' element={<BlogDetailM />} />
          </Route>}
          
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
