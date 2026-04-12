/**
 * Material Design 3 Expressive — larger shapes, tonal color, deeper elevation,
 * emphasized motion (easing). Shared across marketing, blog, admin, modals.
 */

/** M3 emphasized easing — standard “expressive” curve */
export const m3EaseExpressive = "ease-[cubic-bezier(0.2,0,0,1)]";

export const m3TransitionExpressive =
  `transition-[box-shadow,transform,background-color,border-color,opacity] duration-300 ${m3EaseExpressive}`;

export const m3Section =
  "px-5 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14";

/** Extra-large corners (hero, feature surfaces) */
export const m3ShapeExpressive = "rounded-[40px] md:rounded-[52px]";

/** Cards, dialogs, major components */
export const m3ShapeXl = "rounded-[32px] md:rounded-[40px]";

export const m3ShapeLg = "rounded-[22px] md:rounded-[28px]";

export const m3ShapeMd = "rounded-2xl";

/** Deeper, slightly tinted shadows (primary seed) */
export const m3Elev1 =
  "shadow-[0_2px_4px_rgba(54,69,25,0.06),0_4px_12px_-2px_rgba(27,28,25,0.08)]";

export const m3Elev2 =
  "shadow-[0_4px_12px_rgba(54,69,25,0.08),0_12px_32px_-8px_rgba(27,28,25,0.14)]";

export const m3Elev3 =
  "shadow-[0_8px_16px_rgba(54,69,25,0.1),0_24px_48px_-12px_rgba(27,28,25,0.18)]";

/** Display / headline role */
export const m3DisplayHeadline =
  "font-headline font-normal tracking-tight text-on-surface";

/** Overline — expressive tracking + weight */
export const m3Overline =
  "font-label text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-on-surface-variant";

export const m3OverlineAccent =
  "font-label text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-tertiary";

/** Form control label */
export const m3Label =
  "mb-1.5 block font-label text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-on-surface-variant";

export const m3Field =
  `w-full ${m3ShapeMd} border-2 border-outline-variant bg-surface px-4 py-3.5 font-body text-base text-on-surface outline-none ${m3TransitionExpressive} focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25`;

export const m3FieldFilled =
  `w-full ${m3ShapeMd} border-2 border-outline-variant bg-surface-container-lowest px-4 py-3.5 font-body text-base text-on-surface outline-none ${m3TransitionExpressive} focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25`;

/** Filled button — taller, richer hover shadow */
export const m3FilledButton =
  `inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 font-label text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-on-primary shadow-[0_4px_14px_-2px_rgba(54,69,25,0.35)] ${m3TransitionExpressive} hover:shadow-[0_12px_28px_-6px_rgba(54,69,25,0.4)] hover:brightness-[1.03] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:active:scale-100`;

export const m3FilledButtonSm =
  `inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 font-label text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-on-primary shadow-[0_2px_10px_-2px_rgba(54,69,25,0.3)] ${m3TransitionExpressive} hover:shadow-md active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40`;

export const m3OutlinedButton =
  `inline-flex min-h-14 items-center justify-center rounded-full border-2 border-outline-variant bg-transparent px-8 font-label text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-primary ${m3TransitionExpressive} hover:border-primary/40 hover:bg-primary/10 active:scale-[0.98]`;

export const m3OutlinedButtonSm =
  `inline-flex min-h-11 items-center justify-center rounded-full border-2 border-outline-variant bg-transparent px-6 font-label text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary ${m3TransitionExpressive} hover:bg-primary/10 active:scale-[0.98]`;

export const m3DangerOutlinedSm =
  `inline-flex min-h-11 items-center justify-center rounded-full border-2 border-error/45 bg-transparent px-6 font-label text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-error ${m3TransitionExpressive} hover:bg-error-container/50 active:scale-[0.98]`;

export const m3TextButton =
  `inline-flex min-h-10 items-center justify-center rounded-full px-4 font-label text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary ${m3TransitionExpressive} hover:bg-primary/12`;

export const m3IconButton =
  `inline-flex size-11 items-center justify-center rounded-full text-on-surface-variant ${m3TransitionExpressive} hover:bg-on-surface/10`;

export const m3Dialog =
  `${m3ShapeXl} border border-outline-variant/35 bg-surface-container-lowest ${m3Elev3}`;

export const m3Card =
  `${m3ShapeLg} border border-outline-variant/20 bg-surface-container-lowest ${m3Elev2}`;

export const m3ListSurface =
  `${m3ShapeLg} border-2 border-outline-variant/20 bg-surface-container-lowest ${m3Elev1} overflow-hidden`;

export const m3Checkbox =
  "mt-0.5 size-4 shrink-0 rounded border-2 border-outline-variant accent-primary focus:ring-2 focus:ring-primary/30";

export const m3ContentPad =
  "px-5 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14";

export const m3ContentMax = "mx-auto max-w-3xl";

export const m3CodeChip =
  "rounded-lg bg-surface-container px-1.5 py-0.5 font-mono text-xs text-on-surface-variant";

/**
 * Tonal surfaces for expressive testimonial / highlight cards (rotate by index % 3).
 */
export const m3ExpressiveTonalSurfaces = [
  `${m3ShapeExpressive} ${m3Elev3} border-0 bg-secondary-container text-on-secondary-container`,
  `${m3ShapeExpressive} ${m3Elev3} border-2 border-primary/25 bg-primary-fixed/60 text-on-primary-fixed-variant`,
  `${m3ShapeExpressive} ${m3Elev3} border-2 border-tertiary/25 bg-tertiary-fixed/55 text-on-tertiary-fixed`,
] as const;
