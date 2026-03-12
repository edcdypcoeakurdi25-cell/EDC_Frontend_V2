import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  ArrowLeft, Plus, Trash2, GripVertical, ChevronDown,
  Lock, Info, CheckCircle2, AlignLeft, AlignJustify,
  CircleDot, CheckSquare, FileUp, X, Tag, ImageIcon,
  UploadCloud, Eye,
} from "lucide-react";

/* ─── Constants ──────────────────────────────────────────────────────────── */

const FIXED_FIELDS = [
  { id: "name",   label: "Enter your name",          type: "text",   placeholder: "Enter your name",          half: true  },
  { id: "year",   label: "Choose Year of Study",      type: "select", placeholder: "Choose any one",           half: true  },
  { id: "phone",  label: "Enter your Phone Number",   type: "text",   placeholder: "Enter your Phone Number",  half: true  },
  { id: "email",  label: "Enter your Email Address",  type: "text",   placeholder: "Enter your Email Address", half: true  },
  { id: "branch", label: "Select Branch",             type: "select", placeholder: "Choose any one",           half: false },
];

const INPUT_TYPE_OPTIONS = [
  { value: "short",  label: "Short Answer",    icon: AlignLeft,    desc: "Single line text"       },
  { value: "long",   label: "Long Answer",     icon: AlignJustify, desc: "Multi-line paragraph"   },
  { value: "mcq",    label: "Multiple Choice", icon: CircleDot,    desc: "Pick one option"        },
  { value: "mca",    label: "Multiple Correct",icon: CheckSquare,  desc: "Pick many options"      },
  { value: "upload", label: "Upload Doc",      icon: FileUp,       desc: "File / document upload" },
];

const INITIAL_CUSTOM_FIELDS = [
  {
    id: "exp-1",
    title: "Do you have any prior experience working in the field of Operations?",
    type: "long",
    required: true,
    options: [],
    image: null,
  },
];

const EMPTY_FIELD = { title: "", type: "short", required: false, image: null, options: [] };

/* ─── Motion variants ────────────────────────────────────────────────────── */

const stagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const fadeUp   = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.22 } },
};
const chipAnim = {
  hidden:  { opacity: 0, scale: 0.82, y: 6  },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { type: "spring", stiffness: 380, damping: 22 } },
  exit:    { opacity: 0, scale: 0.8,  y: -4, transition: { duration: 0.16 } },
};

