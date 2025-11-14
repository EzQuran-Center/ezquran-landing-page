import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Merchandise from './components/Merchandise';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Registration from './components/Registration';
import { AuthProvider } from './contexts/AuthContext';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <Merchandise />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<><Navbar /><Registration /><Footer /></>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
