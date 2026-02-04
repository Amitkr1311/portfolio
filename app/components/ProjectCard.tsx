import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

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

const ProjectCard = ({ project, index, featured = false }: ProjectCardProps) => {
  const gradientMap: Record<string, string> = {
    "from-cyan-500 to-blue-500": "from-primary to-blue-500",
    "from-purple-500 to-pink-500": "from-secondary to-pink-500",
    "from-orange-500 to-red-500": "from-orange-500 to-red-500",
  };

  const mappedGradient = gradientMap[project.gradient] || project.gradient;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <div className="glass-card animated-border h-full flex flex-col transition-transform duration-500 ease-out hover:-translate-y-2">
        {/* Project Preview */}
        <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-48"}`}>
          {/* Project Image */}
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${mappedGradient} opacity-80`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.4),transparent)]" />
            </>
          )}
          
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                Code
              </motion.a>
            )}
            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className={`font-bold text-foreground mb-3 group-hover:gradient-text transition-all duration-300 ${featured ? "text-2xl" : "text-xl"}`}>
            {project.title}
          </h3>
          
          <p className={`text-muted-foreground leading-relaxed mb-5 flex-1 ${featured ? "text-base" : "text-sm"}`}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
