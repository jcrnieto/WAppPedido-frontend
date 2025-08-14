import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../../config/supabaseConfig";
import NavbarUser from "../../PublicStore/components/NavbarUser";

const PublicLayout = () => {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // datos personales
        const { data: storeData, error: storeError } = await supabase
          .from("personal_data")
          .select("*")
          .eq("public_url", `/${slug}`)
          .maybeSingle();

        if (storeError) throw storeError;
        if (!storeData) throw new Error("Tienda no encontrada");

        setStore(storeData);

        // info adicional
        const { data: addData, error: addError } = await supabase
          .from("additional_information_wapppedidos")
          .select("*")
          .eq("user_id", storeData.user_id)
          .maybeSingle();

        if (addError) throw addError;
        setAdditionalData(addData);

        const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories_wapppedidos')
        .select(`*, products_wapppedidos (*)`)
        .eq('user_id', storeData.user_id);

        if (categoriesError) throw categoriesError;
        //  console.log('📦 Categorías:', categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("❌ Error cargando layout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div>Cargando...</div>;
  if (!store) return <div>No se encontró esta tienda.</div>;

  return (
    <div className="pt-20 max-w-2xl mx-auto">
      <NavbarUser store={store} additionalData={additionalData} />
      <Outlet context={{ store, additionalData, categories }} />
    </div>
  );
};

export default PublicLayout;
