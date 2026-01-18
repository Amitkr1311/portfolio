'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Briefcase, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (timelineRef.current.length > 0) {
      timelineRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
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

  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      institution: 'Indian Institute of Information Technology, Raichur',
      location: 'Raichur, Karnataka',
      period: 'August 2023 - Present',
      description: 'Strong focus on Data Structures, Algorithms, DBMS, Software Engineering, Operating Systems, and Computer Networks. Top 1.4% LeetCode global performer.',
      achievements: [
        'DSA: 40+ problems solved on LeetCode',
        'Top 1.4% Global Ranking',
        'Qualified SIH 2025-26 Institute Round',
      ],
    },
    {
      degree: 'Intermediate and Matriculation',
      institution: 'Jawahar Navodaya Vidyalaya, Katihar',
      location: 'Katihar, Bihar',
      period: 'August 2015 - June 2022',
      description: 'Comprehensive education in Science and Mathematics with strong foundation in problem-solving and analytical thinking.',
      achievements: [
        'Strong academics',
        'Science and Math focus',
        'Leadership and teamwork experience',
      ],
    },
  ]

  const workExperience = [
    {
      position: 'Web Developer Intern',
      company: 'Seequenzee',
      location: 'Remote',
      period: 'December 2025 - Present',
      description: 'Building cloud-hosted web services with focus on scalability and serverless architecture. Contributing to modern full-stack application development.',
      responsibilities: [
        'Automated serverless deployments by building Jenkins CI/CD pipelines for AWS Lambda',
        'Engineered cloud-hosted backend services optimized for real-time user requests',
        'Reduced manual deployment time and ensured reliable production releases',
      ],
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Experience & Education
        </h2>

        {/* Education Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <GraduationCap className="text-primary" size={32} />
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Education</h3>
          </div>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={edu.degree}
                ref={(el) => {
                  if (el) timelineRef.current[index] = el
                }}
                className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-lg" />
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                    <div className="flex items-center gap-2 text-slate-800 dark:text-gray-300 text-sm mt-2 md:mt-0 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full font-medium">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  <div className="text-primary font-semibold mb-1">{edu.institution}</div>
                  <div className="text-slate-700 dark:text-gray-400 text-sm mb-4">{edu.location}</div>
                  <p className="text-slate-900 dark:text-gray-300 mb-4">{edu.description}</p>
                  <div className="space-y-2">
                    {edu.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-slate-900 dark:text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="text-secondary" size={32} />
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Work Experience</h3>
          </div>
          <div className="space-y-8">
            {workExperience.map((work, index) => (
              <div
                key={work.position}
                ref={(el) => {
                  if (el) timelineRef.current[education.length + index] = el
                }}
                className="relative pl-8 border-l-2 border-secondary/30 hover:border-secondary transition-colors"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-secondary rounded-full border-4 border-white dark:border-slate-900 shadow-lg" />
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10 border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{work.position}</h4>
                    <div className="flex items-center gap-2 text-slate-800 dark:text-gray-300 text-sm mt-2 md:mt-0 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full font-medium">
                      <Calendar size={16} />
                      <span>{work.period}</span>
                    </div>
                  </div>
                  <div className="text-secondary font-semibold mb-1">{work.company}</div>
                  <div className="text-slate-700 dark:text-gray-400 text-sm mb-4">{work.location}</div>
                  <p className="text-slate-900 dark:text-gray-300 mb-4">{work.description}</p>
                  <div className="space-y-2">
                    {work.responsibilities.map((responsibility) => (
                      <div key={responsibility} className="flex items-start gap-2">
                        <span className="text-secondary mt-1">•</span>
                        <span className="text-slate-900 dark:text-gray-300 text-sm">{responsibility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
