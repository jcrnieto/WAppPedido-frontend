import Navbar from '../components/home/NavbarHome';
import Footer from '../components/home/FooterHome';
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