import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';

import axios from 'axios';

const FormDataPersonal = () => {
    const { user } = useUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    const [form, setForm] = useState({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        brand_name: '',        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !email) {
            console.error('❌ Usuario no cargado');
            return;
        }

        try {
            const { data } = await axios.get(`http://localhost:3000/api/users/by-email/${email}`);
            const supabaseUserId = data?.id;

            if (!supabaseUserId) {
                console.error('❌ No se encontró el usuario en Supabase');
                return;
            }

            console.log('Supabase User ID:', supabaseUserId);
            console.log('Form Data:', form);
            console.log('user', user);

            const response = await axios.post('http://localhost:3000/api/personalData/createPersonalData', {
                id: supabaseUserId,
                full_name: form.full_name,
                phone: form.phone,
                address: form.address,
                city: form.city,
                brand_name: form.brand_name,
            });

            console.log('✅ Datos guardados en Supabase:', response.data);

            const formattedUrl = form.brand_name.trim().toLowerCase().replace(/\s+/g, '-');
            const adminUrl = `/admin/${formattedUrl}`;
            const publicUrl = `/${formattedUrl}`;

            window.location.href = adminUrl;

        } catch (error) {
            console.error('❌ Error al enviar datos personales:', error);
        }
    };
    return (
        <div className="p-6 max-w-md mx-auto bg-gray-100">
            <h1 className="text-xl font-bold mb-4">Formulario de datos personales</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="full_name" placeholder="Nombre completo" onChange={handleChange} required />
                <input name="phone" placeholder="Teléfono" onChange={handleChange} required />
                <input name="address" placeholder="Dirección" onChange={handleChange} required />
                <input name="city" placeholder="Ciudad" onChange={handleChange} required />
                <input name="brand_name" placeholder="Nombre del comercio" onChange={handleChange} required />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Guardar y continuar
                </button>
            </form>
        </div>
    );
};

export default FormDataPersonal;
