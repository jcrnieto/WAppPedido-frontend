const AdditionalDescription = ({ additionalData }) => {
    console.log('additionalData:', additionalData);
  return (
    <div className="px-4 py-2 bg-white rounded-lg shadow-md mt-4">
      {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción Adicional</h3> */}
      <p className="text-gray-600">{additionalData?.additional_description || ''}</p>
    </div>
  );
}

export default AdditionalDescription;