const uid          = () => `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
const isChoiceType = (t) => t === "mcq" || t === "mca";

/* ─── Reusable class helpers ─────────────────────────────────────────────── */

const inputBase = twMerge(
  "w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5",
  "text-sm text-zinc-200 outline-none font-sans placeholder-zinc-600",
  "transition-all duration-200",
  "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
);

const ghostBtn = twMerge(
  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold",
  "border border-white/10 bg-white/5 text-zinc-500",
  "transition-all duration-200 hover:bg-white/10 hover:text-zinc-200 cursor-pointer"
);

/* ─── Image Uploader ─────────────────────────────────────────────────────── */

function ImageUploader({ image, onChange }) {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange({ src: e.target.result, name: file.name });
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden mt-3.5"
    >
      <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center gap-1.5 mb-3">
          <ImageIcon size={12} className="text-violet-400" />
          <span className="text-[11px] font-bold text-violet-400 tracking-widest uppercase">
            Field Image
          </span>
        </div>

        {image ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full"
          >
            <img
              src={image.src}
              alt={image.name}
              className="w-full max-h-40 object-cover rounded-lg border border-violet-500/25 block"
            />
            {/* Overlay */}
            <div className="absolute inset-0 rounded-lg bg-linear-to-t from-black/70 to-transparent flex items-end justify-between px-3 py-2.5">
              <span className="text-[11px] text-white/70 max-w-[70%] truncate">{image.name}</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="text-[11px] font-semibold text-white bg-white/15 border border-white/20 rounded-md px-2 py-0.5 backdrop-blur-sm hover:bg-white/25 transition-colors cursor-pointer"
                >
                  Change
                </button>
                <button
                  onClick={() => onChange(null)}
                  className="flex items-center bg-red-500/25 border border-red-500/40 rounded-md p-1 text-red-400 hover:bg-red-500/40 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            className={twMerge(
              "border-2 border-dashed rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200",
              dragging
                ? "border-violet-500/60 bg-violet-500/8"
                : "border-violet-500/30 hover:border-violet-500/60 hover:bg-violet-500/6"
            )}
          >
            <UploadCloud size={22} className="text-violet-500 opacity-70" />
            <div className="text-center">
              <p className="text-xs text-zinc-400 font-medium">Click to upload or drag & drop</p>
              <p className="text-[11px] text-zinc-600 mt-0.5">PNG, JPG, GIF up to 5 MB</p>
            </div>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </motion.div>
  );
}

/* ─── Options Editor (MCQ / MCA) ─────────────────────────────────────────── */

function OptionsEditor({ options, onChange, error, type }) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef(null);
  const isMCQ = type === "mcq";

  const commit = () => {
    const val = draft.trim();
    if (!val) return;
    if (options.find((o) => o.label.toLowerCase() === val.toLowerCase())) {
      inputRef.current?.focus();
      return;
    }
    onChange([...options, { id: uid(), label: val }]);
    setDraft("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const remove = (id) => onChange(options.filter((o) => o.id !== id));

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden mt-3.5"
    >
      <div
        className={twMerge(
          "bg-blue-500/6 rounded-xl p-4 transition-colors duration-200",
          error ? "border border-red-500/35" : "border border-blue-400/20"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-1.5 mb-3">
          <Tag size={12} className="text-blue-400" />
          <span className="text-[11px] font-bold text-blue-400 tracking-widest uppercase">
            {isMCQ ? "Choice Options (pick one)" : "Choice Options (pick many)"}
          </span>
          {options.length > 0 && (
            <span className="ml-auto bg-blue-400/15 text-blue-400 text-[10px] font-bold rounded-full px-2 py-0.5">
              {options.length}
            </span>
          )}
        </div>

        {/* Option rows */}
        <AnimatePresence mode="popLayout">
          {options.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-1.5 mb-3"
            >
              {options.map((opt, idx) => (
                <motion.div
                  key={opt.id}
                  variants={chipAnim}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="flex items-center gap-2 bg-white/3 border border-white/7 rounded-lg px-2.5 py-1.5"
                >
                  <div
                    className={twMerge(
                      "w-4 h-4 border border-blue-400/40 bg-blue-400/6 shrink-0 flex items-center justify-center",
                      isMCQ ? "rounded-full" : "rounded"
                    )}
                  >
                    <span className="text-[9px] font-bold text-blue-400">{idx + 1}</span>
                  </div>
                  <span className="flex-1 text-[13px] text-zinc-400">{opt.label}</span>
                  <button
                    onClick={() => remove(opt.id)}
                    className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer p-0 bg-transparent border-none"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input row */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } }}
            placeholder={options.length === 0 ? "e.g. Option A…" : "Add another option…"}
            className={twMerge(
              inputBase,
              "border-blue-400/25 focus:border-blue-400/55 focus:ring-blue-400/10"
            )}
          />
          <button
            onClick={commit}
            disabled={!draft.trim()}
            className={twMerge(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 whitespace-nowrap",
              draft.trim()
                ? "bg-blue-400/18 border-blue-400/35 text-blue-400 cursor-pointer hover:bg-blue-400/28"
                : "bg-white/4 border-white/8 text-zinc-700 cursor-not-allowed"
            )}
          >
            <Plus size={13} /> Add
          </button>
        </div>

        {options.length === 0 && (
          <p className="mt-2 text-[11px] text-zinc-600">
            Press{" "}
            <kbd className="bg-white/7 border border-white/10 rounded px-1.5 py-0.5 text-[10px]">
              Enter
            </kbd>{" "}
            or click Add. Min 2 options required.
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Field Card ─────────────────────────────────────────────────────────── */

function FieldCard({ field, onRemove, onToggleRequired }) {
  const [showDetails, setShowDetails] = useState(false);
  const TypeIcon = INPUT_TYPE_OPTIONS.find((o) => o.value === field.type)?.icon || AlignLeft;
  const hasDetails = isChoiceType(field.type) || field.image;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="relative bg-white/3 border border-white/8 rounded-2xl px-5 py-4 mb-3 overflow-hidden"
    >
      {/* accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-0.75 rounded-l-2xl bg-linear-to-b from-violet-500 to-blue-500" />

      {/* Header row */}
      <div className="flex items-start gap-2.5 mb-2.5">
        <GripVertical size={16} className="text-zinc-700 mt-0.5 cursor-grab shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-zinc-300 font-medium leading-relaxed">
            {field.title}
            {field.required && <span className="text-red-500 ml-0.5">*</span>}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <TypeIcon size={11} className="text-blue-400" />
            <span className="text-[11px] text-zinc-600 uppercase tracking-wider">
              {INPUT_TYPE_OPTIONS.find((o) => o.value === field.type)?.label}
              {isChoiceType(field.type) && field.options?.length > 0 && ` · ${field.options.length} options`}
            </span>
            {field.image && (
              <span className="ml-1 bg-violet-500/12 border border-violet-500/25 rounded text-[10px] text-violet-400 font-bold px-1.5 py-0.5">
                IMG
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 shrink-0">
          {hasDetails && (
            <button
              onClick={() => setShowDetails((p) => !p)}
              className={ghostBtn}
            >
              <Eye size={11} />
              {showDetails ? "Hide" : "View"}
            </button>
          )}
          <button
            onClick={() => onToggleRequired(field.id)}
            className={twMerge(
              "px-2 py-1 rounded-lg text-[11px] font-bold tracking-wider border transition-all duration-200 cursor-pointer",
              field.required
                ? "bg-red-500/12 border-red-500/30 text-red-400"
                : "bg-white/6 border-white/10 text-zinc-500 hover:text-zinc-300"
            )}
          >
            {field.required ? "REQ" : "OPT"}
          </button>
          <button
            onClick={() => onRemove(field.id)}
            className="flex items-center p-1.5 rounded-lg bg-red-500/8 border border-red-500/15 text-red-400 hover:bg-red-500/18 transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            {field.image && (
              <div className={twMerge("mb-2.5", !isChoiceType(field.type) && "mb-0")}>
                <img
                  src={field.image.src}
                  alt={field.image.name}
                  className="w-full max-h-36 object-cover rounded-lg border border-white/7"
                />
              </div>
            )}
            {isChoiceType(field.type) && field.options?.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {field.options.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center gap-2 bg-white/2 border border-white/6 rounded-lg px-2.5 py-1.5"
                  >
                    <div
                      className={twMerge(
                        "w-3.5 h-3.5 border border-violet-500/40 bg-violet-500/6 shrink-0",
                        field.type === "mcq" ? "rounded-full" : "rounded-sm"
                      )}
                    />
                    <span className="text-xs text-zinc-500">{opt.label}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline answer preview */}
      {!showDetails && (
        <>
          {field.type === "short" && (
            <input
              disabled
              placeholder="Short answer…"
              className="w-full bg-white/3 border border-white/7 rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-600 outline-none cursor-not-allowed"
            />
          )}
          {field.type === "long" && (
            <textarea
              disabled
              placeholder="Long answer…"
              className="w-full bg-white/3 border border-white/7 rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-600 outline-none resize-none h-16 cursor-not-allowed font-sans"
            />
          )}
          {isChoiceType(field.type) && field.options?.length === 0 && (
            <p className="text-[11px] text-zinc-700 mt-0.5">No options defined.</p>
          )}
          {isChoiceType(field.type) && field.options?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {field.options.slice(0, 3).map((opt) => (
                <span
                  key={opt.id}
                  className="bg-blue-400/8 border border-blue-400/15 rounded px-2 py-0.5 text-[11px] text-blue-900/60"
                >
                  {opt.label}
                </span>
              ))}
              {field.options.length > 3 && (
                <span className="text-[11px] text-zinc-600 py-0.5">
                  +{field.options.length - 3} more
                </span>
              )}
            </div>
          )}
          {field.type === "upload" && (
            <div className="flex items-center gap-2 bg-white/3 border border-dashed border-white/10 rounded-xl px-3.5 py-2.5">
              <FileUp size={14} className="text-zinc-600" />
              <span className="text-xs text-zinc-600">Applicant uploads a file here</span>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function FormBuilder() {
  const [customFields, setCustomFields] = useState(INITIAL_CUSTOM_FIELDS);
  const [newField, setNewField]         = useState(EMPTY_FIELD);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showImgPanel, setShowImgPanel] = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [errors, setErrors]             = useState({});
  const typeMenuRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (typeMenuRef.current && !typeMenuRef.current.contains(e.target))
        setShowTypeMenu(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const addField = () => {
    if (!newField.title.trim()) { setErrors({ title: "Field title is required" }); return; }
    if (isChoiceType(newField.type) && newField.options.length < 2) {
      setErrors({ options: "Please add at least 2 options" }); return;
    }
    setCustomFields((prev) => [
      ...prev,
      {
        id:       `field-${Date.now()}`,
        title:    newField.title.trim(),
        type:     newField.type,
        required: newField.required,
        image:    newField.image,
        options:  newField.options,
      },
    ]);
    setNewField(EMPTY_FIELD);
    setShowImgPanel(false);
    setErrors({});
  };

  const removeField    = (id) => setCustomFields((p) => p.filter((f) => f.id !== id));
  const toggleRequired = (id) => setCustomFields((p) => p.map((f) => f.id === id ? { ...f, required: !f.required } : f));
  const selectedType   = INPUT_TYPE_OPTIONS.find((o) => o.value === newField.type);

  return (
    <div className="min-h-screen bg-[#111114] text-zinc-200 font-sans">
      <div className="w-full px-5 pb-24">

        {/* ── Go Back ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-5 pb-2.5"
        >
          <button className={twMerge(ghostBtn, "text-zinc-500 hover:text-zinc-200")}>
            <ArrowLeft size={14} /> Go Back
          </button>
        </motion.div>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mb-8 pt-3"
        >
          <h1 className="text-xl font-bold tracking-tight">
            Create the Form for the Opening{" "}
            <span className="font-normal text-zinc-500 text-[18px]">— Operations Associate</span>
          </h1>
        </motion.div>

        {/* ── Locked Fields ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="bg-white/3 border border-white/7 rounded-2xl px-6 py-6 mb-6"
        >
          <div className="flex flex-wrap gap-4">
            {FIXED_FIELDS.map((field) => (
              <motion.div
                key={field.id}
                variants={fadeUp}
                className={twMerge("min-w-50", field.half ? "w-[calc(50%-8px)]" : "w-full")}
              >
                <label className="block text-xs text-zinc-500 mb-1.5 font-medium tracking-wide">
                  {field.label}
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  {field.type === "select" ? (
                    <div className="flex items-center bg-white/4 border border-white/8 rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-600 cursor-not-allowed opacity-70 pr-9">
                      <span className="flex-1">{field.placeholder}</span>
                      <ChevronDown size={14} className="absolute right-3 text-zinc-700" />
                    </div>
                  ) : (
                    <input
                      disabled
                      placeholder={field.placeholder}
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-600 outline-none cursor-not-allowed opacity-70 pr-8"
                    />
                  )}
                  <Lock
                    size={11}
                    className={twMerge(
                      "absolute top-1/2 -translate-y-1/2 text-zinc-700",
                      field.type === "select" ? "right-7" : "right-3"
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notice */}
          <motion.div
            variants={fadeUp}
            className="mt-5 pt-4 border-t border-dashed border-white/8 flex items-start gap-2"
          >
            <Info size={13} className="text-zinc-600 mt-0.5 shrink-0" />
            <p className="text-xs text-zinc-600 leading-relaxed">
              Above fields aren&apos;t Editable. Kindly start Editing the Form from this point onwards.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Custom Fields ── */}
        <AnimatePresence mode="popLayout">
          {customFields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              onRemove={removeField}
              onToggleRequired={toggleRequired}
            />
          ))}
        </AnimatePresence>

        {/* ── Add New Field Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="bg-violet-500/6 border border-violet-500/20 rounded-2xl px-5 py-5 mt-2"
        >
          <p className="text-[11px] font-bold text-violet-400 tracking-widest uppercase mb-4">
            + Add New Field
          </p>

          {/* Title input */}
          <div className="mb-3.5">
            <input
              value={newField.title}
              onChange={(e) => { setNewField((p) => ({ ...p, title: e.target.value })); if (errors.title) setErrors({}); }}
              placeholder="Enter the field title / question"
              className={twMerge(
                inputBase,
                errors.title && "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/10"
              )}
            />
            {errors.title && (
              <p className="mt-1 text-[11px] text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Type + controls row */}
          <div className="flex gap-2.5 items-end flex-wrap">

            {/* Type dropdown */}
            <div ref={typeMenuRef} className="flex-1 min-w-45 relative">
              <label className="block text-[11px] text-zinc-600 font-semibold tracking-wider uppercase mb-1.5">
                Input Type
              </label>
              <button
                onClick={() => setShowTypeMenu((p) => !p)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-[13px] text-zinc-300 flex items-center justify-between gap-2 font-sans cursor-pointer hover:bg-white/8 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {selectedType && (
                    <selectedType.icon size={13} className="text-violet-400" />
                  )}
                  {selectedType?.label || "Select type"}
                </span>
                <ChevronDown
                  size={13}
                  className={twMerge(
                    "transition-transform duration-200 text-zinc-500",
                    showTypeMenu && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {showTypeMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-[calc(100%+6px)] left-0 right-0 bg-[#1a1a24] border border-white/12 rounded-xl z-50 overflow-hidden shadow-2xl"
                  >
                    {INPUT_TYPE_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const active = newField.type === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setNewField((p) => ({
                              ...p,
                              type: opt.value,
                              options: isChoiceType(opt.value) ? p.options : [],
                            }));
                            setShowTypeMenu(false);
                            if (errors.options) setErrors({});
                          }}
                          className={twMerge(
                            "w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] border-b border-white/5 last:border-0 font-sans text-left cursor-pointer transition-colors duration-150",
                            active
                              ? "bg-violet-500/12 text-violet-300"
                              : "bg-transparent text-zinc-400 hover:bg-white/4"
                          )}
                        >
                          <div
                            className={twMerge(
                              "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                              active ? "bg-violet-500/20" : "bg-white/5"
                            )}
                          >
                            <Icon
                              size={13}
                              className={active ? "text-violet-400" : "text-zinc-500"}
                            />
                          </div>
                          <div>
                            <div className="font-semibold leading-snug">{opt.label}</div>
                            <div className="text-[11px] text-zinc-600 mt-0.5">{opt.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right-side controls */}
            <div className="flex flex-col gap-2">
              {/* Add Image button */}
              <button
                onClick={() => setShowImgPanel((p) => !p)}
                className={twMerge(
                  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 whitespace-nowrap cursor-pointer",
                  showImgPanel || newField.image
                    ? "bg-violet-500/18 border-violet-500/40 text-violet-300"
                    : "bg-white/5 border-white/10 text-zinc-500 hover:bg-white/8 hover:text-zinc-300"
                )}
              >
                <ImageIcon size={14} />
                {newField.image ? "Image Added ✓" : "Add Image"}
              </button>

              {/* Required toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-600 whitespace-nowrap">Required</span>
                <button
                  onClick={() => setNewField((p) => ({ ...p, required: !p.required }))}
                  className={twMerge(
                    "relative w-10 h-5.5 rounded-full border-none cursor-pointer shrink-0 transition-colors duration-250 p-0",
                    newField.required ? "bg-linear-to-r from-violet-500 to-blue-500" : "bg-white/10"
                  )}
                >
                  <motion.div
                    animate={{ x: newField.required ? 18 : 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="absolute top-0.75 w-4 h-4 rounded-full bg-white shadow"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Image Uploader */}
          <AnimatePresence>
            {showImgPanel && (
              <ImageUploader
                image={newField.image}
                onChange={(img) => setNewField((p) => ({ ...p, image: img }))}
              />
            )}
          </AnimatePresence>

          {/* Options Editor */}
          <AnimatePresence>
            {isChoiceType(newField.type) && (
              <OptionsEditor
                type={newField.type}
                options={newField.options}
                error={!!errors.options}
                onChange={(opts) => {
                  setNewField((p) => ({ ...p, options: opts }));
                  if (errors.options) setErrors({});
                }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {errors.options && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1.5 text-[11px] text-red-400"
              >
                {errors.options}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Live preview */}
          <AnimatePresence>
            {newField.title && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3.5"
              >
                <div className="bg-violet-500/5 border border-dashed border-violet-500/25 rounded-xl p-3.5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 mb-2">
                    <Eye size={12} /> Preview
                  </p>

                  {newField.image && (
                    <img
                      src={newField.image.src}
                      alt=""
                      className="w-full max-h-24 object-cover rounded-lg mb-2 border border-white/7"
                    />
                  )}

                  <p className="text-[13px] text-zinc-300 mb-2">
                    {newField.title}
                    {newField.required && <span className="text-red-500 ml-0.5">*</span>}
                  </p>

                  {newField.type === "short" && (
                    <div className="bg-white/3 border border-white/6 rounded-lg px-3 py-2 text-xs text-zinc-700">
                      Short answer…
                    </div>
                  )}
                  {newField.type === "long" && (
                    <div className="bg-white/3 border border-white/6 rounded-lg px-3 py-2 text-xs text-zinc-700 h-12">
                      Long answer…
                    </div>
                  )}
                  {isChoiceType(newField.type) && newField.options.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      {newField.options.map((opt) => (
                        <div key={opt.id} className="flex items-center gap-2">
                          <div
                            className={twMerge(
                              "w-3.5 h-3.5 border border-violet-500/40 bg-violet-500/6 shrink-0",
                              newField.type === "mcq" ? "rounded-full" : "rounded-sm"
                            )}
                          />
                          <span className="text-xs text-zinc-500">{opt.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {isChoiceType(newField.type) && newField.options.length === 0 && (
                    <div className="text-xs text-zinc-700 italic">Add options above to preview…</div>
                  )}
                  {newField.type === "upload" && (
                    <div className="flex items-center gap-2 bg-white/3 border border-dashed border-white/10 rounded-lg px-3 py-2">
                      <FileUp size={13} className="text-zinc-700" />
                      <span className="text-xs text-zinc-700">File upload input</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Field button */}
          <motion.button
            onClick={addField}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-linear-to-r from-violet-500 to-blue-500 text-white font-bold text-sm rounded-xl py-3 px-6 cursor-pointer border-none shadow-[0_4px_20px_rgba(124,92,252,0.3)] hover:shadow-[0_6px_28px_rgba(124,92,252,0.45)] transition-shadow duration-200"
          >
            <Plus size={16} /> Add Field to Form
          </motion.button>
        </motion.div>

        {/* ── Save / Discard ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex justify-end gap-3"
        >
          <button className="bg-transparent border border-white/10 rounded-xl px-5 py-2.5 text-[13px] text-zinc-500 font-medium cursor-pointer hover:border-white/20 hover:text-zinc-400 transition-colors">
            Discard
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSubmitted(true)}
            className="flex items-center gap-1.5 bg-white text-[#0d0d0f] font-bold text-[13px] rounded-xl px-6 py-2.5 cursor-pointer border-none shadow-[0_2px_12px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-shadow"
          >
            <CheckCircle2 size={15} /> Save Form
          </motion.button>
        </motion.div>

        {/* ── Toast ── */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onAnimationComplete={() => setTimeout(() => setSubmitted(false), 2500)}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-linear-to-r from-violet-500 to-blue-500 text-white font-semibold text-sm rounded-2xl px-6 py-3.5 flex items-center gap-2.5 shadow-[0_8px_40px_rgba(124,92,252,0.4)] z-50 whitespace-nowrap"
            >
              <CheckCircle2 size={18} />
              Form saved with {customFields.length} field{customFields.length !== 1 ? "s" : ""}!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}