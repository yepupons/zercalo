import { Link } from "react-router-dom";
import type { WordEntry } from "@/data/dictionary";
import { motion } from "framer-motion";

interface Props {
  word: WordEntry;
  index?: number;
}

const WordCard = ({ word, index = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    <Link to={`/word/${word.id}`} className="block card-elevated p-5 h-full group">
      <h3 className="font-serif text-lg font-semibold text-primary group-hover:text-accent transition-colors">
        {word.word}
      </h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{word.shortDefinition}</p>
    </Link>
  </motion.div>
);

export default WordCard;
