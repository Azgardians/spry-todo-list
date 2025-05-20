// components/ConfettiBurst.tsx
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart } from 'lucide-react';
import { cn } from "@/lib/utils"; // if you're using shadcn's cn helper

const confettiIcons = [Sparkles, Star, Heart];

export function ConfettiBurst() {
  return (
    <div className="relative w-0 h-0">
      {confettiIcons.map((Icon, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 0, scale: 0.8 }}
          animate={{ opacity: 1, y: -40 - Math.random() * 40, x: -30 + Math.random() * 60, rotate: Math.random() * 360, scale: 1 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("absolute text-pink-400")}
        >
          <Icon size={16 + Math.random() * 8} />
        </motion.div>
      ))}
    </div>
  );
}
