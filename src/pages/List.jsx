import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getList } from "../utils/api";

export default function List() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* 🔥 FETCH */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getList(page);
        setData(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchData();
  }, [page]);

  const comics = data?.results || [];

  /* 🔥 AMBIL ID MANGA */
  const getId = (link) => {
    return link.replace("/detail-komik/", "").replaceAll("/", "");
  };

  /* 🔥 FORMAT URL CHAPTER */
  const formatChapterUrl = (url) => {
    if (!url) return "/";

    const parts = url.split("/");
    const mangaSlug = parts[2];
    const chapterNum = parts[3];

    return `/chapter/${mangaSlug}-chapter-${chapterNum}`;
  };

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-bg flex flex-col items-center gap-8 py-6">

      {/* 🔥 HEADER */}
      <div className="w-full max-w-6xl px-3">
        <h1 className="text-lg md:text-xl font-bold text-text">
          Library / Pustaka
        </h1>
        <p className="text-xs text-secondary-text">
          Jelajahi semua komik lengkap dengan detail & chapter
        </p>
      </div>

      {/* 🔥 LIST */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 px-3">

        {/* 🔥 SKELETON */}
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-3 bg-card p-3 rounded-xl animate-pulse"
              >
                <div className="w-32 h-20 bg-bg rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-bg rounded w-3/4"></div>
                  <div className="h-2 bg-bg rounded w-1/2"></div>
                  <div className="h-2 bg-bg rounded w-full"></div>
                </div>
              </div>
            ))

          : comics.map((comic, i) => (
              <div
                key={i}
                onClick={() =>
                  navigate(`/manga/${getId(comic.detailUrl)}`)
                }
                className="
                  flex gap-3 bg-card p-3 rounded-xl cursor-pointer
                  hover:bg-primary/5 transition
                "
              >
                {/* 🔥 IMAGE */}
                <div className="w-32 h-20 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={comic.thumbnail}
                    alt={comic.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 🔥 INFO */}
                <div className="flex flex-col justify-between flex-1">

                  {/* TOP */}
                  <div>
                    <h3 className="text-sm font-semibold text-text line-clamp-2">
                      {comic.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">

                      <span className="text-[10px] text-secondary-text">
                        {comic.type}
                      </span>

                      {comic.genre && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/genre/${comic.genre.toLowerCase()}`);
                          }}
                          className="
                            text-[10px] px-2 py-0.5 rounded-full
                            bg-primary/10 text-primary
                            hover:bg-primary/20
                          "
                        >
                          {comic.genre}
                        </button>
                      )}

                    </div>

                    <p className="text-[10px] text-secondary-text mt-1 line-clamp-2">
                      {comic.description}
                    </p>
                  </div>

                  {/* 🔥 BOTTOM */}
                  <div className="flex flex-col gap-2 mt-2">

                    <p className="text-[10px] text-secondary-text">
                      {comic.stats}
                    </p>

                    <div className="flex gap-2">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(formatChapterUrl(comic.firstChapter?.url));
                        }}
                        className="
                          flex-1 text-[10px] py-1 rounded-md
                          bg-bg text-text hover:bg-primary/20
                          transition
                        "
                      >
                        First
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(formatChapterUrl(comic.latestChapter?.url));
                        }}
                        className="
                          flex-1 text-[10px] py-1 rounded-md
                          bg-primary text-bg font-medium
                          hover:opacity-80 transition
                        "
                      >
                        Latest
                      </button>

                    </div>
                  </div>

                </div>
              </div>
            ))}
      </div>

      {/* 🔥 PAGINATION */}
      <div className="flex gap-2 mt-4">

        <button
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
          className="
            px-3 py-2 rounded-lg text-sm
            bg-card text-text
            disabled:opacity-40
            hover:bg-primary/10
          "
        >
          Prev
        </button>

        <span className="px-3 py-2 text-sm text-text bg-card rounded-lg">
          {page}
        </span>

        <button
          disabled={loading}
          onClick={() => setPage((p) => p + 1)}
          className="
            px-3 py-2 rounded-lg text-sm
            bg-card text-text
            hover:bg-primary/10
          "
        >
          Next
        </button>

      </div>

    </div>
  );
}