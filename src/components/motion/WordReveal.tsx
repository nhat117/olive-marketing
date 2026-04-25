"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Splits `text` into words and fades/slides each into place with a stagger.
 * Visible as plain text for SSR/SEO via a hidden mirror (sr-only). The
 * animated layer is aria-hidden so screen readers don't hear duplicates.
 */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0.1,
  stagger = 0.07,
  as: Tag = "span",
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduced ? 0 : delay,
        staggerChildren: reduced ? 0 : stagger,
      },
    },
  };

  const word: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "40%" },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        animate="show"
        variants={container}
        className="inline-block"
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={word}
              className={`inline-block ${wordClassName ?? ""}`}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
