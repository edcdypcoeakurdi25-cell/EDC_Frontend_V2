import React from 'react';
import { 
  LayoutTemplate,
  Eye,
  Target,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewOpeningForm() {
    
    const FormRow = ({ icon: Icon, label, children }) => (
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3 text-gray-200 font-medium text-[14px]">
          <Icon className="w-4.5 h-4.5 text-gray-300" strokeWidth={2} />
          <span>{label}</span>
        </div>
        <div className="w-85">
          {children}
        </div>
      </div>
  );
  
  const navigate = useNavigate();
  const FormNext = () => {
    navigate("/detailed_opening_form")
  }
    
    const FormTextarea = ({ label }) => (
      <div className="mb-6">
        <label className="block text-gray-200 font-medium text-[14px] mb-3">
          {label}
        </label>
        <textarea
          className="w-full bg-[#202020] border-none rounded-md p-4 text-gray-200 text-[14px] min-h-35 focus:outline-none focus:ring-1 focus:ring-[#444] custom-scrollbar"
        />
      </div>
    );
  return (
    <main className="flex-1 bg-[#111111] min-h-screen flex justify-center py-10 custom-scrollbar font-sans">
      <div className="w-full max-w-212.5 px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-1">
          <button className="text-white font-semibold text-[15px] hover:text-gray-300 transition-colors">
            Go Back
          </button>
          <div className="flex items-center gap-3 text-gray-400 font-medium text-[14px]">
            Opening Title
            <button className="bg-[#2a2a2a] text-[#888] text-[9px] px-2 py-0.5 rounded hover:bg-[#333] transition-colors uppercase tracking-wide font-bold">
              Edit
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#161616] rounded-xl p-10 pb-8 shadow-sm">
          
          {/* Top Inputs */}
          <div className="mb-12">
            <FormRow icon={LayoutTemplate} label="Domain of the Opening:">
              <input 
                type="text" 
                className="w-full bg-[#202020] border-none rounded-md px-4 py-2.5 text-[13px] text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#444] transition-all" 
              />
            </FormRow>

            <FormRow icon={Eye} label="Choose Type of Work:">
              <div className="relative">
                <select className="w-full bg-[#202020] border-none rounded-md px-4 py-2.5 text-[13px] text-gray-400 appearance-none focus:outline-none focus:ring-1 focus:ring-[#444] transition-all cursor-pointer">
                  <option>Choose One</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" strokeWidth={2} />
              </div>
            </FormRow>

            <FormRow icon={Target} label="Enter Number of Openings:">
              <input 
                type="number" 
                className="w-full bg-[#202020] border-none rounded-md px-4 py-2.5 text-[13px] text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#444] transition-all" 
              />
            </FormRow>
          </div>

          {/* Textareas */}
          <FormTextarea label="Enter Pre-text of the Role (for the Cards View):" />
          <FormTextarea label="Enter About the Role:" />
          <FormTextarea label="Enter Skills Required for the Role:" />
          <FormTextarea label="Any Extra Information you want to provide:" />

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-10 pt-2">
            <button className="px-12 py-2.5 rounded-lg border border-[#333] text-gray-300 hover:bg-[#202020] hover:text-white transition-all text-[14px] font-medium">
              Clear
            </button>
            <button className="px-12 py-2.5 rounded-lg bg-white text-black hover:bg-gray-200 transition-all text-[14px] font-semibold shadow-sm"
            onClick={FormNext}>
              Next
            </button>
          </div>

        </div>
      </div>
      
      {/* Scrollbar styling for a cleaner look */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 20px;
        }
      `}} />
    </main>
  );
};

// export default function App() {
//   return (
//     <div className="min-h-screen bg-[#111111] flex items-start justify-start overflow-hidden">
//       <ReleaseOpeningForm />
//     </div>
//   );
// }