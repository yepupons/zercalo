import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordCard from "@/components/WordCard";
import { dictionaryData, getUniqueLetters } from "@/data/dictionary";
import { motion } from "framer-motion";

const Dictionary = () => {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const letters = getUniqueLetters();

  const filtered = useMemo(() => {
    let result = dictionaryData;
    if (activeLetter) {
      result = result.filter((w) => w.firstLetter === activeLetter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.shortDefinition.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeLetter]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-10 md:py-16 px-6">
        <div className="container max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} />
            Главная
          </Link>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Словарь</h1>
            <p className="text-muted-foreground mb-8">Устаревшие слова и выражения XVIII века</p>
          </motion.div>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по словарю..."
              className="w-full rounded-lg border bg-background pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Letter filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveLetter(null)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                !activeLetter ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground hover:text-primary hover:border-primary"
              }`}
            >
              Все
            </button>
            {letters.map((l) => (
              <button
                key={l}
                onClick={() => setActiveLetter(activeLetter === l ? null : l)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  activeLetter === l ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground hover:text-primary hover:border-primary"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((w, i) => (
                <WordCard key={w.id} word={w} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">Ничего не найдено</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dictionary;
