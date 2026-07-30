import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { SubjectsPage } from './pages/SubjectsPage';
import { LevelsPage } from './pages/LevelsPage';
import { AboutPage } from './pages/AboutPage';
import { ScrollToTop } from './components/layout/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/levels" element={<LevelsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resource/:id" element={<ResourceDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
