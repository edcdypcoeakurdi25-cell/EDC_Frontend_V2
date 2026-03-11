import { motion } from "framer-motion";
import { GoGraph } from "react-icons/go";
import { NavLink, Outlet } from "react-router-dom";

export default function RoleAnalytics() {

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] p-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <GoGraph className="text-green-400 text-3xl" />
            <h2 className="text-green-400 text-3xl font-semibold">
              Role Analytics
            </h2>
          </div>

          {/* Role Info */}
          <div className="flex flex-col gap-10 mb-14">
            <div className="flex gap-6">
              <span className="text-neutral-400 min-w-50 text-xl">Opening:</span>
              <span className="text-2xl font-medium text-neutral-300">Operations Associate</span>
            </div>

            <div className="flex gap-6">
              <span className="text-neutral-400 text-xl min-w-50">Number of Openings:</span>
              <span className="text-2xl font-medium text-neutral-300">3</span>
            </div>

            <div className="flex gap-6">
              <span className="text-neutral-400 text-xl min-w-50">Type of Opening:</span>
              <span className="text-2xl font-medium text-neutral-200">On-Site</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-col md:flex-row gap-10 mb-15">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="w-60 rounded-xl border border-neutral-400 bg-green-400 text-black p-8 flex flex-col items-center justify-center"
            >
              <p className="text-m font-medium text-center mb-2">Number of Applicants</p>
              <p className="text-7xl font-bold">13</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="w-60 rounded-xl border border-neutral-400 bg-neutral-800 p-8 flex flex-col items-center justify-center"
            >
              <p className="text-m text-neutral-400 text-center mb-2">Number of Views</p>
              <p className="text-7xl font-bold text-neutral-300">54</p>
              <p className="text-xs font-semibold text-neutral-500 mt-2">In last 1 month</p>
            </motion.div>
          </div>

          {/* Tab Navigation Bar */}
          <div className="flex justify-between items-center px-8 py-4">
            <NavLink to="summary">
              {({ isActive }) => (
                <motion.span
                  animate={{ color: isActive ? "#ffffff" : "#888888" }}
                  whileHover={{ color: "#22c55e" }}
                  transition={{ duration: 0.2 }}
                  className="text-m font-medium cursor-pointer"
                >
                  Summary
                </motion.span>
              )}
            </NavLink>

            <NavLink to="question">
              {({ isActive }) => (
                <motion.span
                  animate={{ color: isActive ? "#ffffff" : "#888888" }}
                  whileHover={{ color: "#22c55e" }}
                  transition={{ duration: 0.2 }}
                  className="text-m font-medium cursor-pointer"
                >
                  Question
                </motion.span>
              )}
            </NavLink>

            <NavLink to="individual">
              {({ isActive }) => (
                <motion.span
                  animate={{ color: isActive ? "#ffffff" : "#888888" }}
                  whileHover={{ color: "#22c55e" }}
                  transition={{ duration: 0.2 }}
                  className="text-m font-medium cursor-pointer"
                >
                  Individual
                </motion.span>
              )}
            </NavLink>
          </div>

          <div className="h-px w-full bg-neutral-200 mb-2" />

        </motion.div>

        {/* Active Tab Content renders here */}
        <Outlet />

      </div>
    </div>
  );
}
