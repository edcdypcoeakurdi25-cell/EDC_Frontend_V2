
import { FaRegArrowAltCircleDown } from "react-icons/fa";

const Summary_Download = () => (
  <button
    type="button"
    className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-neutral-800 px-5 py-2
               text-lg font-semibold text-gray-300 hover:bg-neutral-700 hover:text-white
               cursor-pointer "
  >
    <FaRegArrowAltCircleDown className="size-5" />
    Download Summary
  </button>
);

export default Summary_Download;