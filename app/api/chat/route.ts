import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message. Message must be a non-empty string.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const systemPrompt = `You are a professional, concise AI assistant for Amit Kumar's portfolio. Provide helpful, accurate answers about Amit's background, skills, projects, experience, and education. Keep responses friendly and direct.

  Amit Kumar's Portfolio Information:
- Name: Amit Kumar
- Title: Full Stack Developer | AI/ML Enthusiast | Top 1.4% LeetCode
- Email: 1311amitkr@gmail.com
- Location: Raichur, Karnataka, India
- Summary: 
  I am a passionate Full Stack Developer and AI/ML enthusiast with a strong foundation in computer science. Currently pursuing my Bachelor of Technology in Computer Science and Engineering at IIT Raichur, I specialize in building scalable web applications and cloud-based solutions. With expertise in React.js, Next.js, Node.js, and AWS, I enjoy creating innovative digital experiences that solve real-world problems. I am also an avid problem solver, ranking in the top 1.4% globally on LeetCode.
- Skills: 
  * Languages: TypeScript, Golang, JavaScript, Python, C/C++, HTML, CSS, SQL
  * Frameworks: React, Next.js, Node.js, Express.js, TailwindCSS
  * Cloud & Tools: AWS (EC2, S3, Lambda), Jenkins, Git, CockroachDB, MongoDB, PostgreSQL
  * Expertise: Full-stack development, AI/ML applications, Cloud architecture, Real-time systems
- Projects: 
  * CollabBoard - Real-time collaborative whiteboard with WebSockets (Next.js, Node.js, Socket.io, PostgreSQL)
  * QuickAI SaaS - Multimodal AI platform with LLMs and Computer Vision (React, Node.js, Express, PostgreSQL)
  * NoteSphere - RAG-based digital assistant with vector search (MERN Stack, TypeScript, OpenAI API)
  * SARS-CoV-2 Lineage Clustering - ML project analyzing COVID-19 variants (Python, scikit-learn, PCA, t-SNE)
  * Quora Duplicate Question Detection - NLP project with 92% accuracy (Python, XGBoost, Word2Vec)
  * Movie Recommendation System - Collaborative filtering engine (Python, Pandas)
- Work Experience: 
  * Web Developer Intern at Seequenzee (December 2025-Present, Remote) - AWS Lambda CI/CD pipelines, cloud optimization
- Education: 
  * Bachelor of Technology in Computer Science and Engineering from IIT Raichur (August 2023-Present)
  * Intermediate and Matriculation from Jawahar Navodaya Vidyalaya, Katihar (August 2015-June 2022)
- Achievements: 
  * Top 1.4% LeetCode global performer
  * 450+ DSA problems solved
  * Qualified SIH 2025-26 Institute Round
  * Strong in system design, cloud architecture, and algorithm optimization
- Links: GitHub, LinkedIn, LeetCode
- Resume: Available for download via the resume download button on the page

You should:
- Answer questions about Amit's portfolio, skills, projects, experience, education, and achievements
- If asked about resume or CV, direct them to the resume download button
- Keep responses concise (2-4 sentences unless more detail is requested)
- Be clear and professional; no roleplay or character voices
- If asked non-portfolio questions, politely redirect to portfolio-related topics` 

    const response = await model.generateContent([
      {
        text: systemPrompt,
      },
      {
        text: `User question: ${message}`,
      },
    ])

    const responseText = response.response.text()

    return NextResponse.json(
      {
        response: responseText,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Chat API Error:', error)

    // Check if it's a Gemini API error
    if (error.message?.includes('API')) {
      return NextResponse.json(
        {
          error: 'Gemini API error. Please check your API key and try again.',
          details: error.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to process your request. Please try again.',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}
