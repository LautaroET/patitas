import React, { useState } from "react";
import Header from "./components/Header";
import MeowFactFooter from './components/MeowFactFooter';
import FavoritesModal from "./components/FavoritesModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FavoritosProvider from "./context/FavoritosContext";
import TemaProvider from "./context/TemaContext";
import AppRouter from "../src/Router/AppRouter"
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter } from 'react-router-dom';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <AuthProvider>   
        <TemaProvider>
          <FavoritosProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-800 transition-colors duration-700 dark:from-gray-950 dark:to-blue-950 dark:text-gray-100">
              <Header onToggleFavorites={toggleModal} />
              <main className="container mx-auto p-4 py-12">
                <AppRouter/>
              </main>
              {isModalOpen && <FavoritesModal onClose={toggleModal} />}
              <MeowFactFooter />
              <ToastContainer position="bottom-right" theme="colored" />
            </div>
          </FavoritosProvider>
        </TemaProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;









