const AdditionalDescription = ({ additionalData }) => {
  const description = additionalData?.additional_description?.trim();

  if (!description) return null;

  return (
    <div className="px-4 py-2 bg-white rounded-lg shadow-md mt-12 text-center">
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AdditionalDescription;