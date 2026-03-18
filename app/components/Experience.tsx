import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  // {
  //   title: "Senior Frontend Developer",
  //   company: "Tech Innovations Inc.",
  //   period: "2022 - Present",
  //   description: "Leading the frontend team in building scalable web applications using React and TypeScript. Implemented design systems and improved performance by 40%.",
  //   technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
  // },
  {
    title: "Web Developer Intern",
    company: "Seequenze Pvt. Ltd.",
    period: "Jan 2025 - Present",
    description: "Managing the end-to-end lifecycle of web applications, from overseeing PostgreSQL database performance to orchestrating deployments on AWS. Responsible for maintaining system stability and optimizing CI/CD workflows using Jenkins to ensure seamless delivery of Remix-based services.",
    technologies: ["Node.js", "Remix", "Typescript", "AWS", "Jenkins", "PostgreSQL"],
  },
  // {
  //   title: "Junior Developer",
  //   company: "StartUp Labs",
  //   period: "2018 - 2020",
  //   description: "Built responsive web interfaces and contributed to mobile app development. Participated in agile sprints and code reviews.",
  //   technologies: ["JavaScript", "Vue.js", "Firebase"],
  // },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Career
          </span>
          <h2 className="section-heading text-foreground mb-6">
            Work{" "}
            <span className="gradient-text-secondary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A journey through my professional career, building impactful solutions
            and growing as a developer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary to-secondary glow-primary z-10" />

              {/* Content card */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{exp.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Period */}
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="project-tag text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
