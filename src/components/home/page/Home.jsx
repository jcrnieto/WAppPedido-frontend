// import { Link } from 'react-router-dom';
import AddresedTo from '../components/AddressesTo';
import CardsPlans from '../components/CardsPlans';
import CommonQuestions from '../components/CommonQuestions';
import ContactForm from '../components/ContactForm';
import FeatureCards from '../components/FeatureCards';
import Functionalities from '../components/Functionalities';
import HowItWorks from '../components/HowItsWorks';
import { WhatsAppFloat } from '../components/WhatsApp';
// import SummaryVideo from '../components/SummaryVideo';

const Home = () => {
  return (
    <div>
      <AddresedTo />
      <FeatureCards />
      <Functionalities />
      <HowItWorks />
      {/* <SummaryVideo />  */}
      <CommonQuestions />
      <CardsPlans /> 
      <ContactForm />
      <WhatsAppFloat />
    </div>
    // <div className="flex flex-col items-center justify-center py-20">
    //   <h1 className="text-3xl font-bold mb-8">Home Page</h1>
    //   <Link
    //     to="/register"
    //     className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
    //   >
    //     Contratar el servicio
    //   </Link>

    //   <Link
    //     to="/login"
    //     className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
    //   >
    //     Loguearse
    //   </Link>
    // </div>
    
  );
};

export default Home;

