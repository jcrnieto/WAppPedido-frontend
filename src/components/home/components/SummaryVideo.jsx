const SummaryVideo = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Cómo funciona la aplicación
      </h2>

      <div className="w-full max-w-2xl aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Video de ejemplo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default SummaryVideo;
