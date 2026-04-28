import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatest } from "../utils/api";

export default function Latest() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 FETCH DATA
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getLatest(page);
        setData(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchData();
  }, [page]);

  const comics = data?.comics || [];
  const pagination = data?.pagination || {};

  const currentPage = pagination.current_page || page;

  // 🔥 GENERATE PAGE (simple & cocok API kamu)
  const visiblePages = [
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ].filter((p) => p > 0);

  // 🔥 HELPER SLUG
  const getSlug = (url) => {
    try {
      const parts = url.split("/").filter(Boolean);
      return parts[parts.length - 1];
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-bg flex flex-col items-center gap-8 py-6">

      {/* 🔥 TITLE */}
      <div className="w-full max-w-6xl px-3">
        <h1 className="text-lg md:text-xl font-bold text-text">
          Latest Comics
        </h1>
        <p className="text-xs text-secondary-text">
          Komik terbaru yang diperbarui setiap hari!
        </p>
      </div>

      {/* 🔥 GRID */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-3">

        {/* 🔥 LOADING */}
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-xl overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-video bg-bg"></div>
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-bg rounded w-3/4"></div>
                  <div className="h-2 bg-bg rounded w-1/2"></div>
                </div>
              </div>
            ))
          : comics.map((comic, i) => (
              <div
                key={i}
                onClick={() => navigate(`/manga/${getSlug(comic.link)}`)}
                className="
                  bg-card rounded-xl overflow-hidden cursor-pointer
                  border border-transparent
                  hover:border-primary/40
                  hover:bg-primary/10
                  transition-all duration-300
                "
              >
                {/* IMAGE */}
                <div className="w-full aspect-video overflow-hidden">
                  <img
                    src={comic.image}
                    alt={comic.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="p-3 flex flex-col gap-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-text line-clamp-2">
                    {comic.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-secondary-text">
                    {comic.chapter}
                  </p>

                  <p className="text-[10px] sm:text-xs text-secondary-text">
                    {comic.time_ago}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* 🔥 PAGINATION */}
      <div className="flex items-center gap-2 mt-4">

        {/* PREV */}
        <button
          disabled={currentPage === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
          className="
            px-3 py-2 rounded-lg text-sm
            bg-card text-text
            disabled:opacity-40
            hover:bg-primary/10
            transition
          "
        >
          Prev
        </button>

        {/* PAGE NUMBER */}
        {visiblePages.map((p) => (
          <button
            key={p}
            disabled={loading}
            onClick={() => setPage(p)}
            className={`
              px-3 py-2 rounded-lg text-sm
              transition
              ${
                p === currentPage
                  ? "bg-primary text-bg font-bold"
                  : "bg-card text-text hover:bg-primary/10"
              }
            `}
          >
            {p}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={!pagination.has_more || loading}
          onClick={() => setPage((p) => p + 1)}
          className="
            px-3 py-2 rounded-lg text-sm
            bg-card text-text
            disabled:opacity-40
            hover:bg-primary/10
            transition
          "
        >
          Next
        </button>
      </div>

    </div>
  );
}