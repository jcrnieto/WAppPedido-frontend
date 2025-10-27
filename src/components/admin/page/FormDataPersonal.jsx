import { useUser, useAuth } from '@clerk/clerk-react';
import { useState } from 'react';

import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
// const mpLink = import.meta.env.VITE_MP_PRO_LINK;
// console.log('mpLink:', mpLink);

const FormDataPersonal = () => {
    const { getToken } = useAuth();
    const { user } = useUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
    console.log('este es el email',email)

    const [form, setForm] = useState({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        brand_name: '',
        auth_user_id:'',
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

        // if (!mpLink || !/^https?:\/\//.test(mpLink)) {
        //     alert('Link de suscripción no configurado');
        //     return;
        // }
        // 1) una nueva pestaña a Mercado Pago
        // const mpWin = window.open(mpLink, '_blank');

        if (!user || !email) {
            console.error('❌ Usuario no cargado');
            return;
        }

        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const { data } = await axios.get(`${baseUrl}/users/by-email/${email}`);
            const supabaseUserId = data?.id;

            if (!supabaseUserId) {
                console.error('❌ No se encontró el usuario en Supabase');
                return;
            }

            console.log('Supabase User ID:', supabaseUserId);
            console.log('Form Data:', form);
            console.log('user', user);

            const response = await axios.post(`${baseUrl}/personalData/createPersonalData`, {
                user_id: supabaseUserId,
                full_name: form.full_name,
                phone: form.phone,
                address: form.address,
                city: form.city,
                brand_name: form.brand_name,
                auth_user_id: user.id,
            });

            console.log('✅ Datos guardados en Supabase:', response.data);

            // pedir link dinámico (con external_reference=user_id)
            const { data: linkRes } = await axios.post(
                `${baseUrl}/account/create-subscription-link`,
                {},
                { headers }
            );
            const link = linkRes?.link;
            if (!link) throw new Error('No se pudo generar link de suscripción');

            const mpWin = window.open(link, '_blank');

            // marcar estado pending
            await axios.post(`${baseUrl}/account/mark-pending`, { user_id: supabaseUserId }, { headers });

            // enviar pestaña a Mercado Pago y redirigir admin
            if (mpWin && !mpWin.closed) mpWin.location.href = link;

             // Redirigír admin automáticamente
            const formattedUrl = form.brand_name.trim().toLowerCase().replace(/\s+/g, '-');
            const adminUrl = `/admin/${formattedUrl}`;
            // const publicUrl = `/${formattedUrl}`;

            window.location.href = adminUrl;

        } catch (error) {
            // Si falló, cerrá la pestaña abierta y logueá
            // if (mpWin && !mpWin.closed) mpWin.close();
            console.error('❌ Error al enviar datos personales:', error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 max-w-md w-full bg-white shadow-md rounded">
                <h1 className="text-xl font-bold mb-4 text-center">Formulario de datos personales</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input name="full_name" placeholder="Nombre completo" onChange={handleChange} required className="border p-2 rounded" />
                    <input name="phone" placeholder="Teléfono" onChange={handleChange} required className="border p-2 rounded" />
                    <input name="address" placeholder="Dirección" onChange={handleChange} required className="border p-2 rounded" />
                    <input name="city" placeholder="Ciudad" onChange={handleChange} required className="border p-2 rounded" />
                    <input name="brand_name" placeholder="Nombre del comercio" onChange={handleChange} required className="border p-2 rounded" />
                    <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Guardar y continuar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormDataPersonal;
