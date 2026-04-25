"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "in" | "scale";

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number;
  once?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants">;

const OFFSET: Record<Direction, { x: number; y: number; scale: number }> = {
  up: { x: 0, y: 36, scale: 1 },
  down: { x: 0, y: -36, scale: 1 },
  left: { x: 44, y: 0, scale: 1 },
  right: { x: -44, y: 0, scale: 1 },
  in: { x: 0, y: 0, scale: 1 },
  scale: { x: 0, y: 18, scale: 0.94 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.85,
  distance,
  amount = 0.25,
  once = true,
  className,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const o = OFFSET[direction];
  const dx = distance != null && (direction === "left" || direction === "right") ? (direction === "left" ? distance : -distance) : o.x;
  const dy = distance != null && (direction === "up" || direction === "down") ? (direction === "up" ? distance : -distance) : o.y;

  const variants: Variants = {
    hidden: reduced
      ? { opacity: 1, x: 0, y: 0, scale: 1 }
      : { opacity: 0, x: dx, y: dy, scale: o.scale },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
