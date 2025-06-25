import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseConfig'; 

const PublicStore = () => {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      const { data, error } = await supabase
        .from('personal_data')
        .select('*')
        .eq('public_url', `/${slug}`)
        .single();

      if (error) {
        console.error('❌ Error cargando datos públicos:', error);
      } else {
        setStore(data);
      }

      setLoading(false);
    };

    fetchStore();
  }, [slug]);

  if (loading) return <div>Cargando tienda...</div>;

  if (!store) return <div>No se encontró esta tienda.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{store.brand_name}</h1>
      <p><strong>Dirección:</strong> {store.address}</p>
      <p><strong>Teléfono:</strong> {store.phone}</p>
      <p><strong>Horario:</strong> {store.opening_hours}</p>
      {/* Acá más adelante vas a listar productos */}
    </div>
  );
};

export default PublicStore;

