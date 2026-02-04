'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { X, Send } from 'lucide-react'
import ChatbotIcon from '@/assets/public/icons/chatbotIcon'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Amit's AI assistant. I can help answer questions about Amit's skills, projects, experience, and education. Feel free to ask me anything!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [mounted, setMounted] = useState(false)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
  }, [mounted])

  useEffect(() => {
    if (chatBoxRef.current) {
      gsap.fromTo(
        chatBoxRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        }
      )
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getPortfolioData = () => ({
    name: 'Amit Kumar',
    email: '1311amitkr@gmail.com',
    phone: '+91 9060053989',
    location: 'India',
    summary: 'Computer Science undergraduate at IIIT Raichur and Top 1.4% Leetcode global performer. Builds Full-stack, AI-driven, and Cloud (AWS) applications using React.js, Next.js, and Node.js with a keen interest in Golang.',
    skills: {
      languages: ['TypeScript', 'Golang', 'JavaScript', 'Python', 'C/C++', 'HTML', 'CSS', 'SQL'],
      frameworks: ['React', 'Next.js', 'Node.js', 'Express.js', 'TailwindCSS'],
      tools: ['AWS (EC2, S3, Lambda)', 'Jenkins', 'Git', 'CockroachDB', 'MongoDB', 'PostgreSQL'],
      coursework: ['DSA', 'OOP', 'DBMS', 'Software Engineering', 'Operating Systems', 'Computer Networks'],
    },
    experience: [
      {
        title: 'Web Developer Intern',
        company: 'Seequenzee',
        period: 'December 2025 – Present',
        location: 'Remote',
        highlights: [
          'Automated serverless deployments by building Jenkins CI/CD pipelines for AWS Lambda',
          'Engineered cloud-hosted backend services with focus on scalability and performance',
        ],
      },
    ],
    projects: [
      {
        name: 'CollabBoard',
        description: 'Real-Time Collaborative Ideation Canvas',
        tech: ['Next.js', 'Node.js', 'WebSocket (Socket.io)', 'PostgreSQL', 'Turborepo'],
        period: 'Aug 2025 – Oct 2025',
        highlights: [
          'Built real-time collaborative whiteboard using WebSockets for low-latency multi-user synchronization',
          'Implemented high-performance rendering engine with HTML5 Canvas API',
          'Optimized monorepo builds using Turborepo, reducing build times by 40%',
        ],
      },
      {
        name: 'QuickAI SaaS',
        description: 'Multimodal Generative AI Suite',
        tech: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Clerk Auth'],
        period: 'Oct 2025 - Dec 2025',
        highlights: [
          'Architected multimodal SaaS integrating LLMs and Computer Vision',
          'Built ledger-based PostgreSQL system with ACID-compliant transaction locks',
          'Engineered NLP-driven Resume Reviewer with secure endpoints',
        ],
      },
      {
        name: 'NoteSphere',
        description: 'Context-Aware Digital Brain & Organizer',
        tech: ['MERN Stack', 'TypeScript', 'OpenAI API', 'Vector Search'],
        period: 'Nov 2024 – Mar 2025',
        highlights: [
          'Built RAG-based retrieval system using vector embeddings',
          'Implemented scalable ingestion pipeline with TypeScript-based validation',
        ],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Technology in Computer Science and Engineering',
        institution: 'Indian Institute of Information Technology, Raichur',
        location: 'Raichur, Karnataka',
        period: 'August 2023 – Present',
      },
      {
        degree: 'Intermediate and Matriculation',
        institution: 'Jawahar Navodaya Vidyalaya, Katihar',
        location: 'Katihar, Bihar',
        period: 'August 2015 – June 2022',
      },
    ],
    achievements: [
      'Qualified the Institute-level round of Smart India Hackathon (SIH) 2025-26',
      'Solved over 400 problems on LeetCode, ranking in the top 1.4% globally',
    ],
  })

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    const data = getPortfolioData()

    // Skills queries
    if (
      message.includes('skill') ||
      message.includes('technology') ||
      message.includes('language') ||
      message.includes('tech stack') ||
      message.includes('what can')
    ) {
      return `Amit is skilled in multiple technologies:\n\n**Languages:** ${data.skills.languages.join(', ')}\n\n**Frameworks:** ${data.skills.frameworks.join(', ')}\n\n**Cloud & Tools:** ${data.skills.tools.join(', ')}\n\nWould you like to know more about any specific technology?`
    }

    // Projects queries
    if (message.includes('project') || message.includes('work') || message.includes('built')) {
      const projectList = data.projects
        .map((p) => `• **${p.name}** (${p.period}): ${p.description}`)
        .join('\n')
      return `Amit has worked on several impressive projects:\n\n${projectList}\n\nWould you like details about any specific project?`
    }

    // Specific project queries
    if (message.includes('collabboard')) {
      const project = data.projects[0]
      return `**CollabBoard** is a ${project.description} built with ${project.tech.join(', ')}. Key features:\n\n${project.highlights.map((h) => `• ${h}`).join('\n')}`
    }

    if (message.includes('quickai')) {
      const project = data.projects[1]
      return `**QuickAI SaaS** is a ${project.description} built with ${project.tech.join(', ')}. Key features:\n\n${project.highlights.map((h) => `• ${h}`).join('\n')}`
    }

    if (message.includes('notesphere')) {
      const project = data.projects[2]
      return `**NoteSphere** is a ${project.description} built with ${project.tech.join(', ')}. Key features:\n\n${project.highlights.map((h) => `• ${h}`).join('\n')}`
    }

    // Experience queries
    if (
      message.includes('experience') ||
      message.includes('work experience') ||
      message.includes('internship') ||
      message.includes('job')
    ) {
      const exp = data.experience[0]
      return `Amit is currently working as a **${exp.title}** at **${exp.company}** (${exp.period}, ${exp.location}).\n\nKey responsibilities:\n${exp.highlights.map((h) => `• ${h}`).join('\n')}`
    }

    // Education queries
    if (message.includes('education') || message.includes('degree') || message.includes('study') || message.includes('college') || message.includes('university')) {
      const edu = data.education[0]
      return `Amit is currently pursuing a **${edu.degree}** from **${edu.institution}**, ${edu.location} (${edu.period}).\n\nHe completed his schooling from Jawahar Navodaya Vidyalaya, Katihar (2015-2022).`
    }

    // Contact queries
    if (
      message.includes('contact') ||
      message.includes('email') ||
      message.includes('reach') ||
      message.includes('phone') ||
      message.includes('call') ||
      message.includes('mail')
    ) {
      return `You can reach Amit through:\n\n📧 **Email:** ${data.email}\n📱 **Phone:** ${data.phone}\n📍 **Location:** ${data.location}\n\nFeel free to reach out for collaboration or opportunities!`
    }

    // About queries
    if (
      message.includes('about') ||
      message.includes('who is') ||
      message.includes('tell me about') ||
      message.includes('who are you')
    ) {
      return `${data.summary}\n\nCurrently seeking Software Engineering Internship opportunities to leverage strong algorithmic problem-solving and full-stack expertise.`
    }

    // Achievement queries
    if (
      message.includes('achievement') ||
      message.includes('accomplishment') ||
      message.includes('award') ||
      message.includes('leetcode') ||
      message.includes('hackathon')
    ) {
      return `Amit's achievements:\n\n${data.achievements.map((a) => `• ${a}`).join('\n')}\n\nImpressive, right?`
    }

    // Greeting queries
    if (
      message.includes('hi') ||
      message.includes('hello') ||
      message.includes('hey') ||
      message.includes('greetings')
    ) {
      return `Hello! I'm here to help you learn more about Amit Kumar. You can ask me about his skills, projects, experience, education, achievements, or how to contact him. What would you like to know?`
    }

    // Location queries
    if (message.includes('location') || message.includes('where') || message.includes('based')) {
      return `Amit is based in ${data.location} and is currently studying at IIIT Raichur, Karnataka.`
    }

    // Default response
    return `I can help you learn about Amit's:\n• Skills and technologies\n• Projects and work\n• Experience and internships\n• Education\n• Achievements\n• Contact information\n\nWhat would you like to know?`
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    const currentInput = inputValue
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Show loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Thinking...',
      sender: 'bot',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, loadingMessage])

    // Bot response with Gemini API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      })

      const data = await response.json()

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessage.id))

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const botResponse: Message = {
        id: (Date.now() + 2).toString(),
        text: data.response || "I couldn't generate a response. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error: any) {
      console.error('Chat error:', error)

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessage.id))

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: `Sorry, I encountered an error: ${error.message}. Please try again or contact Amit directly at 1311amitkr@gmail.com.`,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Chat Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300"
        aria-label="Open chat assistant"
        title="Chat with AI Assistant"
      >
        {isOpen ? <X size={28} /> : <ChatbotIcon className="w-7 h-7" />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-24 right-6 z-40 w-96 max-h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <ChatbotIcon className="w-6 h-6" /> AI Assistant
            </h3>
            <p className="text-sm opacity-90">Ask me anything about Amit!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
