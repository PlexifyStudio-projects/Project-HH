import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import HowItWorks from './components/HowItWorks/HowItWorks';
import CareTeam from './components/CareTeam/CareTeam';
import Stories from './components/Stories/Stories';
import Coverage from './components/Coverage/Coverage';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <CareTeam />
        <Stories />
        <Coverage />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
