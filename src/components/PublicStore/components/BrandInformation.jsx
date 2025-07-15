const BrandInformation = ({ additionalData }) => {
  const brandUrl = additionalData?.brand_information_url;

  if (!brandUrl) return null; // ✅ No mostrar nada si no hay logo

  return (
    <div className="w-full bg-white">
        <img
          src={brandUrl}
          alt="Logo del negocio"
          className="w-full h-auto object-contain"
        />
    </div>
  );
};


export default BrandInformation;