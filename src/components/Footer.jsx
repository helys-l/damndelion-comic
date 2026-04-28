import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-card shadow-sm mt-auto">
      
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LEFT */}
        <div className="text-center md:text-left">
          <h1 className="text-sm font-bold text-text">
            DAMNDELION
          </h1>
          <p className="text-xs text-secondary-text">
            Web baca komik
          </p>
        </div>


        {/* RIGHT (SOCIAL) */}
        <div className="flex items-center gap-3">
          

          <a
            href="https://youtube.com/@adamndelion?si=x9rhYOOPUqNxwg0a"
            className="p-2 rounded-lg bg-bg hover:bg-primary/20 transition"
          >
            <Mail size={16} className="text-text" />
          </a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-[10px] text-secondary-text pb-4">
        © {new Date().getFullYear()} DAMNDELION. All rights reserved.
      </div>

    </footer>
  );
}