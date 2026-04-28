import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getManga } from "../utils/api";

export default function Manga() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return; // 🔥 penting banget biar gak undefined

    async function fetchData() {
      setLoading(true);
      try {
        const res = await getManga(slug);
        setData(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchData();
  }, [slug]);

  /* 🔥 LOADING SKELETON */
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-3 py-6 bg-bg flex flex-col gap-6 animate-pulse">

        <div className="w-full h-52 bg-card rounded-xl" />

        <div className="h-5 w-2/3 bg-card rounded" />
        <div className="h-4 w-1/2 bg-card rounded" />

        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-card rounded-lg" />
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-card rounded-full" />
          ))}
        </div>

        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-12 bg-card rounded-lg" />
        ))}
      </div>
    );
  }

  /* 🔥 HANDLE ERROR / DATA KOSONG */
  if (!data) {
    return (
      <div className="text-text text-center mt-10">
        Data tidak ditemukan
      </div>
    );
  }

  const {
    title,
    title_indonesian,
    image,
    synopsis,
    metadata,
    genres = [],
    chapters = [],
  } = data;

  return (
    <div className="w-full max-w-6xl bg-bg mx-auto px-3 py-6 flex flex-col gap-6">

      {/* 🔥 COVER + HEADER */}
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-xl shadow-sm">

        <img
          src={image}
          alt={title}
          className="w-full md:w-48 rounded-lg object-cover"
        />

        <div className="flex flex-col gap-2">

          <h1 className="text-lg md:text-xl font-bold text-text">
            {title}
          </h1>

          <p className="text-xs text-secondary-text">
            {title_indonesian}
          </p>

          {/* META */}
          <div className="grid grid-cols-2 text-secondary-text gap-2 mt-2 text-xs">

            <div className="bg-bg p-2 rounded-lg">
              Type: <span className="text-primary">{metadata?.type}</span>
            </div>

            <div className="bg-bg p-2 rounded-lg">
              Status: <span className="text-primary">{metadata?.status}</span>
            </div>

            <div className="bg-bg p-2 rounded-lg">
              Author: <span className="text-primary">{metadata?.author}</span>
            </div>

            <div className="bg-bg p-2 rounded-lg">
              Age: <span className="text-primary">{metadata?.age_rating}</span>
            </div>

          </div>

          {/* GENRE */}
          <div className="flex flex-wrap gap-2 mt-2">
            {genres.map((g, i) => (
              <button
                key={i}
                onClick={() => navigate(`/genre/${g.slug}`)}
                className="
                  px-3 py-1 text-xs rounded-full
                  bg-bg text-text border border-white/10
                  hover:bg-primary/10 hover:border-primary/40
                  transition
                "
              >
                {g.name}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 🔥 SYNOPSIS */}
      <div className="bg-card p-4 rounded-xl shadow-sm">
        <h2 className="text-sm font-bold text-text mb-2">
          Synopsis
        </h2>

        <p className="text-xs text-secondary-text leading-relaxed whitespace-pre-line">
          {synopsis}
        </p>
      </div>

      {/* 🔥 CHAPTER LIST */}
      <div className="flex flex-col gap-3">

        <h2 className="text-sm font-bold text-text">
          Chapter List
        </h2>

        <div className="flex flex-col gap-2 max-h-100 overflow-y-auto pr-1">

          {chapters.map((ch, i) => (
            <div
              key={i}
              onClick={() => navigate(`/chapter/${ch.link}`)}
              className="
                flex justify-between items-center
                bg-card p-3 rounded-lg cursor-pointer shadow-sm
                hover:bg-primary/5 hover:shadow-sm
                transition
              "
            >
              <p className="text-xs text-text font-medium">
                {ch.chapter}
              </p>

              <p className="text-[10px] text-secondary-text">
                {ch.date}
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}