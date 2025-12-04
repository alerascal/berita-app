import React from "react";
import { Link } from "react-router-dom";

export default function NewsCard({ berita }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={berita.urlToImage || "https://via.placeholder.com/400x200"}
        alt={berita.title}
        className="rounded-lg mb-3 w-full h-48 object-cover"
      />
      <h2 className="font-semibold text-gray-800 mb-2 text-lg line-clamp-2">
        {berita.title}
      </h2>
      <p className="text-sm text-gray-600 line-clamp-3 mb-3">
        {berita.description || "Tidak ada deskripsi."}
      </p>
      <Link
        to={`/detail/${encodeURIComponent(berita.title)}`}
        className="mt-auto inline-block text-blue-600 font-semibold hover:underline"
      >
        Baca Selengkapnya →
      </Link>
    </div>
  );
}
