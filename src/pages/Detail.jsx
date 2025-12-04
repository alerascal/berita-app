import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Detail Berita
      </h1>
      <p className="text-gray-600">
        Kamu membuka detail berita: <span className="font-semibold">{id}</span>
      </p>
    </div>
  );
}
