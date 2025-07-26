import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { supabase } from '../../../config/supabaseConfig';

import DataPersonal from '../components/DataPersonal';
import PostProduct from './PostProduct';
import BusinessHours from '../components/BusinessHours';
import AdditionalInformation from '../components/AdditionalInformation';
import LinkPage from '../components/LinkPage';
// import AddCategories from '../components/categories/AddCategoriesForm';
import CategoryManager from '../components/categories/CategoryManager';

const Admin = () => {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStoreData = async () => {
      const { data, error } = await supabase
        .from('personal_data')
        .select('*')
        .eq('admin_url', `/admin/${slug}`)
        .single();

      if (error) {
        console.error('❌ Error cargando datos del admin:', error);
      } else {
        setStore(data);
      }

      setLoading(false);
    };

    fetchStoreData();
  }, [slug]);

  if (loading) return <div>Cargando datos del comercio...</div>;

  if (!store) return <div>No se encontraron datos para este admin.</div>;
  //console.log('📦 Datos del comercio:', store.user_id);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Panel de {store.brand_name}</h1>
        <UserButton afterSignOutUrl="/login" />
      </header>

      {/* Main content */}
      <main className="p-6 max-w-4xl mx-auto space-y-8">
        <DataPersonal store={store} />
        <BusinessHours storeId={store.id} />
        <AdditionalInformation storeId={store.user_id}/>
        <LinkPage 
          publicUrl={`https://w-app-pedido-frontend.vercel.app/${store.public_url}`} 
          adminUrl={`https://w-app-pedido-frontend.vercel.app/${store.admin_url}`}
        />
        <PostProduct />
        <CategoryManager storeId={store.user_id} />
      </main>
    </div>
  );
};

export default Admin;
