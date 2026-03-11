import React from "react"
import { motion } from "framer-motion";
import { GrDocumentPdf } from "react-icons/gr";
import { LuImage } from "react-icons/lu";
import Cards from "./Cards.jsx"
import Summary_Download from "./Summary_Download.jsx"
import { responses } from "../../../lib/responses.js";

const Summary = () => {

  const names = responses.map(r => r.name);
  const year_of_study = responses.map(r => r.year_of_study);
  const phone_number = responses.map(r => r.phone_number);
  const email = responses.map(r => r.email);
  const branch = responses.map(r => r.branch);
  const prior_exp = responses.map(r => r.prior_exp);
  const resume = responses.map(r => r.resume);

  // Skill aggregation
  const skillLevel = [5, 4, 3, 2, 1].map(level => ({
    label: level,
    value: responses.filter(r => r.skillLevel === level).length,
  }));

  const maxValue = Math.max(1, ...skillLevel.map(d => d.value));



  return (
    <div className="space-y-8 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >

          {/* Download Button */}
          <Summary_Download />

          <Cards
            title="Enter your Name"
            items={names}
          />

          <Cards
            title="Choose Year of Study"
            items={year_of_study}
          />

          <Cards
            title="Enter your Phone Number"
            items={phone_number}
          />

          <Cards
            title="Enter your Email Address"
            items={email}
          />

          <Cards
            title="Select your Branch"
            items={branch}
          />

          <Cards
            title="Do you have any prior experience working in Operations?"
            items={prior_exp}
          />

          {/* Skill Level */}
          <div className="w-full max-w-5xl mx-auto bg-[#1c1c1c] rounded-2xl p-6 my-6">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-white text-lg font-semibold">
                Select the number that best defines your current level of Management Skills
              </h2>
              <p className="text-gray-400 text-sm">{responses.length} Responses</p>
            </div>

            <div className="relative w-full max-w-3xl">
              {/* Y-axis line */}
              <div className="absolute left-9 -top-4 bottom-0 w-0.5 bg-gray-300" />

              <div className="space-y-6 pl-14">
                {skillLevel.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-4">
                    {/* Y-axis label */}
                    <div className="w-6 -ml-15 text-gray-300 text-sm text-right">
                      {item.label}
                    </div>

                    {/* Bar */}
                    <div className="flex-1 ">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(item.value / maxValue) * 100}%`,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                        className="h-8 bg-emerald-400 flex items-center justify-end pr-3"
                      >
                        <span className="text-white text-m -mr-8 ">
                          {item.value}
                        </span>

                      </motion.div>

                    </div>
                  </div>
                ))}
              </div>

              {/* X-axis line */}
              <div className="mt-6 ml-9 h-0.5 bg-gray-300" />
            </div>

          </div>

          {/* resumes */}
          <div className="w-full max-w-5xl mx-auto bg-[#1c1c1c] rounded-2xl p-6 my-6">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-white text-lg font-semibold">
                Upload your Resume
              </h2>
              <p className="text-gray-400 text-sm">{responses.length} Responses</p>
            </div>

            {/* Scrollable list */}
            <div
              className="max-h-80 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-transparent">
              <div className="space-y-3">
                {resume.map((resume, index) => (
                  <motion.a
                    key={`${resume.name}-${index}`}
                    // download url
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className="flex items-center gap-4 bg-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm hover:bg-[#333] transition ">
                    {/* Icon */}
                    <div className="shrink-0">
                      {resume.type === "pdf" ? (
                        <div><GrDocumentPdf className="text-neutral-50 size-5" /></div>
                      ) : (
                        <div><LuImage className="text-neutral-50 size-5" /></div>
                      )}
                    </div>

                    {/* Resumes name */}
                    <span className="truncate text-green-400 underline cursor-pointer">{resume.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-end">
            <Summary_Download />
          </div>

        </motion.div>
    </div>
  );

}

export default Summary