import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  Flame,
  Clock,
  List,
  Star,
  Sun,
  Moon,
  X
} from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const isTyping = query.length > 0;

  function applyTheme(mode) {
    const root = document.documentElement;

    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", mode);
    setThemeOpen(false);
  }

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  /* 🔥 HANDLE SEARCH */
  const handleSearch = () => {
    const q = query.trim();

    if (q.length < 2) return; // minimal input

    navigate(`/search?q=${encodeURIComponent(q)}`);
    setFocus(false);
  };

  return (
    <header className="w-full h-16 z-20 flex items-center justify-center bg-bg relative">
      <div className="w-[95%] h-[90%] rounded-xl bg-card shadow-sm flex items-center justify-between px-4 gap-4">

        {/* LEFT */}
        <div className="h-2/3 flex items-center gap-2 relative">
          <div
            onClick={() => setThemeOpen(!themeOpen)}
            className="h-full aspect-square rounded-full bg-primary flex items-center justify-center cursor-pointer"
          >
            <Sun size={16} className="text-black" />
          </div>

          <h1
            onClick={() => navigate("/")}
            className="text-sm font-extrabold text-text hidden sm:block cursor-pointer"
          >
            DAMNDELION
          </h1>

          {/* THEME */}
          <div
            className={`absolute top-12 left-0 bg-card border border-white/10 rounded-xl p-2 transition-all text-text duration-300 ${
              themeOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <button
              onClick={() => applyTheme("light")}
              className="flex items-center gap-2 px-3 py-2 hover:bg-bg rounded-lg w-full"
            >
              <Sun size={16} /> Light
            </button>

            <button
              onClick={() => applyTheme("dark")}
              className="flex items-center gap-2 px-3 py-2 hover:bg-bg rounded-lg w-full"
            >
              <Moon size={16} /> Dark
            </button>
          </div>
        </div>

        {/* 🔥 SEARCH */}
        <div
          className={`h-10 flex items-center relative transition-all duration-300 ${
            focus ? "w-64 md:w-80" : "w-40 md:w-56"
          }`}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 100)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder={isTyping ? "Tekan Enter..." : "Cari judul..."}
            className="w-full h-full px-4 pr-10 rounded-full bg-bg text-text text-sm outline-none placeholder:text-secondaryText focus:ring-2 focus:ring-primary"
          />

          {/* 🔥 CLEAR BUTTON */}
          {isTyping && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 text-secondary-text hover:text-text"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* MENU BUTTON */}
        <div className="h-2/3 flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="h-full aspect-square rounded-full bg-primary flex items-center justify-center"
          >
            <Menu size={18} className="text-black" />
          </button>
        </div>
      </div>

      {/* SIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-card border-l border-white/10 text-text p-5 transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 mt-10">

          <button onClick={() => go("/")} className="flex items-center gap-3 hover:text-primary">
            <Home size={18} /> Home
          </button>

          <button onClick={() => go("/popular")} className="flex items-center gap-3 hover:text-primary">
            <Flame size={18} /> Popular
          </button>

          <button onClick={() => go("/latest")} className="flex items-center gap-3 hover:text-primary">
            <Clock size={18} /> Latest
          </button>

          <button onClick={() => go("/list")} className="flex items-center gap-3 hover:text-primary">
            <List size={18} /> List
          </button>

          <button onClick={() => go("/trending")} className="flex items-center gap-3 hover:text-primary">
            <Star size={18} /> Trending
          </button>

        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}
    </header>
  );
}