"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "podcastX - AI Podcast Platform",
    description:
      "An AI-powered podcast creation and discovery platform. Features automated transcription, AI-driven content generation, and a seamless discovery experience across various genres.",
    tags: ["Next.js", "Convex", "Clerk", "Gemini", "Deepgram", "TypeScript"],
    link: "https://github.com/Amitkr1311/podcastX",
    liveLink: "https://podcastx.iamamit.me/",
    gradient: "from-purple-500 to-pink-500",
    image: "/projects/podcastx.png",
  },
  {
    title: "CollabBoard - Real-Time Canvas",
    description:
      "A high-performance collaborative whiteboard using WebSockets for low-latency synchronization. Features a custom HTML5 Canvas rendering engine and optimized monorepo architecture.",
    tags: ["Next.js", "Socket.io", "TypeScript", "Turborepo", "Postgresql"],
    link: "https://github.com/Amitkr1311/CollabBoard",
    liveLink: "",
    gradient: "from-emerald-500 to-teal-500",
    image: "/projects/collabboard.png",
  },
  {
    title: "StoryForge - AI Visual Storyboard",
    description:
      "A Flask web app that transforms sales narratives into AI-generated visual storyboards using NLTK sentence segmentation and LLM-powered prompt engineering.",
    tags: ["Flask", "Python", "Gemini AI", "Stability AI", "NLP"],
    link: "https://github.com/Amitkr1311/StoryForge",
    liveLink: "",
    gradient: "from-orange-500 to-red-500",
    image: "/projects/storyforge.png",
  },
  {
    title: "NoteSphere - Intelligent Digital Brain",
    description:
      "A context-aware knowledge management system using RAG architecture for semantic search over unstructured data. Features a scalable ingestion pipeline with vector embedding integration.",
    tags: ["MERN Stack", "Hugging Face", "Vector DB", "RAG", "TypeScript"],
    link: "https://github.com/Amitkr1311/NoteSphere",
    liveLink: "",
    gradient: "from-indigo-500 to-violet-500",
    image: "/projects/notesphere.png",
  },
  {
    title: "SARS-CoV-2 Lineage Clustering",
    description:
      "A bioinformatics research tool utilizing unsupervised machine learning to analyze viral genomic data. Implements dimensionality reduction (PCA) and clustering algorithms.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    link: "https://github.com/Amitkr1311/sarscov2-lineage-unsupervised-clustering",
    liveLink: "",
    gradient: "from-cyan-500 to-blue-500",
    image: "/projects/sars-cov.png",
  },
];

const Projects = () => {
  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      className="relative overflow-x-hidden overflow-y-visible bg-gradient-to-b from-orange-50/30 via-rose-50/40 to-stone-50 dark:!bg-transparent dark:from-transparent dark:via-transparent dark:to-transparent py-28 px-4 md:py-32"
    >
      {/* Soft grid + glow — common on modern dev portfolios */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 95%)",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 95%)",
        }}
      />
      <div className="absolute left-1/2 top-24 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-10 md:mb-20 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio
            </span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl md:leading-[1.08]">
              Selected{" "}
              <span className="gradient-text">work</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Product engineering, research tooling, and full-stack builds — shipped with clear UX and
              solid architecture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="hidden shrink-0 text-right md:block"
          >
            <p className="font-mono text-5xl font-light tabular-nums text-muted-foreground/30">
              {String(projects.length).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              projects
            </p>
          </motion.div>
        </div>

        {/* Featured hero — full width */}
        <ProjectCard project={featured} index={0} featured />

        {/* Rest — slide-in from right on scroll; reverse on scroll up */}
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:gap-12">
          {rest.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-border pt-14 md:flex-row md:items-center"
        >
          <div className="max-w-lg">
            <h4 className="text-lg font-semibold text-foreground">More on GitHub</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Additional repos cover experiments, CLI utilities, and backend services — explore the full history there.
            </p>
          </div>
          <a
            href="https://github.com/Amitkr1311"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-card px-8 py-4 font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-muted/50"
          >
            <Github className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" />
            @Amitkr1311
            <span className="text-muted-foreground transition group-hover:translate-x-0.5">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
