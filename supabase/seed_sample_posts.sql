-- Sample published posts for Olive Marketing (beauty / wellness tone).
-- Run in Supabase SQL Editor after migrations 001–003. Safe to re-run only if you delete conflicting slugs first.
--
-- Cover + inline images use Pexels (allowed in next.config.ts remotePatterns).

insert into public.posts (
  slug,
  title,
  excerpt,
  body,
  cover_image_url,
  meta_title,
  meta_description,
  published,
  published_at,
  no_index
)
values
  (
    'reduce-no-shows-booking-reminders',
    'How to reduce no-shows without sounding desperate',
    'Practical reminder timing, tone, and policy language for salons and spas—so clients show up and your artists keep their books full.',
    $markdown$
## The goal: clarity, not guilt

No-shows hurt revenue and morale. The fix is rarely “send more texts”—it’s **clear expectations**, **timely reminders**, and **easy reschedule paths** so clients don’t ghost you.

## What usually works

1. **Confirm at booking** — Include duration, address or suite, parking, and your cancellation window in the first confirmation (email or SMS).
2. **Two-touch reminder flow** — Many teams use a 48-hour heads-up plus a same-day morning nudge. Test what your clientele responds to; med-spa clients often prefer email for the first touch.
3. **One-tap reschedule** — If the only option is “call us,” busy clients bail. A link to your booking system or a short reply keyword reduces silent no-shows.

> **Tip:** Match tone to your brand. A luxury spa might keep reminders minimal and warm; a high-volume nail studio might be more direct. Same structure, different voice.

## Policy language (keep it human)

State your window plainly: *“Cancellations within 24 hours may be subject to a fee.”* Avoid shaming copy; it trains clients to ignore future messages.

![Hands at a reception desk scheduling an appointment](https://images.pexels.com/photos/5712643/pexels-photo-5712643.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Measure what matters

Track **confirmation rate**, **reschedule rate**, and **no-show % by service type**. If one service or provider spikes, you’ve found a process or messaging issue—not “bad clients.”

---

*Olive Marketing helps beauty and wellness brands wire booking tools, reminders, and win-back flows to real numbers—consultations booked, not just clicks.*
    $markdown$,
    'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'Reduce no-shows: booking reminders for salons & spas',
    'Reminder timing, tone, and policy copy that cut no-shows for salons, spas, and appointment-based beauty businesses.',
    true,
    now() - interval '5 days',
    false
  ),
  (
    'med-spa-homepage-above-the-fold',
    'What belongs on a med-spa homepage above the fold',
    'Above-the-fold checklist: trust, services, booking, and compliance-friendly copy—without cluttering your first screen.',
    $markdown$
## Above the fold is a promise, not a brochure

Visitors decide in seconds whether you’re *for them*. Your first screen should answer: **who you serve**, **what you’re known for**, and **how to take the next step** (book, call, or consult).

## 1. One primary action

Pick a single hero CTA—usually **Book** or **Request a consult**—and repeat it in the header. Secondary links (pricing PDF, Instagram) can wait.

## 2. Service clarity, not a laundry list

Name **2–4 anchor treatments** you want to grow. “Injectables,” “skin resurfacing,” “body contouring” beats a wall of trademarked device names before trust exists.

## 3. Trust signals that scan fast

- Provider credentials or medical director note (as appropriate for your market)
- Real photography of your space or team (stock is fine short-term; real wins long-term)
- A short line on **safety** or **consultation-first** approach if that’s how you work

![Minimal spa treatment room with soft light](https://images.pexels.com/photos/3865554/pexels-photo-3865554.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 4. Location + hours (mobile-first)

Med-spa clients often search on phones. **City/neighborhood**, **parking**, and **hours** belong high—or one tap away in the header.

## What to avoid

- Autoplay video with sound
- Pop-ups before someone has read a headline
- Tiny disclaimers as the *only* text above the fold (move legal detail to dedicated pages)

---

*Need a homepage pass that matches your brand guidelines and booking stack? That’s what we build with teams like yours.*
    $markdown$,
    'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'Med-spa homepage checklist | Olive Marketing',
    'What to put above the fold on a med-spa or aesthetics site: CTAs, services, trust, and mobile-friendly essentials.',
    true,
    now() - interval '12 days',
    false
  ),
  (
    'organic-vs-paid-social-appointments',
    'Organic vs paid social when you sell appointments',
    'When to invest in always-on organic content, when to run paid campaigns, and how to judge success for salons, spas, and aesthetics practices.',
    $markdown$
## Same apps, different jobs

**Organic** builds recognition, educates, and nurtures people who already follow you. **Paid** finds new people in your radius (or retargets site visitors) when you have a clear offer and capacity.

## Organic: the long game

- **Show the work** — Before/afters where policy allows, process reels, provider spotlights.
- **Answer real questions** — “What to expect first visit,” “Downtime,” “How long results last.”
- **Post on a schedule you can keep** — Consistency beats sporadic bursts.

## Paid: the appointment lens

Measure **leads and bookings**, not vanity reach. Good paid setups tie creative to:

- A specific service or promo
- A landing page or booking flow that matches the ad
- A geographic radius that matches how far clients actually travel

![Planning social content on a phone](https://images.pexels.com/photos/7256120/pexels-photo-7256120.jpeg?auto=compress&cs=tinysrgb&w=1200)

## A simple split for busy teams

- **Need more new clients this month?** Start with paid: tight offer + landing page that matches the ad.
- **Strong word-of-mouth but a weak feed?** Build an organic system and better highlights before you scale spend.
- **Short on time and assets?** One “pillar” photo/video shoot, then repurpose clips for both organic and paid.

## Reality check

If your booking software, phone tree, or follow-up is leaky, ads only speed up the leak. Fix **response time** and **confirmation** first.

---

*We plan and run paid + organic for beauty and wellness brands with reporting tied to inquiries and appointments—not likes alone.*
    $markdown$,
    'https://images.pexels.com/photos/3373747/pexels-photo-3373747.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'Organic vs paid social for salons & med-spas',
    'How salons, spas, and aesthetics practices should think about organic content versus paid social when the goal is appointments.',
    true,
    now() - interval '20 days',
    false
  )
on conflict (slug) do nothing;
