import { useEffect, useState } from "react";

function NewsCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>🕒</span>
          <span>{new Date(article.publishedAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{article.source.name}</span>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 text-sm font-semibold hover:text-blue-700"
          >
            Baca Selengkapnya →
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("indonesia");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Terkini", query: "indonesia", icon: "📰" },
    { name: "Teknologi", query: "teknologi", icon: "💻" },
    { name: "Bisnis", query: "bisnis ekonomi", icon: "💼" },
    { name: "Olahraga", query: "olahraga sepak bola", icon: "⚽" },
  ];

  const fetchNews = async (query) => {
  setLoading(true);
  try {
    const apiKey = "4549685ccbaf45d09330934738a54182";
    const encodedUrl = encodeURIComponent(
      `https://newsapi.org/v2/everything?q=${query}&language=id&sortBy=publishedAt&apiKey=${apiKey}`
    );

    const res = await fetch(`https://api.allorigins.win/get?url=${encodedUrl}`);
    const data = await res.json();

    const parsedData = JSON.parse(data.contents); // hasil JSON di dalam string
    console.log("Data dari API:", parsedData);
    setArticles(parsedData.articles.slice(0, 12));
  } catch (error) {
    console.error("Error fetching news:", error);
  }
  setLoading(false);
};


  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchNews(searchQuery);
      setCategory("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">BeritaKu</h1>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span 
                  className="absolute left-3 top-2.5 cursor-pointer text-lg" 
                  onClick={handleSearch}
                >
                  🔍
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-2xl"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span 
                className="absolute left-3 top-2.5 cursor-pointer text-lg" 
                onClick={handleSearch}
              >
                🔍
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex md:gap-1 py-2`}>
            {categories.map((cat) => (
              <button
                key={cat.query}
                onClick={() => {
                  setCategory(cat.query);
                  setSearchQuery("");
                  setMobileMenuOpen(false);
                }}
                className={`w-full md:w-auto flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  category === cat.query
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Memuat berita...</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : `Berita ${categories.find(c => c.query === category)?.name || 'Terkini'}`}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <NewsCard key={i} article={article} />
              ))}
            </div>

            {articles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Tidak ada berita ditemukan</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
           Portal berita terkini Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;