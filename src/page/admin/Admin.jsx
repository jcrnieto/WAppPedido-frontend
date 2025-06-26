import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { supabase } from '../../config/supabaseConfig';

import DataPersonal from './DataPersonal';
import PostProduct from './PostProduct';
import BusinessHours from './BusinessHours';
import AdditionalInformation from './AdditionalInformation';

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
        <AdditionalInformation storeId={store.id}/>
        <PostProduct />
      </main>
    </div>
  );
};

export default Admin;
