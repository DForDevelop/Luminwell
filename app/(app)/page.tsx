"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // === Countdown to launch/cohort date (set your date here) ===
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date();
    target.setMonth(target.getMonth() + 1); // ← change to your hard date if you have one
    const tick = () => {
      const now = new Date().getTime();
      const diff = Math.max(target.getTime() - now, 0);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-100">
              {/* Simple heart/handshake mark (placeholder) */}
              <span className="sr-only">Luminwell</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-8-4.438-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.562-8 11-8 11z" />
              </svg>
            </span>
            <span className="text-xl tracking-tight">Luminwell</span>
          </a>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <a href="#experience" className="text-slate-600 hover:text-slate-900">What you’ll get</a>
            <a href="#ambassadors" className="text-slate-600 hover:text-slate-900">Ambassadors</a>
            <a href="#plans" className="text-slate-600 hover:text-slate-900">Plans</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#signin" className="hidden rounded-2xl px-3 py-2 text-sm hover:bg-slate-100 sm:inline-block">Sign in</a>
            <a href="#get-started" className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Get started</a>
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section id="home" className="pt-16 sm:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Rest & Restore—then reconnect with <span className="text-sky-600">Luminwell</span>
            </h1>
            <p className="mt-5 max-w-prose text-lg text-slate-600">
              A compassionate, secure peer-support space for students and young adults.
              Exhale here. Share what’s on your mind. Take the next gentle step.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#get-started" className="rounded-2xl bg-sky-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-sky-700">
                Secure your spot
              </a>
              <a href="#contact" className="rounded-2xl border border-slate-300 px-5 py-3 text-center text-sm font-medium hover:bg-slate-100">
                Message us
              </a>
            </div>

            <div className="mt-6 grid max-w-md grid-cols-3 gap-4 text-center">
              <Stat label="24/7" sub="availability" />
              <Stat label="Anonymous" sub="by default" />
              <Stat label="Encrypted" sub="in transit & at rest" />
            </div>
          </div>

          {/* Right side card / quick check-in */}
          <div className="lg:pl-8">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-semibold">Quick check-in</h3>
              </div>
              <div className="space-y-4 px-6 py-5">
                <label htmlFor="mood" className="text-sm text-slate-600">How are you feeling today?</label>
                <input id="mood" placeholder="e.g., anxious about exams" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300" />
                <div className="flex gap-3">
                  <a href="#match" className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Match me</a>
                  <a href="#self-help" className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100">Try self-help</a>
                </div>
                <p className="text-xs text-slate-400">Privacy details in our Trust section.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ COUNTDOWN ============ */}
        <div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white">
            <div className="grid grid-cols-2 gap-6 px-6 py-8 text-center sm:grid-cols-4">
              <CountdownBox label="Days" value={timeLeft.d} />
              <CountdownBox label="Hours" value={timeLeft.h} />
              <CountdownBox label="Mins" value={timeLeft.m} />
              <CountdownBox label="Secs" value={timeLeft.s} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU'LL GET ================= */}
      <section id="experience" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">What you’ll experience</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature title="Compassionate peer chats" desc="Talk to trained student ambassadors who get it." />
            <Feature title="AI-assisted matching" desc="Find the right listener faster with preferences you control." />
            <Feature title="Safety & privacy" desc="Anonymous by default; encrypted in transit and at rest." />
            <Feature title="On your schedule" desc="Drop-in check-ins or longer conversations—your choice." />
            <Feature title="Gentle progress tracking" desc="Reflect on small wins and see trends over time." />
            <Feature title="Self-help toolkit" desc="Breathing, grounding, and mini-exercises curated for you." />
          </div>
        </div>
      </section>

      {/* ================= AMBASSADORS ================= */}
      <section id="ambassadors" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Meet your ambassadors</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Real students and recent grads with lived experience and evidence-informed training. Supervised by our trust & safety team.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Person name="Alex (she/her)" role="Senior, Psychology" blurb="Peer mentor for academic stress & life transitions." />
            <Person name="Ravi (he/him)" role="MEng, 1st year" blurb="International student support, homesickness, and balance." />
            <Person name="Maya (they/them)" role="CS, 3rd year" blurb="Anxiety-friendly goal setting & grounding techniques." />
          </div>
        </div>
      </section>

      {/* ================= LOCATION / AVAILABILITY ================= */}
      <section id="location" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Where we’re available</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Info title="Canada (pilot)" desc="Ontario campuses first—expanding soon." />
            <Info title="Virtual first" desc="Private, secure chat from anywhere." />
            <Info title="Crisis resources" desc="We link to local hotlines if you need urgent help." />
          </div>
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section id="plans" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Choose your plan</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Plan tier="Free" price="$0" points={["Anonymous peer chat", "Self-help toolkit", "Basic progress tracking"]} cta="Start free" />
            <Plan
              tier="Plus"
              price="$4.99/mo"
              points={["Priority matching", "Expanded reflection", "Early access to features"]}
              cta="Go Plus"
              highlight
            />
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section id="gallery" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">A glimpse into the vibe</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Gallery label="Gentle UX" />
            <Gallery label="Ambassador training" />
            <Gallery label="Self-help tools" />
            <Gallery label="Anonymous by default" />
            <Gallery label="Campus pilot" />
            <Gallery label="Human-first tech" />
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Logistics & FAQs</h2>
          <div className="mt-10 space-y-6">
            <QA q="Is Luminwell therapy?" a="No. It’s peer support. We provide crisis resources and encourage professional care when needed." />
            <QA q="Is it anonymous?" a="Yes—anonymous by default. You control what you share." />
            <QA q="Who are ambassadors?" a="Trained students and recent grads with supervision and QA." />
            <QA q="How fast can I connect?" a="Usually within minutes depending on availability and preferences." />
            <QA q="What about privacy?" a="We minimize data, encrypt in transit & at rest, and never run ads." />
          </div>
          <div className="mt-10 text-center">
            <a href="#contact" className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">Let’s chat</a>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section id="get-started" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to exhale?</h2>
          <p className="mt-4 text-slate-600">Reserve your first conversation—free, anonymous, and kind.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700" href="#signup">Create account</a>
            <a className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-slate-100" href="#signin">Sign in</a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="border-t border-slate-200 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 text-sm md:grid-cols-3 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21s-8-4.438-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.562-8 11-8 11z" />
                </svg>
              </span>
              Luminwell
            </div>
            <p className="mt-3 max-w-xs text-slate-500">
              Compassionate peer support for students and young adults. Not a crisis service.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <p className="font-medium">Explore</p>
              <ul className="space-y-1 text-slate-600">
                <li><a className="hover:text-slate-900" href="#experience">What you’ll get</a></li>
                <li><a className="hover:text-slate-900" href="#ambassadors">Ambassadors</a></li>
                <li><a className="hover:text-slate-900" href="#plans">Plans</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Company</p>
              <ul className="space-y-1 text-slate-600">
                <li><a className="hover:text-slate-900" href="#">About</a></li>
                <li><a className="hover:text-slate-900" href="#">Careers</a></li>
                <li><a className="hover:text-slate-900" href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="text-slate-500">
            <p className="font-medium text-slate-700">Stay in the loop</p>
            <p className="mt-2">Get updates about new features and ambassador openings.</p>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
              />
              <button className="rounded-2xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">Subscribe</button>
            </form>
            <p className="mt-3 text-xs">By subscribing, you agree to our privacy policy.</p>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-400">© {new Date().getFullYear()} Luminwell. All rights reserved.</div>
      </footer>
    </div> </>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Stat({ label, sub }: { label: string; sub: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold">{label}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="tabular-nums text-3xl font-semibold">{String(value).padStart(2, "0")}</p>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
}

function Person({ name, role, blurb }: { name: string; role: string; blurb: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center gap-4 border-b border-slate-200 px-5 py-4">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-100">
          {/* Drop an ambassador headshot at /public/ambassadors/<name>.jpg if you like */}
          <Image src="/avatar-placeholder.png" alt={`${name} headshot`} width={48} height={48} />
        </div>
        <div>
          <p className="text-base font-semibold">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
      <div className="px-5 py-4 text-slate-600">{blurb}</div>
    </div>
  );
}

function Info({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
}

function Plan({
  tier,
  price,
  points,
  cta,
  highlight,
}: {
  tier: string;
  price: string;
  points: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border bg-white p-6 ${highlight ? "border-sky-300 ring-1 ring-sky-200" : "border-slate-200"}`}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-semibold">{tier}</h3>
        <div className="text-2xl font-bold">{price}</div>
      </div>
      <ul className="mt-4 list-inside list-disc space-y-1 text-slate-600">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <a href="#get-started" className="mt-4 block rounded-2xl bg-sky-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-sky-700">
        {cta}
      </a>
    </div>
  );
}

function Gallery({ label }: { label: string }) {
  return (
    <div className="grid aspect-video place-items-center rounded-2xl border border-slate-200 bg-slate-100 text-sm text-slate-500">
      {label}
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-lg font-semibold">{q}</h3>
      </div>
      <div className="px-5 py-4 text-slate-600">{a}</div>
    </div>
  );
}
