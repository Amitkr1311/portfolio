import { motion } from "framer-motion";
import { Github } from "lucide-react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "podcastX - AI Podcast Platform",
    description: "An AI-powered podcast creation and discovery platform. Features automated transcription, AI-driven content generation, and a seamless discovery experience across various genres.",
    tags: ["Next.js", "Convex", "Clerk", "Gemini", "Deepgram", "TypeScript"],
    link: "https://github.com/Amitkr1311/podcastX",
    liveLink: "",
    gradient: "from-purple-500 to-pink-500",
    image: "/projects/podcastr.png",
  },
  {
    title: "CollabBoard - Real-Time Canvas",
    description: "A high-performance collaborative whiteboard using WebSockets for low-latency synchronization. Features a custom HTML5 Canvas rendering engine and optimized monorepo architecture.",
    tags: ["Next.js", "Socket.io", "TypeScript", "Turborepo", "Postgresql"],
    link: "https://github.com/Amitkr1311/CollabBoard",
    liveLink: "",
    gradient: "from-emerald-500 to-teal-500",
    image: "/projects/collabboard.png",
  },
  {
    title: "StoryForge - AI Visual Storyboard",
    description: "A Flask web app that transforms sales narratives into AI-generated visual storyboards using NLTK sentence segmentation and LLM-powered prompt engineering.",
    tags: ["Flask", "Python", "Gemini AI", "Stability AI", "NLP"],
    link: "https://github.com/Amitkr1311/StoryForge",
    liveLink: "",
    gradient: "from-orange-500 to-red-500",
    image: "/projects/storyforge.png",
  },
  {
    title: "NoteSphere - Intelligent Digital Brain",
    description: "A context-aware knowledge management system using RAG architecture for semantic search over unstructured data. Features a scalable ingestion pipeline with vector embedding integration.",
    tags: ["MERN Stack", "Hugging face", "Vector DB", "RAG", "TypeScript"], 
    link: "https://github.com/Amitkr1311/NoteSphere",
    liveLink: "",
    gradient: "from-indigo-500 to-violet-500",
    image: "/projects/notesphere.png",
  },
  {
    title: "SARS-CoV-2 Lineage Clustering",
    description: "A bioinformatics research tool utilizing unsupervised machine learning to analyze viral genomic data. Implements dimensionality reduction (PCA) and clustering algorithms.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    link: "https://github.com/Amitkr1311/sarscov2-lineage-unsupervised-clustering",
    liveLink: "",
    gradient: "from-cyan-500 to-blue-500",
    image: "/projects/sars-cov.png",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-4 relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.05),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="h-px w-12 bg-primary/50" />
               <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
                 Selected Explorations
               </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
              Digital <span className="gradient-text">Masterpieces</span>
            </h2>
            <p className="text-muted-foreground/70 text-lg md:text-xl max-w-xl font-light leading-relaxed">
              A curated collection of research, engineering, and design projects 
              pushing the boundaries of modern web and AI architecture.
            </p>
          </motion.div>

          {/* Social Proof/Filter context could go here */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col items-end text-right"
          >
             <div className="text-4xl font-bold text-foreground/20 italic mb-2">05</div>
             <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground"> Total Case Studies </div>
          </motion.div>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(400px,auto)]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-md">
            <h4 className="text-xl font-semibold text-foreground mb-2 italic">Looking for something specific?</h4>
            <p className="text-sm text-muted-foreground">My GitHub contains 20+ additional repositories spanning distributed systems, low-level optimizations, and UI experiments.</p>
          </div>
          
          <a
            href="https://github.com/Amitkr1311"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 rounded-3xl overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-primary opacity-90 group-hover:bg-primary/80 transition-colors" />
            <div className="relative flex items-center gap-4 text-white font-bold tracking-wide">
              <span>EXPLORE ALL CODEBASES</span>
              <Github size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
