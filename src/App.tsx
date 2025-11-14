import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Merchandise from './components/Merchandise';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
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

export default App;
