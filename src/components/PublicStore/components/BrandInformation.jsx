const BrandInformation = ({ additionalData }) => {
  console.log('additionalData', additionalData);
  const brandUrl = additionalData?.brand_information_url;

  if (!brandUrl) return null; // ✅ No mostrar nada si no hay logo
  console.log('🔗 URL del logo:', brandUrl);
  return (
    <div className="w-full bg-white mt-14">
        <img
          src={brandUrl}
          alt="Logo del negocio"
          className="w-full h-auto object-contain"
        />
    </div>
  );
};


export default BrandInformation;