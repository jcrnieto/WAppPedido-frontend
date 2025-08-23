import { useOutletContext } from 'react-router-dom';
import Categories from '../components/category/Categories';
import AdditionalDescription from '../components/AdditionalDescription';
import BrandInformation from '../components/BrandInformation';
import AllProductByIdCategoryIsNull from '../components/products/AllProductByIdCategoryIsNull';

const PublicStore = () => {
  const { store, additionalData, categories, loading } = useOutletContext();
  
  if (loading) return <div>Cargando tienda...</div>;
  if (!store) return <div>No se encontró esta tienda.</div>;

  return (
    <div className="px-4 py-4 md:px-2 md:py-0 max-w-2xl mx-auto">
      <BrandInformation additionalData={additionalData} />
      <AdditionalDescription additionalData={additionalData} />
      <Categories categories={categories} />
      <AllProductByIdCategoryIsNull userId={store.user_id} />  
    </div>
  );
};

export default PublicStore;
