import { useState } from "react";
import { ClipboardCopy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const LinkPage = ({ publicUrl, adminUrl }) => {
  const [copied, setCopied] = useState("");

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast.success("¡Link copiado al portapapeles!");
      setTimeout(() => setCopied(""), 2000); // Ocultar "copiado" después de 2 seg
    } catch (err) {
      console.error("❌ Error al copiar:", err);
      toast.error("No se pudo copiar el link.");
    }
  };

  const renderLink = (label, url, type) => (
    <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded mb-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm break-all"
      >
        {label}
      </a>
      <button
        onClick={() => handleCopy(url, type)}
        className="text-gray-600 hover:text-blue-600 ml-2"
        title="Copiar"
      >
        {copied === type ? <CheckCircle2 size={20} /> : <ClipboardCopy size={20} />}
      </button>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">🔗 Links del comercio</h2>
      {renderLink("🌍 Link público (para clientes)", publicUrl, "public")}
      {renderLink("🔐 Link de administración (privado)", adminUrl, "admin")}
    </div>
  );
};

export default LinkPage;
