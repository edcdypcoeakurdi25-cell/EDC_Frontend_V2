import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockOpenings } from "../../../lib/responses";
import { FaPlus } from "react-icons/fa6";
import NewOpeningForm from "./NewOpeningForm";

export default function App() {

  const navigate = useNavigate();

  const viewRole = () => {
    navigate("/role_analytics");
  };

  const deleteRole = () => {

  }
  const createNewOpening = () => {
    navigate("/new_opening_form")
  }


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full bg-[#0f0f0f] text-white p-5"
    >

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8"
        >
          Release Opening
        </motion.h1>

        {/* Create Opening */}
        <div className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Create New Opening
          </h2>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-64 h-40 sm:h-48 bg-[#121212] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#1e1e1e] transition-colors"
            onClick={createNewOpening}
          >
           <FaPlus  className="size-10"/> 
          </motion.div>
        </div>

        {/* Active Openings */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Active Openings
          </h2>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="border-t border-gray-700 pt-4 space-y-4"
          >

            {mockOpenings.map((opening) => (
              <motion.div
                key={opening.id}
                variants={item}
                whileHover={{ scale: 1.01 }}
                className="bg-[#121212] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-[#1e1e1e] transition-colors"
              >

                {/* Role Info */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {opening.title}
                  </h3>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">

                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                      </svg>
                      {opening.department}
                    </span>

                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243" />
                      </svg>
                      {opening.location}
                    </span>

                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0" />
                      </svg>
                      {opening.applicants} applicants
                    </span>

                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer"
                    onClick={viewRole}
                  >
                    View Role
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-400 hover:text-red-300 text-sm cursor-pointer"
                    onClick={deleteRole}
                  >
                    Delete Role
                  </motion.button>

                </div>

              </motion.div>
            ))}

          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}