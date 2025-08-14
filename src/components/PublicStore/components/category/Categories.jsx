import { useNavigate, useParams } from 'react-router-dom';

const Categories = ({ categories }) => {
  const navigate = useNavigate();
  const { slug } = useParams(); 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => navigate(`/${slug}/${cat.user_id}/category/${cat.id}`)}
        >
          <div className="w-full aspect-square overflow-hidden rounded-t-xl">
            <img
              src={cat.image_url}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;


