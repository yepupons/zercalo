import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, BookOpen, BookText } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { getWordById } from "@/data/dictionary";

const WordEntry = () => {
  const { id } = useParams<{ id: string }>();
  const word = getWordById(id || "");

  if (!word) return <Navigate to="/dictionary" replace />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-10 md:py-16 px-6">
        <div className="container max-w-2xl">
          {/* Nav */}
          <div className="flex items-center justify-between mb-10">
            <Link to="/reading" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={14} />
              Назад к тексту
            </Link>
            <Link to="/dictionary" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
              <BookText size={14} />
              Открыть словарь
            </Link>
          </div>

          <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {/* Word heading */}
            <div className="mb-8">
              <span className="inline-block text-xs tracking-widest uppercase text-muted-foreground bg-muted px-3 py-1 rounded-full mb-4">
                Устаревшее слово XVIII века
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">{word.word}</h1>
            </div>

            {/* Short definition */}
            <div className="card-elevated p-6 mb-6">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Краткое толкование</h2>
              <p className="text-lg leading-relaxed">{word.shortDefinition}</p>
            </div>

            {/* Full definition */}
            <div className="card-elevated p-6 mb-6">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Подробное определение</h2>
              <p className="leading-relaxed text-foreground/90">{word.fullDefinition}</p>
            </div>

            {/* Example */}
            <div className="card-elevated p-6 mb-6">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Пример употребления</h2>
              <blockquote className="font-serif text-lg italic text-foreground/80 border-l-2 border-primary/20 pl-4">
                {word.example}
              </blockquote>
            </div>

            {/* Modern equivalent */}
            <div className="card-elevated p-6 mb-6">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Современный аналог</h2>
              <p className="leading-relaxed">{word.modernEquivalent}</p>
            </div>

            {/* AI Chat */}
            <AIChat word={word.word} />

            {/* Bottom nav */}
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                to="/reading"
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
              >
                <BookOpen size={16} />
                Вернуться к чтению
              </Link>
              <Link
                to="/dictionary"
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
              >
                <BookText size={16} />
                Открыть словарь
              </Link>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WordEntry;
