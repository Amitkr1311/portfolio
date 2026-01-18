'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (projectsRef.current.length > 0) {
      projectsRef.current.forEach((project, index) => {
        gsap.fromTo(
          project,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        )
      })
    }
  }, [])

  const projects = [
    {
      title: 'CollabBoard – Real-Time Collaborative Ideation Canvas',
      description: 'Built a real-time collaborative whiteboard using WebSockets (Socket.io) for low-latency multi-user synchronization with high-performance HTML5 Canvas rendering. Supports concurrent drawing, shapes, text, and object manipulation.',
      tags: ['Next.js', 'Node.js', 'Socket.io', 'PostgreSQL', 'Turborepo'],
      gradient: 'from-blue-500 to-cyan-500',
      link: 'https://github.com/Amitkr1311/CollabBoard',
      liveLink: '',
    },
    {
      title: 'QuickAI SaaS – Multimodal Generative AI Suite',
      description: 'Architected a multimodal SaaS integrating LLMs and Computer Vision for automated content generation. Built with secure payment processing using PostgreSQL transaction locks. Features NLP-driven Resume Reviewer and image processing capabilities.',
      tags: ['React.js', 'Node.js', 'LLM API', 'PostgreSQL', 'Clerk Auth'],
      gradient: 'from-purple-500 to-pink-500',
      link: 'https://github.com/Amitkr1311/QuickAI',
      liveLink: 'https://creatify-ai-studio.vercel.app/',
    },
    {
      title: 'NoteSphere – Context-Aware Digital Brain & Organizer',
      description: 'Built a RAG-based retrieval system using vector embeddings for contextual search over unstructured data. Features scalable ingestion pipeline with TypeScript-based validation for normalizing and storing external content with intelligent retrieval.',
      tags: ['MERN Stack', 'TypeScript', 'OpenAI API', 'Vector Search'],
      gradient: 'from-orange-500 to-red-500',
      link: 'https://github.com/Amitkr1311/NoteSphere',
      liveLink: '',
    },
    {
      title: 'SARS-CoV-2 Lineage Unsupervised Clustering',
      description: 'Advanced machine learning project analyzing COVID-19 variants using unsupervised clustering algorithms (K-Means, DBSCAN). Discovered natural biological groupings in viral genomic data using PCA and t-SNE dimensionality reduction without predefined labels.',
      tags: ['Python', 'scikit-learn', 'PCA', 't-SNE', 'Data Analysis'],
      gradient: 'from-blue-500 to-cyan-500',
      link: 'https://github.com/Amitkr1311/sarscov2-lineage-unsupervised-clustering',
      liveLink: '',
    },
    {
      title: 'Quora Duplicate Question Pair Detection',
      description: 'NLP-based machine learning project identifying duplicate questions using TF-IDF, Word2Vec embeddings, and fuzzy string matching. Achieved 92% accuracy using XGBoost and Random Forest ensemble learning on 40K+ question pairs.',
      tags: ['Python', 'NLP', 'XGBoost', 'Word2Vec', 'Feature Engineering'],
      gradient: 'from-purple-500 to-pink-500',
      link: 'https://github.com/Amitkr1311/Quora-duplicate-question-pair-detection',
      liveLink: '',
    },
    {
      title: 'Movie Recommendation System',
      description: 'Intelligent recommendation engine combining collaborative filtering and content-based algorithms. Analyzes movie features and user preferences to provide personalized movie recommendations with high precision.',
      tags: ['Python', 'Collaborative Filtering', 'Content-Based', 'Pandas'],
      gradient: 'from-orange-500 to-red-500',
      link: 'https://github.com/Amitkr1311/Movie_recommendation-system',
      liveLink: '',
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                if (el) projectsRef.current[index] = el
              }}
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col border border-slate-200 dark:border-slate-700">
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white text-6xl`}>
                  💼
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-base text-slate-800 dark:text-gray-300 mb-4 flex-1 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Github size={18} />
                        <span className="text-sm">GitHub</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span className="text-sm">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
