import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  liveLink?: string;
  gradient: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

// Accent colors per gradient
const accentMap: Record<string, { color: string; glow: string; label: string }> = {
  "from-cyan-500 to-blue-500":    { color: "#22d3ee", glow: "rgba(34,211,238,0.35)", label: "cyan" },
  "from-purple-500 to-pink-500":  { color: "#e879f9", glow: "rgba(232,121,249,0.35)", label: "purple" },
  "from-orange-500 to-red-500":   { color: "#fb923c", glow: "rgba(251,146,60,0.35)",  label: "orange" },
  "from-emerald-500 to-teal-500":  { color: "#10b981", glow: "rgba(16,185,129,0.35)", label: "emerald" },
  "from-indigo-500 to-violet-500": { color: "#6366f1", glow: "rgba(99,102,241,0.35)", label: "indigo" },
};

const fallbackAccent = { color: "#a3e635", glow: "rgba(163,230,53,0.35)", label: "lime" };

const ProjectCard = ({ project, index, featured = false }: ProjectCardProps) => {
  const accent = accentMap[project.gradient] ?? fallbackAccent;

  // 3-D tilt on mouse
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`group relative ${featured ? "md:col-span-2" : ""}`}
    >
      {/* Ambient glow behind card */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: accent.glow }}
      />

      {/* Card shell */}
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col h-full"
        style={{
          background: "rgba(10,10,14,0.82)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Moving glare layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.06) 0%, transparent 65%)`,
          }}
        />

        {/* ── Visual header ── */}
        <div
          className={`relative overflow-hidden ${featured ? "h-72" : "h-52"}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <>
              {/* Gradient base */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-25`} />

              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
                <defs>
                  <pattern id={`grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
              </svg>

              {/* Floating orb */}
              <motion.div
                animate={{ y: [0, -10, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl`}
                style={{
                  width: featured ? 200 : 140,
                  height: featured ? 200 : 140,
                  background: `radial-gradient(circle, ${accent.color}55, transparent 70%)`,
                }}
              />

              {/* Index numeral — editorial touch */}
              <span
                className="absolute bottom-4 right-5 font-black select-none"
                style={{
                  fontSize: featured ? "7rem" : "5rem",
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.04)",
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  letterSpacing: "-0.04em",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </>
          )}

          {/* Bottom fade into card body */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(10,10,14,0.95)] to-transparent" />

          {/* Accent dot + label */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: accent.color, boxShadow: `0 0 8px ${accent.color}` }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: accent.color, fontFamily: "monospace" }}
            >
              {accent.label}
            </span>
          </div>

          {/* Link buttons — appear on hover */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Github className="w-3 h-3" /> Code
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: accent.color,
                  color: "#000",
                }}
              >
                <ExternalLink className="w-3 h-3" /> Live
              </a>
            )}
          </div>
        </div>

        {/* ── Content body ── */}
        <div className="flex-1 flex flex-col p-6 gap-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`font-bold leading-tight text-white ${featured ? "text-2xl" : "text-lg"}`}
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.01em" }}
            >
              {project.title}
            </h3>
            <motion.div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: `${accent.color}18`, border: `1px solid ${accent.color}44` }}
              whileHover={{ scale: 1.15, rotate: 45 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowUpRight className="w-4 h-4" style={{ color: accent.color }} />
            </motion.div>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Lora', Georgia, serif" }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(to right, transparent, ${accent.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;

/*
  ── Font imports (add to your root layout / index.html) ──────────────────
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Lora:ital@0;1&display=swap" rel="stylesheet" />
  ──────────────────────────────────────────────────────────────────────────
*/
