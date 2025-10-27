import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/clerk-react';

import { supabase } from '../../../config/supabaseConfig';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

import DataPersonal from '../components/DataPersonal';
// import PostProduct from './PostProduct';
import BusinessHours from '../components/BusinessHours';
import AdditionalInformation from '../components/AdditionalInformation';
import LinkPage from '../components/LinkPage';
import CategoryManager from '../components/categories/CategoryManager';
import ProductManager from '../components/products/ProductManager';

function calcDaysLeft(trialEnd) {
  if (!trialEnd) return null;
  const end = new Date(trialEnd).getTime();
  const ms = end - Date.now();
  return Math.max(0, Math.ceil(ms / 86400000));
}

const Admin = () => {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  //header
  const [acct, setAcct] = useState(null);
  
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

  //header
  useEffect(() => {
    const load = async () => {
      if (!store?.user_id) return;
      const { data } = await axios.get(`${baseUrl}/billing/me`, {
        params: { user_id: store.user_id }
      });
      setAcct(data);
    };
    load();
  }, [store]);

  //header
  const daysLeft = calcDaysLeft(acct?.trial_end);
  const isPro = acct?.plan === 'pro' && acct?.subscription_status === 'active';

  if (loading) return <div>Cargando datos del comercio...</div>;

  if (!store) return <div>No se encontraron datos para este admin.</div>;
  //console.log('📦 Datos del comercio:', store.user_id);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Panel de {store.brand_name}</h1>
        {/* centro: estado */}
          <div className="flex-1 flex justify-center">
            {isPro ? (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-300">
                Cuenta PRO activa
              </span>
            ) : daysLeft !== null ? (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border
                ${daysLeft > 3 ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
                Trial: {daysLeft} día{daysLeft === 1 ? '' : 's'} restantes
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-300">
                Sin plan
              </span>
            )}
          </div>
        <UserButton afterSignOutUrl="/login" />
      </header>

      {/* Main content */}
      <main className="p-6 max-w-4xl mx-auto space-y-8">
        <DataPersonal store={store} />
        <BusinessHours storeId={store.user_id} />
        <AdditionalInformation storeId={store.user_id}/>
        <LinkPage 
          publicUrl={`https://w-app-pedido-frontend.vercel.app/${store.public_url}`} 
          adminUrl={`https://w-app-pedido-frontend.vercel.app/${store.admin_url}`}
        />
        {/* <PostProduct /> */}
        <CategoryManager storeId={store.user_id} storeBrandName={store.brand_name} />
        <ProductManager storeId={store.user_id} storeBrandName={store.brand_name}/>
      </main>
    </div>
  );
};

export default Admin;
