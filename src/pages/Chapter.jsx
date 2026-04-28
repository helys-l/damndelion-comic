import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChapter } from "../utils/api";

export default function Chapter() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    async function fetchFirst() {
      setLoading(true);
      const res = await getChapter(slug);

      setChapters([res]);
      setLoading(false);

      window.scrollTo(0, 0);
    }

    fetchFirst();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-100 bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  const first = chapters[0];

  const isFirst = !first.navigation?.previousChapter;
  const isLast = !first.navigation?.nextChapter;

  return (
    <div className="w-full bg-bg flex flex-col items-center">

      {/* TOP NAV */}
      <div className="sticky top-0 z-10 w-full bg-bg/80 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-3 py-2 flex flex-col gap-1">

          <h1 className="text-xs font-semibold text-text line-clamp-1">
            {first.manga_title}
          </h1>

          <p className="text-[10px] text-gray-400">
            {first.chapter_title}
          </p>

          <div className="text-[10px] text-center text-gray-500">
            {isFirst && "Ini chapter pertama"}
            {isLast && "Ini chapter terakhir"}
          </div>

          <div className="flex gap-2 mt-1">

            <button
              disabled={isFirst}
              onClick={() =>
                navigate(`/chapter/${first.navigation.previousChapter}`)
              }
              className={`flex-1 py-1 text-[11px] rounded-md transition
                ${isFirst
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-bg hover:opacity-80"}
              `}
            >
              {isFirst ? "No Prev" : "Previous"}
            </button>

            <button
              onClick={() =>
                navigate(`/manga/${first.navigation.chapterList}`)
              }
              className="flex-1 py-1 text-[11px] bg-primary text-bg rounded-md hover:opacity-80 transition"
            >
              Chapter List
            </button>

            <button
              disabled={isLast}
              onClick={() =>
                navigate(`/chapter/${first.navigation.nextChapter}`)
              }
              className={`flex-1 py-1 text-[11px] rounded-md transition
                ${isLast
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-bg hover:opacity-80"}
              `}
            >
              {isLast ? "No Next" : "Next"}
            </button>

          </div>
        </div>
      </div>

      {/* READER */}
      <div className="w-full max-w-3xl">

        {chapters.map((ch, ci) => (
          <div key={ci}>

            <div className="text-center text-[11px] text-gray-500 py-4">
              {ch.chapter_title}
            </div>

            {ch.images.map((img, i) => (
              <img
                key={i}
                src={img}
                loading="lazy"
                alt={`page-${i}`}
                className="w-full"
              />
            ))}

          </div>
        ))}

      </div>

    </div>
  );
}