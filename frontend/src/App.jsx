import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './index.css';
import Register from './components/register';
import Login from './components/login';
import Post from './components/post';
import Feed from './components/feed';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/post' element={<Post />} />
                <Route path='/feed' element={<Feed />} />

            </Routes>
        </Router>
    );
};

export default App;
