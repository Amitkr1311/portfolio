import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY RAICHUR",
    period: "2023 - 2027",
    description: "Pursuing a B.Tech degree with a focus on software development, algorithms, and system design. Focus on Cloud Native architectures and Full-Stack development.",
    icon: GraduationCap,
    gradient: "from-secondary to-pink-500",
  },
  {
    degree: "Senior Secondary Education (Class XII)",
    institution: "JAWAHAR NAVODAYA VIDYALAYA, KOLASI, KATIHAR, BIHAR",
    period: "2020 - 2022",
    description: "Completed Senior Secondary education with a focus on PCM (Physics, Chemistry, Mathematics). Developed early interest in computer science and logical reasoning.",
    icon: BookOpen,
    gradient: "from-primary to-blue-500",
  },
  {
    degree: "Secondary Education (Class X)",
    institution: "JAWAHAR NAVODAYA VIDYALAYA, KOLASI, KATIHAR, BIHAR",
    period: "2015 - 2020",
    description: "Foundational education with strong emphasis on academic discipline and competitive preparation. Selected through JNVST national-level entrance exam.",
    icon: Award,
    gradient: "from-blue-500 to-cyan-500",
  },
];

const certifications = [
  { name: "What is Data Science", issuer: "Coursera", year: "2023" },
  { name: "Introduction to Machine Learning", issuer: "Coursera", year: "2024" },
  { name: "Social Winter of Code", issuer: "Swoc", year: "2025" },
];

const Education = () => {
  return (
    <section id="education" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

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
            Background
          </span>
          <h2 className="section-heading text-foreground mb-6">
            Education &{" "}
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            My academic journey and professional certifications that have shaped
            my expertise.
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-card animated-border h-full group hover:-translate-y-2 transition-transform duration-500">
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${edu.gradient}`} />
                
                <div className="p-6">
                  {/* Icon and degree */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${edu.gradient} flex items-center justify-center shrink-0`}>
                      <edu.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-primary text-sm font-medium whitespace-pre-line">{edu.institution}</p>
                    </div>
                  </div>

                  {/* Period */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-sm mb-4">
                    {edu.period}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            Professional Certifications
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-5 group cursor-default"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">{cert.year}</span>
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {cert.name}
                </h4>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
