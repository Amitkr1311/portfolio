import { motion } from "framer-motion";

const skills = [
  { name: "React", level: 90, icon: "⚛️" },
  { name: "Next.js", level: 85, icon: "▲" },
  { name: "TypeScript", level: 88, icon: "📘" },
  { name: "Node.js", level: 85, icon: "🟢" },
  { name: "Golang", level: 80, icon: "🐹" },
  { name: "AWS", level: 82, icon: "☁️" },
  { name: "PostgreSQL", level: 84, icon: "🐘" },
  { name: "MongoDB", level: 82, icon: "🍃" },
  { name: "Docker", level: 78, icon: "🐳" },
  { name: "Jenkins", level: 80, icon: "⚙️" },
  { name: "Python", level: 82, icon: "🐍" },
  { name: "Git", level: 92, icon: "📦" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

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
            Expertise
          </span>
          <h2 className="section-heading text-foreground mb-6">
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Hexagon Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="hexagon-wrapper group cursor-default"
              >
                {/* Hexagon shape */}
                <div className="hexagon relative w-28 h-32 md:w-32 md:h-36 flex items-center justify-center">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 hexagon-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  {/* Main hexagon */}
                  <div className="hexagon-inner absolute inset-1 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-primary/50">
                    {/* Icon */}
                    <motion.span
                      className="text-3xl md:text-4xl mb-1"
                      whileHover={{ scale: 1.2 }}
                    >
                      {skill.icon}
                    </motion.span>

                    {/* Name */}
                    <span className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors text-center px-2">
                      {skill.name}
                    </span>

                    {/* Level indicator */}
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            i < Math.floor(skill.level / 20)
                              ? "bg-primary"
                              : "bg-muted-foreground/30"
                          }`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 + i * 0.1 + 0.3 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hexagon CSS */}
      <style>{`
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .hexagon-bg {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(135deg, hsl(175 80% 50% / 0.4), hsl(260 80% 65% / 0.4));
        }
        .hexagon-inner {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: hsl(220 20% 8% / 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid hsl(220 15% 25% / 0.5);
        }
        .hexagon-wrapper:hover .hexagon-inner {
          background: hsl(220 20% 10% / 0.9);
          box-shadow: inset 0 0 30px hsl(175 80% 50% / 0.1);
        }
      `}</style>
    </section>
  );
};

export default Skills;
