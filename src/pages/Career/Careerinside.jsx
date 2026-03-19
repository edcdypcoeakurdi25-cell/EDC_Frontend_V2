import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────
const jobData = {
  title: "Operations Associate",
  stats: [
    { icon: "briefcase", label: "Operations" },
    { icon: "map-pin", label: "On-site" },
    { icon: "clock", label: "3 Openings" },
  ],
  aboutUs:
    "The Entrepreneurship Development Cell (EDC) at DYPCOE is a student-driven initiative dedicated to fostering innovation, leadership, and entrepreneurial thinking on campus. We empower aspiring student entrepreneurs to transform their ideas into impactful ventures. Our mission is to cultivate a vibrant startup ecosystem where students build confidently, and lead the future.",
  roleDescription:
    "An Operations Associate at EDC DYPCOE plays a key role in ensuring the smooth execution of all cell activities, events, and programs. This position involves coordinating logistics, managing administrative tasks, and supporting operations communication. From planning events and handling outreach execution to streamlining internal processes and ensuring timely deliverables, Operations Associates help maintain efficiency and structure while fostering a collaborative environment.",
  skills: [
    {
      title: "Organizational & Time Management Skills",
      desc: "Ability to manage multiple tasks, keep timelines, and maintain workflow efficiency",
    },
    {
      title: "Communication Skills",
      desc: "Clear and professional communication with team members, faculty, and external partners",
    },
    {
      title: "Problem-Solving Ability",
      desc: "Quick thinking to resolve unexpected roadblocks quickly, efficiently, or on-scene",
    },
    {
      title: "Team Collaboration",
      desc: "Ability to work well with different teams and contribute to a collaborative environment",
    },
    {
      title: "Attention to Detail",
      desc: "Ensuring accuracy in documentation, scheduling, and event execution",
    },
    {
      title: "Adaptability & Flexibility",
      desc: "Staying flexible and adaptable in a fast-paced startup ecosystem",
    },
  ],
};

// ─── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  briefcase: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "map-pin": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  clock: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  search: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  bookmark: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  ),
  arrowLeft: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  check: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
};

// ─── Animation Variants ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function Header() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-black text-xs tracking-tight">EDC</span>
          </div>
          <span className="font-semibold text-slate-800 text-sm hidden sm:block">Careers</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {Icons.search}
          </span>
          <input
            type="text"
            placeholder="Search openings…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>
    </motion.header>
  );
}

function Hero({ title, stats }) {
  const [applySent, setApplySent] = useState(false);

  return (
    <div className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-100 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Now Accepting Applications
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          {title}
        </motion.h1>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center flex-wrap gap-6 mb-10 text-blue-100"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium"
            >
              {Icons[s.icon]}
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setApplySent(true)}
            className="relative bg-white text-blue-700 px-8 py-3 rounded-xl font-bold text-sm shadow-lg overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {applySent ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2"
                >
                  {Icons.check} Applied!
                </motion.span>
              ) : (
                <motion.span key="apply" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  Apply Now
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

function Breadcrumb() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="flex items-center justify-between py-4 border-b border-slate-100"
    >
      <motion.button
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
      >
        {Icons.arrowLeft}
        <span>Go Back</span>
      </motion.button>

      <div className="flex items-center gap-4 text-sm text-slate-400">
        <motion.button whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }} className="hover:text-blue-500 transition-colors">
          ← Previous
        </motion.button>
        <span className="font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md text-xs">1 / 3</span>
        <motion.button whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }} className="hover:text-blue-500 transition-colors">
          Next →
        </motion.button>
      </div>
    </motion.div>
  );
}

function SectionBlock({ title, children, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <div className="flex-1 h-px bg-slate-100" />
      </div>
      {children}
    </motion.div>
  );
}

function SkillCard({ title, desc, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(37,99,235,0.1)" }}
      className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:border-blue-200 hover:bg-blue-50/40 transition-all cursor-default group"
    >
      <div className="mt-0.5 w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <span className="text-white">{Icons.check}</span>
      </div>
      <div>
        <p className="font-semibold text-slate-800 text-sm mb-0.5">{title}</p>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function NotifySection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true);
  };

  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-4 pt-8 border-t border-slate-100"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
        Stay in the Loop
      </p>
      <p className="text-sm font-semibold text-slate-700 mb-3">
        Get notified for similar openings
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-600 font-semibold text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3"
          >
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
              {Icons.check}
            </span>
            You're subscribed! We'll notify you of new openings.
          </motion.div>
        ) : (
          <motion.div key="form" className="flex gap-3 flex-wrap">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-w-[200px] px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-slate-50 transition-all placeholder:text-slate-400"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition-colors"
            >
              Submit
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-slate-400 leading-relaxed mt-4">
        With your permission, we will use your contact details to send further updates about this role via our
        third-party platform. Review our{" "}
        <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>,{" "}
        <a href="#" className="text-blue-500 hover:underline">Google Privacy Policy</a>, and{" "}
        <a href="#" className="text-blue-500 hover:underline">Data Intelligence Policy</a>.
        You may withdraw consent anytime via the unsubscribe option.
      </p>
    </motion.div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function EDCCareers() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <Hero title={jobData.title} stats={jobData.stats} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Breadcrumb />

        <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-10">
          {/* About Us */}
          <SectionBlock title="About Us" delay={0}>
            <p className="text-slate-600 leading-relaxed text-[15px] text-justify">{jobData.aboutUs}</p>
          </SectionBlock>

          {/* The Role */}
          <SectionBlock title="The Role" delay={1}>
            <p className="text-slate-600 leading-relaxed text-[15px] text-justify">{jobData.roleDescription}</p>
          </SectionBlock>

          {/* Skills */}
          <SectionBlock title="Skills Required" delay={2}>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-3"
            >
              {jobData.skills.map((skill, i) => (
                <SkillCard key={i} title={skill.title} desc={skill.desc} index={i} />
              ))}
            </motion.div>
          </SectionBlock>

          {/* Notify */}
          <NotifySection />
        </div>
      </main>
    </div>
  );
}