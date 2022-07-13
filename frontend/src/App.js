import React, { useState, useEffect } from 'react'
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import Register from './components/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/user/loginSlice';
import CreateBlog from './components/CreateBlog/CreateBlog';


function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.login)



  useEffect(() => {
    dispatch(loadUser())

  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createblog" element={isAuthenticated === false ? <Navigate to="/login" replace /> : <CreateBlog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
