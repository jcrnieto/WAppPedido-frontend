import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../../config/supabaseConfig'; 
import NavbarUser from '../components/NavbarUser';
import AdditionalDescription from '../components/AdditionalDescription';
import BrandInformation from '../components/BrandInformation';
import Categories from '../components/category/Categories';

const PublicStore = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);

  const [store, setStore] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
  const fetchStore = async () => {
    try {
      // console.log('🔍 Cargando datos públicos para la tienda:', slug);
      const { data: storeData, error: storeError } = await supabase
        .from('personal_data')
        .select('*')
        .eq('public_url', `/${slug}`)
        .maybeSingle(); 
        //  console.log('📦 Datos de la tienda:', storeData);
      if (storeError) throw storeError;
      if (!storeData) throw new Error('Tienda no encontrada');
      setStore(storeData);
       
      const { data: additionalData, error: additionalError } = await supabase
        .from('additional_information_wapppedidos')
        .select('*')
        .eq('user_id', storeData.user_id)
        .maybeSingle();
      if (additionalError) throw additionalError;
      // console.log('📦 Datos adicionales:', additionalData);
      setAdditionalData(additionalData);

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories_wapppedidos')
        .select('*')
        .eq('user_id', storeData.user_id);

      if (categoriesError) throw categoriesError;
      //  console.log('📦 Categorías:', categoriesData);
      setCategories(categoriesData);

    } catch (error) {
      console.error('❌ Error cargando datos públicos:', error);
    } finally {
      setLoading(false);
    }
  };

    fetchStore();
  }, [slug]);

  if (loading) return <div>Cargando tienda...</div>;

  if (!store) return <div>No se encontró esta tienda.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* {console.log('additionalData:', additionalData)} */}
       <NavbarUser store={store} additionalData={additionalData}/>
       <BrandInformation additionalData={additionalData} />
       <AdditionalDescription additionalData={additionalData} /> 
       <Categories categories={categories}/> 
    </div>
  );
};

export default PublicStore;

