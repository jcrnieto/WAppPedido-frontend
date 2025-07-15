import Navbar from '../components/NavbarHome';
import Footer from '../components/FooterHome';
import { Outlet } from 'react-router-dom';

const LayoutMain = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutMain;