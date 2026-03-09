import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "ai";
  text: string;
}

const mockResponses: Record<string, string> = {
  default:
    "Это интересный вопрос! Данное слово активно использовалось в XVIII веке и имело более широкое значение, чем его современный аналог. В контексте «Юности честного зерцала» оно относилось к нормам поведения образованного сословия.",
};

function getAIResponse(question: string, word: string): string {
  const q = question.toLowerCase();
  if (q.includes("сегодня") || q.includes("современн")) {
    return `В современном русском языке вместо «${word}» чаще говорят его аналог из повседневной речи. Однако в официальных и литературных текстах это слово до сих пор может встречаться, хотя и крайне редко.`;
  }
  if (q.includes("контекст") || q.includes("употребл")) {
    return `Слово «${word}» употреблялось в первую очередь в книжной, канцелярской и наставительной литературе XVIII века. Оно было частью этикетного лексикона, характерного для эпохи Петра I, когда активно формировались нормы «европейского» поведения русского дворянства.`;
  }
  if (q.includes("отлич") || q.includes("похож") || q.includes("разниц")) {
    return `«${word}» отличается от близких по значению слов более формальным, книжным оттенком. В XVIII веке точный выбор слова отражал уровень образованности и знание этикетных норм, поэтому каждое подобное понятие имело свой тонкий смысловой оттенок.`;
  }
  return mockResponses.default;
}

interface Props {
  word: string;
}

const AIChat = ({ word }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Как это слово сказали бы сегодня?",
    "В каком контексте его употребляли?",
    "Чем оно отличается от похожих слов?",
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMsg: Message = { role: "ai", text: getAIResponse(text, word) };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="card-elevated p-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Bot size={20} className="text-accent" />
        <h3 className="font-serif text-lg font-semibold">Спросить у AI о значении слова</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Задайте вопрос о слове «{word}» — значение, контекст, современный аналог.
      </p>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs border rounded-full px-3 py-1.5 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
            >
              {m.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot size={14} className="text-accent" />
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2.5 max-w-[80%] text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User size={14} className="text-primary" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-accent" />
            </div>
            <div className="bg-muted rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Задайте вопрос..."
          className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2.5 hover:bg-primary/90 disabled:opacity-40 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
