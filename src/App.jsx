import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import { Header } from './components/organisms/Header'; // Header теперь вынесен отдельно в HomePage, либо можно вернуть его сюда
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage'; // <--- Импорт
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/organisms/AuthModal';

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        {/* AuthModal доступен везде */}
        <AuthModal />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={ // <--- Новый роут
                <>
                    <Header /> {/* Хедер нужен и на странице профиля */}
                    <ProfilePage />
                </>
            } />
          </Routes>
        </main>
        
      </MainLayout>
    </AuthProvider>
  );
}

export default App;