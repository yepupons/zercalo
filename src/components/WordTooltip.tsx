import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWordById } from "@/data/dictionary";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  wordId: string;
  children: React.ReactNode;
}

const WordTooltip = ({ wordId, children }: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const word = getWordById(wordId);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!word) return <>{children}</>;

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  };

  const handleLeave = () => {
    timeoutRef.current = window.setTimeout(() => setShow(false), 200);
  };

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    // On mobile, first tap shows tooltip, second navigates
    if (!show) {
      e.preventDefault();
      setShow(true);
    }
  };

  return (
    <span className="relative inline">
      <Link
        to={`/word/${wordId}`}
        className="word-highlight"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleTap}
        ref={ref as any}
      >
        {children}
      </Link>
      <AnimatePresence>
        {show && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-64 rounded-lg bg-tooltip-bg p-3 shadow-lg pointer-events-auto"
          >
            <p className="font-serif text-sm font-semibold text-tooltip-fg mb-1">{word.word}</p>
            <p className="text-xs text-tooltip-fg/80 leading-relaxed">{word.shortDefinition}</p>
            <p className="text-xs text-tooltip-fg/50 mt-2">Нажмите для подробностей →</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default WordTooltip;
