import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, BookText, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordCard from "@/components/WordCard";
import { dictionaryData } from "@/data/dictionary";

const Index = () => {
  const featuredWords = dictionaryData.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="py-20 md:py-32 px-6">
        <div className="container max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
          >
            XVIII век · Историко-лингвистический проект
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold text-primary leading-tight"
          >
            Юности честное зерцало
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
          >
            Платформа для изучения устаревшей лексики XVIII века на материале знаменитого памятника русской литературы.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/reading"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <BookOpen size={18} />
              Начать чтение
            </Link>
            <Link
              to="/dictionary"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border text-foreground px-8 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              <BookText size={18} />
              Перейти к словарю
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div className="container">
        <div className="border-t" />
      </div>

      {/* About */}
      <section className="py-16 md:py-20 px-6">
        <div className="container max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-6">О проекте</h2>
          <p className="text-muted-foreground text-center leading-relaxed">
            «Юности честное зерцало» — одно из первых русских пособий по этикету, изданное в 1717 году по указу Петра I. Наш проект помогает разобраться в устаревшей лексике этого памятника, предлагая интерактивное чтение текста с мгновенными пояснениями и подробный словарь эпохи.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 px-6 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-12">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Читайте текст", desc: "Откройте фрагменты произведения в удобном для чтения виде" },
              { step: "02", title: "Наводите на слова", desc: "Выделенные слова покажут краткое пояснение при наведении" },
              { step: "03", title: "Изучайте подробнее", desc: "Переходите к полным словарным статьям и задавайте вопросы AI" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl font-serif font-bold text-primary/20">{item.step}</span>
                <h3 className="font-serif text-lg font-semibold mt-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured words */}
      <section className="py-16 md:py-20 px-6">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold">Примеры слов</h2>
            <Link to="/dictionary" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
              Весь словарь <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredWords.map((w, i) => (
              <WordCard key={w.id} word={w} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
