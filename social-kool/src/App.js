import Header from './Header';
import React from 'react';
import Signin from './pages/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element="首頁">首頁</Route>
                <Route path="/signin" element={<Signin />}>註冊登入</Route>
            </Routes>
        </BrowserRouter>  
    )
}