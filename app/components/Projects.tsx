import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import project1 from "@/public/projects/project1.jpg";

const projects = [
  {
    title: "MeetAI - Intelligent Meeting Assistant",
    description: "An AI-powered utility designed to streamline meeting productivity. Leverages natural language processing to generate automated summaries, extract action items, and organize meeting contexts.",
    tags: ["Next.js", "TypeScript", "Gemini", "Postgresql", "Better Auth", "Shadcn"], // Inferred stack; update if using Next.js/React
    link: "https://github.com/Amitkr1311/meetai",
    liveLink: "",
    gradient: "from-orange-500 to-red-500",
    image: "/projects/meetai.jpg",
  },
  {
    title: "CollabBoard - Real-Time Canvas",
    description: "A high-performance collaborative whiteboard using WebSockets for low-latency synchronization. Features a custom HTML5 Canvas rendering engine and optimized monorepo architecture.",
    tags: ["Next.js", "Socket.io", "TypeScript", "Turborepo", "Postgresql"], //
    link: "https://github.com/Amitkr1311/CollabBoard", // Add specific repo link
    liveLink: "",
    gradient: "from-emerald-500 to-teal-500",
    image: "/projects/collabboard.jpg",
  },
  {
  title: "NoteSphere - Intelligent Digital Brain",
  description: "A context-aware knowledge management system using RAG architecture for semantic search over unstructured data. Features a scalable ingestion pipeline with TypeScript validation and vector embedding integration for intelligent information retrieval.",
  tags: ["MERN Stack", "Hugging face", "Vector DB", "RAG", "TypeScript"], 
  link: "https://github.com/Amitkr1311/NoteSphere",
  liveLink: "", // Add if deployed
  gradient: "from-indigo-500 to-violet-500",
  image: "/projects/notesphere.jpg",
  },
  {
    title: "SARS-CoV-2 Lineage Clustering",
    description: "A bioinformatics research tool utilizing unsupervised machine learning to analyze viral genomic data. Implements dimensionality reduction (PCA) and clustering algorithms to identify and visualize viral lineage variants.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    link: "https://github.com/Amitkr1311/sarscov2-lineage-unsupervised-clustering",
    liveLink: "",
    gradient: "from-cyan-500 to-blue-700",
    image: "/projects/sars-cov.jpg",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="section-heading text-foreground mb-6">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A selection of projects that showcase my passion for building 
            beautiful, functional, and user-centric digital experiences.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-primary-foreground transition-all duration-300 hover:scale-105 glow-primary"
            style={{ background: "var(--gradient-primary)" }}
          >
            View All Projects
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
