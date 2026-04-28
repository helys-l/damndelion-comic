import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrending } from "../utils/api";

export default function Trending() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await getTrending();
      setData(res);
    }
    fetchData();
  }, []);

if (!data) {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-bg flex flex-col items-center gap-6 py-6">

      {/* TITLE */}
      <div className="w-full max-w-4xl px-3">
        <div className="h-5 w-40 bg-card rounded animate-pulse mb-2"></div>
        <div className="h-3 w-52 bg-card rounded animate-pulse"></div>
      </div>

      {/* SKELETON LIST */}
      <div className="w-full max-w-4xl flex flex-col gap-3 px-3">

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl bg-card animate-pulse"
          >

            {/* RANK */}
            <div className="w-8 flex justify-center">
              <div className="h-4 w-4 bg-bg rounded"></div>
            </div>

            {/* IMAGE */}
            <div className="w-20 h-14 bg-bg rounded-lg"></div>

            {/* TEXT */}
            <div className="flex flex-col gap-2 flex-1">

              <div className="h-3 w-3/4 bg-bg rounded"></div>

              <div className="h-2 w-1/2 bg-bg rounded"></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

  const trending = (data.trending || []).filter(
    (item) => !item.title.toLowerCase().includes("apk")
  );

  const getSlug = (url) => {
    try {
      const parts = url.split("/").filter(Boolean);
      return parts[parts.length - 1];
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-bg flex flex-col items-center gap-6 py-6">

      {/* 🔥 TITLE */}
      <div className="w-full max-w-4xl px-3">
        <h1 className="text-lg md:text-xl font-bold text-text">
           Trending Today
        </h1>
        <p className="text-xs text-secondary-text">
          Komik yang lagi naik daun hari ini
        </p>
      </div>

      {/* 🔥 LIST */}
      <div className="w-full max-w-4xl flex flex-col gap-3 px-3">

        {trending.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(`/manga/${getSlug(item.link)}`)}
            className="
              flex items-center gap-3 p-3 rounded-xl
              bg-card cursor-pointer
              shadow-sm hover:shadow-md
              transition-all duration-300
              border border-transparent
              hover:border-primary/30
              hover:bg-primary/5
            "
          >

            {/* 🔥 RANK */}
            <div className="w-8 text-center">
              <span className="text-sm font-bold text-primary">
                #{i + 1}
              </span>
            </div>

            {/* 🔥 IMAGE */}
            <div className="w-20 h-14 shrink-0 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 🔥 INFO */}
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-sm font-semibold text-text line-clamp-1">
                {item.title}
              </h3>

              <p className="text-xs text-secondary-text">
                {item.chapter}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}