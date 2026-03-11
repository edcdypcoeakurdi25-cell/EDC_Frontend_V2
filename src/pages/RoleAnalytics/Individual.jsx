import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { responses } from "../../../lib/responses.js";

/* ---------------- ANIMATION VARIANTS ---------------- */

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

/* ---------------- COMPONENT ---------------- */

const Individual = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right


  if (!Array.isArray(responses) || responses.length === 0) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <p className="text-sm text-neutral-400">No responses available</p>
      </div>
    );
  }

  /* ---------- CURRENT RESPONSE ---------- */
  const data = useMemo(() => responses[index], [index]);

  return (
    <div className="mt-6 space-y-8">

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#1c1c1c] rounded-2xl p-6 shadow-xl"
        >
          {/* ---------- NAVIGATION ---------- */}
          <div className="flex items-center justify-between text-gray-300 text-sm mb-6">
            <button
              aria-label="Previous response"
              disabled={index === 0}
              onClick={() => {
                setDirection(-1);
                setIndex((i) => Math.max(i - 1, 0));
              }}
              className={`${index === 0
                ? "opacity-30"
                : "hover:text-white cursor-pointer"
                }`}
            >
              <FaChevronLeft className="size-5" />
            </button>

            <span>
              {index + 1} <span className="opacity-60">of</span>{" "}
              {responses.length}
            </span>

            <button
              aria-label="Next response"
              disabled={index === responses.length - 1}
              onClick={() => {
                setDirection(1);
                setIndex((i) =>
                  Math.min(i + 1, responses.length - 1)
                );
              }}
              className={`${index === responses.length - 1
                ? "opacity-30"
                : "hover:text-white cursor-pointer"
                }`}
            >
              <FaChevronRight className="size-5" />
            </button>
          </div>

          {/* ---------- ANIMATED CONTENT ---------- */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.section
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-4"
              aria-label="Applicant details"
            >
              <Field label="Enter your Name*" value={data?.name ?? "—"} />
              <Field
                label="Choose Year of Study*"
                value={data?.year_of_study ?? "—"}
              />
              <Field
                label="Enter your Phone Number*"
                value={data?.phone_number ?? "—"}
              />
              <Field
                label="Enter your Email Address*"
                value={data?.email ?? "—"}
              />
              <Field
                label="Choose your Branch*"
                value={data?.branch ?? "—"}
              />
              <Field
                label="How much prior experience do you have in the field of Operations?*"
                value={data?.prior_exp ?? "—"}
              />
              <Field
                label="Choose a number that best represents your current level of management skills*"
                value={data?.skillLevel ?? "—"}
              />
              <Field
                label="Upload your Resume*"
                value={
                  data?.resume ? (
                    <a
                      href={data.resume.url}
                      download
                      className="text-emerald-400 hover:underline"
                    >
                      {data.resume.name}
                    </a>
                  ) : (
                    "No resume uploaded"
                  )
                }
              />
            </motion.section>
          </AnimatePresence>
        </motion.div>
    </div>
  );
};

/* ---------------- FIELD COMPONENT ---------------- */

const Field = ({ label, value }) => (
  <div className="bg-neutral-700/60 rounded-xl px-4 py-3">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <div className="text-white text-sm leading-relaxed">
      {value}
    </div>
  </div>
);

export default Individual;
