import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSearchResults } from "../utils/api";

export default function SearchResults() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const navigate = useNavigate();

  /* 🔥 FETCH */
  useEffect(() => {
    if (!query) return;

    const delay = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await getSearchResults(query);
        setData(res);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  const results = data?.data || [];

  const getId = (link) => {
    return link.replace("/detail-komik/", "").replaceAll("/", "");
  };

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-bg flex flex-col items-center gap-6 py-6">

      {/* 🔥 TITLE */}
      <div className="w-full max-w-5xl px-3">
        <h1 className="text-lg font-bold text-text">
          Hasil pencarian: "{query}"
        </h1>
        <p className="text-xs text-secondary-text">
          {loading ? "Mencari..." : `${results.length} hasil ditemukan`}
        </p>
      </div>

      {/* 🔥 LIST */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 px-3">

        {/* 🔥 SKELETON */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-3 bg-card p-3 rounded-xl animate-pulse"
            >
              <div className="w-32 h-20 bg-bg rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-bg rounded w-3/4" />
                <div className="h-2 bg-bg rounded w-1/2" />
                <div className="h-2 bg-bg rounded w-full" />
              </div>
            </div>
          ))}

        {/* 🔥 RESULT */}
        {!loading &&
          results.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(`/manga/${getId(item.href)}`)}
              className="
                flex gap-3 bg-card p-3 rounded-xl cursor-pointer
                shadow-sm hover:shadow-md
                hover:bg-primary/5 transition-all duration-300
              "
            >
              {/* IMAGE */}
              <div className="w-32 h-20 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex flex-col justify-between flex-1">

                <div>
                  <h3 className="text-sm font-semibold text-text line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] text-secondary-text">
                      {item.type}
                    </span>

                    {item.genre && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {item.genre}
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-secondary-text mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          ))}

      </div>

      {/* 🔥 EMPTY STATE */}
      {!loading && results.length === 0 && (
        <div className="text-center text-sm text-secondary-text mt-10">
          Tidak ada hasil ditemukan 😢
        </div>
      )}

    </div>
  );
}