import { useOutletContext } from 'react-router-dom';
import Categories from '../components/category/Categories';
import AdditionalDescription from '../components/AdditionalDescription';
import BrandInformation from '../components/BrandInformation';

const PublicStore = () => {
  const { store, additionalData, categories, loading } = useOutletContext();
  console.log('categories:', categories);
  if (loading) return <div>Cargando tienda...</div>;
  if (!store) return <div>No se encontró esta tienda.</div>;

  return (
    <div className="px-4 py-4 md:px-2 md:py-0 max-w-2xl mx-auto">
      <BrandInformation additionalData={additionalData} />
      <AdditionalDescription additionalData={additionalData} />
      <Categories categories={categories} />
    </div>
  );
};

export default PublicStore;
