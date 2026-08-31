"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    alt: string;
    index: number;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    backLabel: string;
    backTitle: string;
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, alt, index, target, backLabel, backTitle }: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-surface-container"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={alt ?? `editorial-${index}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-transparent" />
                </div>

                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-primary flex flex-col items-center justify-center p-3 border border-primary-container/30"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-primary-fixed uppercase tracking-widest mb-1">
                            {backLabel}
                        </p>
                        <p className="text-[10px] font-medium text-on-primary leading-tight">
                            {backTitle}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

type ImageItem = { src: string; alt: string };

export type ScrollMorphHeroProps = {
    images: ImageItem[];
    brand?: string;
    introHeadline: string;
    introSub: string;
    arcHeadline: string;
    arcSub: string;
    backLabel?: string;
    backTitle?: string;
    maxScroll?: number;
    children?: React.ReactNode;
};

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

// Deterministic pseudo-random in [0, 1) — keeps scatter values pure + SSR-stable.
const hashRandom = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
};

export default function ScrollMorphHero({
    images,
    brand,
    introHeadline,
    introSub,
    arcHeadline,
    arcSub,
    backLabel = "View",
    backTitle = "Details",
    maxScroll = 3000,
    children,
}: ScrollMorphHeroProps) {
    const totalImages = images.length;
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const prev = scrollRef.current;
            const next = prev + e.deltaY;

            // Release page scroll once we've hit either end of the virtual range.
            if (
                (prev >= maxScroll && e.deltaY > 0) ||
                (prev <= 0 && e.deltaY < 0)
            ) {
                return; // let the page scroll naturally
            }

            e.preventDefault();
            const clamped = Math.min(Math.max(next, 0), maxScroll);
            scrollRef.current = clamped;
            virtualScroll.set(clamped);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            const prev = scrollRef.current;

            if (
                (prev >= maxScroll && deltaY > 0) ||
                (prev <= 0 && deltaY < 0)
            ) {
                return;
            }

            touchStartY = touchY;
            const clamped = Math.min(Math.max(prev + deltaY, 0), maxScroll);
            scrollRef.current = clamped;
            virtualScroll.set(clamped);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll, maxScroll]);

    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [600, maxScroll], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const scatterPositions = useMemo(
        () =>
            images.map((_, i) => ({
                x: (hashRandom(i + 1) - 0.5) * 1500,
                y: (hashRandom(i + 101) - 0.5) * 1000,
                rotation: (hashRandom(i + 211) - 0.5) * 180,
                scale: 0.6,
                opacity: 0,
            })),
        [images],
    );

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-surface overflow-hidden"
        >
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
                {/* Intro text — sits in the clear center of the circle */}
                <div className="absolute z-20 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-6 max-w-[min(92%,42rem)]">
                    {brand ? (
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={
                                introPhase === "circle" && morphValue < 0.5
                                    ? { opacity: 1 - morphValue * 2, y: 0 }
                                    : { opacity: 0 }
                            }
                            transition={{ duration: 1 }}
                            className="mb-4 md:mb-5 font-label text-[0.65rem] md:text-xs font-semibold tracking-[0.32em] uppercase text-on-surface-variant/80"
                        >
                            {brand}
                        </motion.p>
                    ) : null}
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={
                            introPhase === "circle" && morphValue < 0.5
                                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                                : { opacity: 0, filter: "blur(10px)" }
                        }
                        transition={{ duration: 1 }}
                        className="font-display italic text-[1.85rem] md:text-[3.25rem] lg:text-[3.85rem] tracking-tight text-primary leading-[0.98] text-balance"
                    >
                        {introHeadline}
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={
                            introPhase === "circle" && morphValue < 0.5
                                ? { opacity: 0.9 - morphValue }
                                : { opacity: 0 }
                        }
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-5 md:mt-6 font-display italic text-[1.2rem] md:text-[1.65rem] lg:text-[1.85rem] tracking-tight text-on-surface leading-[1.15]"
                    >
                        {introSub}
                    </motion.h2>
                </div>

                {/* Arc-active content (fades in at end of morph) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 max-w-3xl"
                >
                    <h2 className="font-display italic text-3xl md:text-5xl lg:text-6xl text-primary tracking-tight mb-4 leading-[1.02]">
                        {arcHeadline}
                    </h2>
                    <p className="font-body text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
                        {arcSub}
                    </p>
                    {children ? (
                        <div className="pointer-events-auto mt-8">{children}</div>
                    ) : null}
                </motion.div>

                <div className="relative flex items-center justify-center w-full h-full">
                    {images.map((img, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70;
                            const lineTotalWidth = totalImages * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(
                                containerSize.width,
                                containerSize.height,
                            );

                            // Bigger outer circle so the text block fits cleanly in the middle
                            // without the flip cards overlapping the headline.
                            const circleRadius = Math.min(minDimension * 0.48, 460);
                            const circleAngle = (i / totalImages) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(
                                containerSize.width,
                                containerSize.height * 1.5,
                            );
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);

                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - spreadAngle / 2;
                            const step = spreadAngle / (totalImages - 1);

                            const scrollProgress = Math.min(
                                Math.max(rotateValue / 360, 0),
                                1,
                            );

                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle =
                                startAngle + i * step + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(
                                    circlePos.rotation,
                                    arcPos.rotation,
                                    morphValue,
                                ),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={img.src}
                                src={img.src}
                                alt={img.alt}
                                index={i}
                                target={target}
                                backLabel={backLabel}
                                backTitle={backTitle}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
