import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHome } from "../utils/api";
import { Flame, RefreshCw, List, Clock } from "lucide-react";

export default function Home() {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getHome().then(setData);
  }, []);

  useEffect(() => {
    if (!data?.latest) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.latest.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [data]);

  const genres = [
    { value: "action", name: "Action" },
    { value: "adventure", name: "Adventure" },
    { value: "comedy", name: "Comedy" },
    { value: "drama", name: "Drama" },
    { value: "fantasy", name: "Fantasy" },
    { value: "isekai", name: "Isekai" },
    { value: "romance", name: "Romance" },
    { value: "school-life", name: "School" },
    { value: "sci-fi", name: "Sci-fi" },
    { value: "seinen", name: "Seinen" },
    { value: "shounen", name: "Shounen" },
    { value: "slice-of-life", name: "Slice" },
    { value: "sports", name: "Sports" },
    { value: "supernatural", name: "Supernatural" },
    { value: "thriller", name: "Thriller" },
  ];

  const list = (data?.latest || []).filter(
    (item) =>
      !item.title.toLowerCase().includes("komiku") &&
      !item.title.toLowerCase().includes("apk")
  );

  const getIndex = (i) => (i + list.length) % list.length;

  const getId = (link) => {
    return link.replace("/manga/", "").replaceAll("/", "");
  };

  return (
    <div className="w-full min-h-[calc(100vh-12rem)] flex flex-col bg-card rounded-xl shadow-sm items-center gap-8 pb-10">

      {/* 🔥 HERO */}
      <div className="relative w-full max-w-6xl h-65 sm:h-80 md:h-95 flex items-center justify-center overflow-hidden">

        {!data && (
          <div className="flex gap-4 bg-card rounded-sm shadow-md">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`
                  w-60 sm:w-75 md:w-100 aspect-video bg-card rounded-2xl animate-pulse
                  ${i !== 2 ? "opacity-60 scale-90" : ""}
                `}
              />
            ))}
          </div>
        )}

        {/* ✅ REAL DATA */}
        {data && list.length > 0 &&
          [-1, 0, 1].map((offset) => {
            const i = getIndex(index + offset);
            const item = list[i];
            const isCenter = offset === 0;

            return (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`
                  absolute transition-all duration-500 cursor-pointer bg-card rounded-sm shadow-md
                  ${isCenter
                    ? "scale-100 z-10 opacity-100"
                    : "scale-90 md:scale-80 z-5 opacity-60"}
                  ${offset === -1 && "-translate-x-40 md:-translate-x-72"}
                  ${offset === 1 && "translate-x-40 md:translate-x-72"}
                `}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/manga/${getId(item.link)}`);
                  }}
                  className="w-60 sm:w-75 md:w-100 aspect-video bg-card rounded-2xl overflow-hidden relative shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 w-full p-3 bg-text/50">
                    <h3 className="text-xs sm:text-sm font-bold text-bg line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-bg/80">
                      {item.chapter}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* 🔥 MENU (NO SKELETON) */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-3 px-3">
        {[
          { name: "Popular", icon: Flame, path: "/popular" },
          { name: "Latest", icon: Clock, path: "/ongoing" },
          { name: "Trending", icon: RefreshCw, path: "/trending" },
          { name: "List", icon: List, path: "/list" },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className="
                w-full flex flex-col items-center justify-center gap-1
                py-4 rounded-xl text-xs sm:text-sm
                bg-primary text-bg font-bold
                shadow-sm hover:shadow-md
                hover:bg-primary/80
                active:scale-95
                transition-all duration-200
              "
            >
              <Icon size={18} />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* 🔥 GENRE (NO SKELETON) */}
      <div className="w-full max-w-6xl px-3 flex flex-col gap-3">

        <h2 className="text-sm font-bold text-text">
          Browse by Genre
        </h2>

        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.value}
              onClick={() => navigate(`/genre/${genre.value}`)}
              className="
                px-3 py-1 text-xs rounded-full
                bg-card text-text
                border border-text/10
                hover:bg-primary/10 hover:border-primary/40
                transition
              "
            >
              {genre.name}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}