import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { ThemeProvider } from './ThemeContext';
import ProjectDetails from './pages/ProjectDetail';
import ServiceDetails from './pages/ServiceDetail';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import Blog from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop /> {/* ✅ Just include this here */}
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projectDetail/:_id' element={<ProjectDetails />} />
          <Route path='/serviceDetail/:_id' element={<ServiceDetails />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blogDetail/:_id' element={<BlogDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
