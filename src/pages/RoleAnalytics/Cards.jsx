import { motion } from "framer-motion";

const Cards = ({ title, items }) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-[#1c1c1c] rounded-2xl p-6 my-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-white text-lg font-semibold">
          {title}
        </h2>
        <p className="text-gray-400 text-sm">
          {items.length} Responses
        </p>
      </div>

      {/* Scrollable List */}
      <div className="relative max-h-80 overflow-y-auto pr-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-400">
        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="bg-[#282828] rounded-xl px-4 py-2 text-white text-sm"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
