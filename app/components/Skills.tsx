'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (skillsRef.current.length > 0) {
      skillsRef.current.forEach((skill, index) => {
        gsap.fromTo(
          skill,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        )
      })
    }
  }, [])

  const skills = [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'Next.js', level: 85, icon: '▲' },
    { name: 'TypeScript', level: 88, icon: '📘' },
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'Golang', level: 80, icon: '🐹' },
    { name: 'AWS', level: 82, icon: '☁️' },
    { name: 'PostgreSQL', level: 84, icon: '🐘' },
    { name: 'MongoDB', level: 82, icon: '🍃' },
    { name: 'Docker', level: 78, icon: '🐳' },
    { name: 'Jenkins', level: 80, icon: '⚙️' },
    { name: 'Python', level: 82, icon: '🐍' },
    { name: 'Git', level: 92, icon: '📦' },
  ]

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => {
                if (el) skillsRef.current[index] = el
              }}
              className="relative group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer h-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="text-5xl mb-4">{skill.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{skill.name}</h3>
                <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-sm text-slate-700 dark:text-gray-400 mt-2 font-medium">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
