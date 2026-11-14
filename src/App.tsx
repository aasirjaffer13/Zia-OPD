import { AppointmentEnquiry } from './components/AppointmentEnquiry';
import { Contact } from './components/Contact';
import { DoctorProfile } from './components/DoctorProfile';
import { FAQ } from './components/FAQ';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Location } from './components/Location';
import { Navbar } from './components/Navbar';
import { OPDSchedule } from './components/OPDSchedule';
import { Services } from './components/Services';

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <DoctorProfile />
        <Services />
        <OPDSchedule />
        <AppointmentEnquiry />
        <Location />
        <Contact />
        <FAQ />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}

export default App;
