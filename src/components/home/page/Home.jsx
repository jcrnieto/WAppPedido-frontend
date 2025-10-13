import AddresedTo from '../components/AddressesTo';
import CardsPlans from '../components/CardsPlans';
import CommonQuestions from '../components/CommonQuestions';
import ContactForm from '../components/ContactForm';
import FeatureCards from '../components/FeatureCards';
import Functionalities from '../components/functionalities';
import HowItWorks from '../components/HowItsWorks';
import { WhatsAppFloat } from '../components/WhatsApp';

const Home = () => {
  return (
    <div>
      <AddresedTo />
      <FeatureCards />
      <Functionalities />
      <HowItWorks />
      <CommonQuestions />
      <CardsPlans /> 
      <ContactForm />
      <WhatsAppFloat />
    </div>
  );
};

export default Home;

