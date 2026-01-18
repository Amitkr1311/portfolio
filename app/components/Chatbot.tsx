'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { MessageCircle, X, Send } from 'lucide-react'

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
      text: "🧦 Dobby is here to help you, sir/madam! Dobby knows all about Master Amit's skills, projects, and achievements! Dobby is most excited to answer your questions! 📄 If you wishes to see Master Amit's resume, click the green button above Dobby!",
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
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Tailwind CSS',
      'GSAP',
      'MongoDB',
      'PostgreSQL',
      'Docker',
      'AWS',
    ],
    projects: [
      'E-Commerce Platform',
      'Task Management App',
      'Social Media Dashboard',
      'AI Content Generator',
      'Fitness Tracker',
      'Real Estate Portal',
    ],
    experience: [
      'Senior Full Stack Developer at Tech Innovations Inc. (2022-Present)',
      'Full Stack Developer at Digital Solutions Co. (2020-2022)',
      'Junior Web Developer at StartUp Labs (2019-2020)',
    ],
    education: [
      'Bachelor of Science in Computer Science from Tech University (2015-2019)',
      'High School Diploma from Central High School (2011-2015)',
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
      message.includes('what can you do')
    ) {
      return `I have expertise in ${data.skills.slice(0, 5).join(', ')}, and more! I'm proficient in both frontend and backend technologies. Would you like to know about any specific skill?`
    }

    // Projects queries
    if (message.includes('project') || message.includes('work')) {
      return `I've worked on ${data.projects.length} projects including: ${data.projects
        .slice(0, 3)
        .join(', ')}, and more. Each project showcases my ability to build full-featured applications. Want to know about a specific project?`
    }

    // Experience queries
    if (
      message.includes('experience') ||
      message.includes('work experience') ||
      message.includes('job')
    ) {
      return `I have 5+ years of experience! Currently a Senior Full Stack Developer at Tech Innovations Inc. I've also worked at Digital Solutions Co. and StartUp Labs. Would you like more details about any position?`
    }

    // Education queries
    if (message.includes('education') || message.includes('degree') || message.includes('study')) {
      return `I have a Bachelor's degree in Computer Science from Tech University (2015-2019) with a 3.8 GPA and multiple honors. I started learning programming in high school and have been passionate about it ever since!`
    }

    // Contact queries
    if (
      message.includes('contact') ||
      message.includes('email') ||
      message.includes('reach') ||
      message.includes('phone')
    ) {
      return `You can reach out via the contact form on my portfolio, email me at john@example.com, or connect with me on LinkedIn and GitHub. I'd love to hear from you!`
    }

    // About queries
    if (
      message.includes('about') ||
      message.includes('who are you') ||
      message.includes('tell me about')
    ) {
      return `I'm John, a Full Stack Developer with 5+ years of experience. I specialize in creating beautiful, responsive web applications. I love solving problems and learning new technologies. What would you like to know more about?`
    }

    // Greeting queries
    if (
      message.includes('hi') ||
      message.includes('hello') ||
      message.includes('hey') ||
      message.includes('greetings')
    ) {
      return `Hello! It's great to meet you! I'm here to help answer any questions about my portfolio, skills, projects, or experience. What would you like to know?`
    }

    // How many/statistics queries
    if (
      message.includes('how many') ||
      message.includes('statistics') ||
      message.includes('stats')
    ) {
      return `Here are some stats: 5+ years of experience, 50+ projects completed, 30+ happy clients, 12+ technologies mastered. Pretty exciting journey so far!`
    }

    // Default response
    return `Great question! I can help you learn about my skills, projects, work experience, education, or how to get in touch. Feel free to ask me anything specific!`
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
        text: `Sorry, I encountered an error: ${error.message}. Please try again or contact John directly at john@example.com.`,
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
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-2xl hover:shadow-amber-500/50 hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] hover:scale-110 hover:rotate-6 transition-all duration-300 hover:brightness-110"
        aria-label="Chat with Dobby"
        title="Chat with Dobby"
      >
        {isOpen ? <X size={28} /> : <span className="text-4xl">🧦</span>}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-24 right-6 z-40 w-96 max-h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="text-2xl">🧦</span> Dobby the House-Elf
            </h3>
            <p className="text-sm opacity-90">Dobby is happy to serve and answer questions!</p>
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
