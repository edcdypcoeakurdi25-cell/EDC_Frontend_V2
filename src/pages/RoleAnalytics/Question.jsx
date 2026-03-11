import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { responses } from "../../../lib/responses.js";

/* ---------------- QUESTIONS ---------------- */

const questions = [
  { key: "name", label: "Enter your Name", type: "list" },
  { key: "year_of_study", label: "Choose Year of Study", type: "grouped" },
  { key: "phone_number", label: "Enter your Phone Number", type: "list" },
  { key: "email", label: "Enter your Email Address", type: "list" },
  { key: "branch", label: "Choose Branch", type: "grouped" },
  {
    key: "prior_exp",
    label: "How much prior experience do you have working as...",
    type: "list",
  },
  {
    key: "skillLevel",
    label: "Choose a number that best represents your current level of...",
    type: "grouped",
  },
  { key: "resume", label: "Upload your Resume", type: "list" },
];

/* ---------------- GROUPED OPTIONS ---------------- */

const groupedOptions = {
  year_of_study: ["First Year", "Second Year", "Third Year", "Fourth Year"],
  branch: ["CS", "IT", "ENTC", "AIDS", "MECH", "CIVIL", "RNA", "INSTRU"],
  skillLevel: ["1", "2", "3", "4", "5"],
};

/* ---------------- COMPONENT ---------------- */

const Question = () => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const question = questions[questionIndex];

  /* -------- BUILD RESPONSE DATA -------- */

  const data = useMemo(() => {
    if (question.type === "grouped") {
      const options = groupedOptions[question.key] || [];

      const countMap = {};
      options.forEach((opt) => {
        countMap[opt] = 0;
      });

      responses.forEach((r) => {
        const value = r[question.key];
        if (value && countMap.hasOwnProperty(value)) {
          countMap[value] += 1;
        }
      });

      return options.map((label) => ({
        label,
        count: countMap[label],
      }));
    }

    return responses.map((r) =>
      question.key === "resume" ? r.resume : r[question.key]
    );
  }, [questionIndex, question]);

  /* ---------------- UI ---------------- */

  return (
    <div className="mt-6">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* ---------- TOP BAR ---------- */}
          <div className="mb-6 flex items-center justify-between">
            {/* Question Selector */}
            <div
              className="relative w-120"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="flex cursor-pointer items-center justify-between bg-neutral-800 px-4 py-2 text-white">
                <span>{question.label}</span>
                <RiExpandUpDownFill className="size-4 opacity-70" />
              </div>

              {isOpen && (
                <div className="absolute z-20 w-full bg-neutral-800">
                  {questions.map((q, i) => (
                    <button
                      key={q.key}
                      onClick={() => {
                        setQuestionIndex(i);
                        setIsOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition ${i === questionIndex
                        ? "bg-[#1f1f1f] text-white"
                        : "cursor-pointer text-gray-300 hover:bg-[#2e2e2e]"
                        }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <FaChevronLeft
                onClick={() =>
                  setQuestionIndex((i) => Math.max(i - 1, 0))
                }
                className={`size-5 ${questionIndex === 0
                  ? "opacity-30"
                  : "cursor-pointer hover:text-white"
                  }`}
              />

              <span>
                {questionIndex + 1}{" "}
                <span className="opacity-60">of</span>{" "}
                {questions.length}
              </span>

              <FaChevronRight
                onClick={() =>
                  setQuestionIndex((i) =>
                    Math.min(i + 1, questions.length - 1)
                  )
                }
                className={`size-5 ${questionIndex === questions.length - 1
                  ? "opacity-30"
                  : "cursor-pointer hover:text-white"
                  }`}
              />
            </div>
          </div>

          {/* ---------- BODY ---------- */}
          <div className="rounded-xl bg-[#1c1c1c] p-5">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">
                {question.label}
              </h2>
              <div className="mt-2 h-px w-full bg-gray-300" />
            </div>

            {/* ---------- RESPONSES ---------- */}
            <div className="space-y-4">
              {question.type === "grouped"
                ? data.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between rounded-xl bg-neutral-900 px-6 py-4"
                  >
                    <span className="text-sm text-white">
                      {item.label}
                    </span>
                    <span className="text-sm text-white">
                      {item.count} Responses
                    </span>
                  </motion.div>
                ))
                : data.length === 0 ? (
                  <div className="flex items-center justify-center py-10 text-sm text-neutral-400">
                    No responses submitted for this question yet
                  </div>
                ) :
                  data.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-xl bg-neutral-900 px-6 py-4 text-sm"
                    >
                      {question.key === "resume" ? (
                        <a
                          href={value.url}
                          download
                          className="cursor-pointer text-emerald-400 hover:underline"
                        >
                          {value.name}
                        </a>
                      ) : (
                        <span className="text-white">{value}</span>
                      )}
                    </motion.div>
                  ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Question;
