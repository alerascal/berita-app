import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBerita = async (query = "indonesia") => {
    setLoading(true);
    try {
      const apiKey = "4549685ccbaf45d09330934738a54182";
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&language=id&apiKey=${apiKey}`
      );
      setBerita(res.data.articles.slice(0, 12)); // tampilkan 12 berita
    } catch (error) {
      console.error("Gagal ambil data berita:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Berita Terkini
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Memuat berita...</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {berita.map((item, i) => (
            <NewsCard key={i} berita={item} />
          ))}
        </div>
      )}
    </div>
  );
}
