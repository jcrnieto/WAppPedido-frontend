const AdditionalDescription = ({ additionalData }) => {
    //console.log('additionalData:', additionalData);
  return (
    <div className="px-4 py-2 bg-white rounded-lg shadow-md mt-4">
      <p className="text-gray-600">{additionalData?.additional_description || ''}</p>
    </div>
  );
}

export default AdditionalDescription;