// Single source of truth for all portfolio content.
// Edit the values below to make this your own — every section of the site
// reads from this file, so nothing else needs to change.

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  highlights?: string[];
};

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  bullets: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const siteConfig = {
  name: "Vaibhav Bajpai",
  initials: "VB",
  role: "Senior Software Engineer",
  tagline:
    "I build production GenAI systems — RAG pipelines, multi-agent workflows, and LLM evaluation on AWS Bedrock — plus the React, Node.js, and cloud-native full-stack platforms around them.",
  location: "Pune, Maharashtra, India",
  email: "vbajpai33@gmail.com",
  resumeUrl: "/resume.docx",
  bio: [
    "I'm a GenAI and Full-Stack Engineer with 3+ years of experience building production AI applications and the web platforms around them. I specialize in RAG systems, LLM evaluation, and multi-agent architectures using LangChain, LangGraph, and AWS AI services (Bedrock, SageMaker), with delivered results including 60% faster drug discovery workflows and 70% faster document processing. On the full-stack side I build with React, Next.js, React Native, Node.js, NestJS, PostgreSQL, and MongoDB, with secure REST APIs, role-based access control, and event-driven, cloud-native architectures. I enjoy taking products from concept to deployment with clean architecture.",
  ],
  socials: {
    github: "",
    linkedin: "https://www.linkedin.com/in/vaibhav-bajpai-b691081aa/",
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const suggestedPrompts = [
  "Tell me about yourself",
  "Show your projects",
  "What technologies do you know?",
  "Explain your experience",
  "How can I contact you?",
];

export const skills: SkillGroup[] = [
  {
    "category": "AI / LLM",
    "items": [
      "Prompt Engineering",
      "OpenAI API",
      "Gemini API",
      "Claude API",
      "Embeddings",
      "RAG (Retrieval-Augmented Generation)",
      "Function Calling / Tool Calling",
      "Structured Outputs",
      "Streaming Responses",
      "LLM Evaluation (RAGAS, LangSmith)",
      "LLM Fine-Tuning (LoRA/QLoRA)",
      "Retrieval Optimization",
      "AWS Bedrock"
    ]
  },
  {
    "category": "AI Frameworks",
    "items": [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Vercel AI SDK",
      "OpenAI Agents SDK",
      "CrewAI",
      "RAGAS",
      "LangSmith"
    ]
  },
  {
    "category": "AI Application Skills",
    "items": [
      "Chatbots",
      "AI Agents",
      "RAG Pipelines",
      "Vector Search",
      "Semantic Search",
      "Document Processing",
      "PDF Parsing",
      "OCR",
      "Speech-to-Text",
      "Text-to-Speech",
      "MCP (Model Context Protocol)"
    ]
  },
  {
    "category": "Core Programming",
    "items": [
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL",
      "C++",
      "C"
    ]
  },
  {
    "category": "Frontend",
    "items": [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "React.js",
      "Next.js",
      "React Native",
      "Expo",
      "Material UI / shadcn/ui",
      "Redux / Zustand",
      "React Query (TanStack Query)"
    ]
  },
  {
    "category": "Backend",
    "items": [
      "Node.js",
      "Express.js",
      "NestJS",
      "FastAPI",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Socket.io",
      "JWT Authentication",
      "OAuth",
      "Event-Driven Systems (Kafka, RabbitMQ)",
      "OpenAPI (Swagger)",
      "Webhooks",
      "Server-Sent Events (SSE)"
    ]
  },
  {
    "category": "Databases",
    "items": [
      "PostgreSQL",
      "MongoDB",
      "TypeORM",
      "Redis",
      "pgvector",
      "Pinecone / Qdrant / Weaviate",
      "FAISS"
    ]
  },
  {
    "category": "DevOps & Cloud",
    "items": [
      "Git",
      "GitHub",
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "GitHub Actions",
      "CI/CD",
      "AWS (Bedrock, SageMaker, Lambda, ECS/Fargate, Batch, SQS, S3, ElastiCache, EC2, IAM, RDS)",
      "Serverless Framework",
      "Vercel",
      "Railway",
      "Render",
      "VS Code"
    ]
  },
  {
    "category": "System Design & Testing",
    "items": [
      "Authentication & Authorization",
      "Caching",
      "Rate Limiting",
      "Queues",
      "Microservices",
      "Load Balancing",
      "Scalability",
      "Jest",
      "Playwright",
      "Cypress",
      "Postman"
    ]
  }
];

export const projects: Project[] = [
  {
    "title": "Revilico — GenAI and Full-Stack",
    "description": "A cloud-native AI drug discovery platform with LLM-based analysis layers over petabyte-scale genomic datasets, built with React.js, Node.js, Python, and PostgreSQL.",
    "tags": [
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "RAG",
      "RAGAS",
      "Kafka",
      "Kubernetes",
      "AWS Batch"
    ],
    "featured": true,
    "highlights": [
      "Engineered the cloud-native AI drug discovery platform with LLM-based analysis layers, achieving 50% faster processing of petabyte-scale genomic datasets.",
      "Scaled event-driven microservices (Kafka, Kubernetes, AWS Batch) to handle 4,500+ QPS with integrated RAG pipelines for contextual retrieval over molecular and genomic research data.",
      "Implemented retrieval evaluation using RAGAS metrics (faithfulness, answer relevancy, context precision), reducing hallucination rates by 40% and improving factual grounding across 500K+ research documents."
    ]
  },
  {
    "title": "LendingWise — GenAI and Full-Stack",
    "description": "AI-powered document verification agents for a multi-tenant lending platform, replacing manual loan file reviews.",
    "tags": [
      "LangChain",
      "LangGraph",
      "Python",
      "AWS SQS"
    ],
    "featured": true,
    "highlights": [
      "Designed and deployed AI-powered document verification agents using LangChain and LangGraph, reducing document processing time by 70% across a multi-tenant lending platform.",
      "Built automated cross-verification tools with custom LangChain tools to pull and validate borrower data against uploaded loan files, eliminating 85% of manual compliance checks.",
      "Scaled the backend using AWS SQS to process 150K+ documents monthly with zero data loss."
    ]
  },
  {
    "title": "AI Interview & Assessment Platform",
    "description": "An end-to-end AI-powered interview and assessment platform where autonomous multi-agent AI conducts HR, technical, coding, and system-design interviews — from resume analysis to hiring recommendations.",
    "tags": [
      "React",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "LangGraph",
      "MCP",
      "OpenAI",
      "Gemini",
      "Docker",
      "AWS"
    ],
    "featured": true,
    "highlights": [
      "Designed a multi-agent orchestration system using LangGraph and the Model Context Protocol (MCP), coordinating specialized agents for resume analysis, technical evaluation, coding assessment, and hiring recommendations.",
      "Built an AI interviewer that holds context-aware conversations with dynamic follow-up questions, adaptive difficulty, and memory across multiple interview stages.",
      "Implemented Retrieval-Augmented Generation (RAG) with vector embeddings and semantic search to ground responses in company knowledge, interview guidelines, and candidate resumes.",
      "Built an integrated coding assessment environment with multi-language support, hidden test cases, AI-powered code review, and automated scoring.",
      "Added real-time voice interviews with speech-to-text and text-to-speech for natural, low-latency conversations.",
      "Built an AI resume analyzer that flags missing keywords, scores skill gaps, and recommends improvements against a target role.",
      "Containerized services with Docker and deployed on AWS with JWT authentication, REST APIs, PostgreSQL, and role-based access control."
    ]
  },
  {
    "title": "MediRush — Medicine Delivery Platform",
    "description": "A multi-sided, hyperlocal medicine delivery platform spanning four applications — a customer app, a delivery partner app, an admin dashboard, and a pharmacy/shop-owner dashboard — all backed by a single real-time Node.js API.",
    "tags": [
      "React Native",
      "Expo",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Google Maps",
      "JWT Authentication",
      "Twilio"
    ],
    "featured": true,
    "highlights": [
      "Built a 4-app ecosystem — a customer app, delivery partner app, admin dashboard, and shop-owner dashboard — all backed by a single Node.js/Express/MongoDB API.",
      "Designed an 8-role RBAC system (super admin, admin, shop owner, manager, pharmacist, delivery partner, customer, and more) with JWT authentication and strict field allowlisting to prevent privilege escalation.",
      "Implemented the full order lifecycle — pending, confirmed, preparing, out for delivery, delivered, cancelled, refunded — with prescription image uploads, coupon codes, and a platform-commission/shop-earnings split calculated per order.",
      "Built real-time order tracking and delivery-partner location updates with Socket.io, surfaced on a live map in the admin dashboard and the delivery partner app.",
      "Engineered zone-based delivery logic — geofenced service areas with configurable delivery radius, dynamic delivery fees, minimum order amounts, and estimated delivery times.",
      "Gave shop owners a self-serve dashboard for medicine inventory (including bulk CSV upload), order fulfillment, staff management, earnings, and sales reports.",
      "Wired up SMS (Twilio) and push notifications (Firebase Cloud Messaging) for order-status updates, plus Cloudinary for medicine and shop image uploads.",
      "Hardened the API with Zod-validated request schemas, rate-limited auth endpoints, and centralized error handling."
    ]
  },
  {
    "title": "ProShop — E-Commerce Web App",
    "description": "A full-stack electronic shopping platform built with React, Node.js, Express, and MongoDB, designed for seamless browsing and purchasing across devices.",
    "tags": [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "Authentication"
    ],
    "highlights": [
      "Implemented secure user authentication and session handling to protect customer accounts and purchase data.",
      "Optimized MongoDB queries and database performance to keep browsing and checkout fast under load.",
      "Built a smooth, well-tested communication layer between the React frontend and the Express/Node.js backend.",
      "Designed a responsive UI so the shopping experience stays consistent across desktop, tablet, and mobile.",
      "Rigorously tested the application for reliability across the full purchase flow, from browsing to checkout."
    ]
  },
  {
    "title": "Daily Expense Tracker",
    "description": "A full-stack expense tracking web app built on a LAMP stack, giving users an organized, visual way to log and understand their spending.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "AJAX",
      "Chart.js"
    ],
    "highlights": [
      "Implemented full CRUD functionality so users can add, edit, and remove expense entries.",
      "Used AJAX for dynamic data manipulation, updating expense data without full page reloads.",
      "Built interactive Chart.js visualizations to give users clear insight into spending patterns over time.",
      "Generated detailed expense reports with PHP for deeper analysis and record-keeping.",
      "Ensured data integrity and security across CRUD operations and report generation.",
      "Employed responsive design principles for consistent performance across devices."
    ]
  }
];

export const experience: Experience[] = [
  {
    "role": "Senior Software Engineer",
    "company": "BuzzyBrains Software (I) Pvt. Ltd.",
    "period": "May 2025 — Present",
    "bullets": [
      "Architected AI agent pipelines using LangChain, RAG, and AWS Bedrock (titan-embed-text-v2) to analyze computational chemistry outputs (MD Simulations, Molecular Docking, FEP), accelerating drug discovery workflows by 60%.",
      "Deployed multi-agent systems with LangGraph for autonomous molecular simulation analysis, enabling researchers to query petabyte-scale datasets through natural language with <5% hallucination rate validated via RAGAS evaluation.",
      "Evaluated 4 foundation models on Bedrock for domain-specific accuracy, explored LoRA fine-tuning on Llama 3 for computational chemistry tasks, and selected Claude Sonnet 4.6 for 92% factual grounding over fine-tuned and base variants.",
      "Engineered automated LLM evaluation pipelines to assess retrieval relevance, factual accuracy, faithfulness, and response quality across domain-specific datasets, enabling systematic regression testing and continuous improvement.",
      "Integrated production-grade AI workflows with AWS services, implementing secure API orchestration, structured output validation, exception handling, and scalable processing.",
      "Implemented end-to-end RAG observability and performance benchmarking, tracking retrieval latency, token consumption, response quality, and failure patterns to optimize inference cost and performance.",
      "Led full-stack development of a healthcare platform with a React Native mobile app and React web application, implementing RBAC across 5 roles (Doctor/Patient/Receptionist/Clinic/Super Admin) with JWT-based authentication and OTP verification.",
      "Designed a RESTful API architecture with Node.js/Express and PostgreSQL featuring role-based endpoint authorization, JWT middleware, pagination, and centralized error handling, achieving 100% Postman test coverage.",
      "Built a dynamic QR code generation system with backend hash-to-ID mapping and thermal printer integration, enabling sub-5-second patient check-ins.",
      "Engineered a multi-channel notification pipeline (Email/SMS/WhatsApp) with role-triggered templates for OTP delivery, appointment confirmations, and reminders, reducing patient no-shows.",
      "Owned end-to-end CI/CD: automated React Native APK/IPA builds, React web deployments, database migrations, and production incident resolution with a <2-hour SLA."
    ]
  },
  {
    "role": "SDE-1",
    "company": "OneLab Ventures",
    "period": "July 2024 — May 2025",
    "bullets": [
      "Developed end-to-end Generative AI applications using Python, LangChain, and Retrieval-Augmented Generation (RAG), integrating enterprise knowledge sources with LLMs to deliver context-aware, domain-specific responses.",
      "Engineered document ingestion pipelines covering text extraction, semantic chunking, embedding generation, and vector database indexing for semantic search across unstructured enterprise data.",
      "Built tool-calling AI agents with LangGraph, implementing stateful workflows, conditional routing, structured outputs, and tool integrations to automate multi-step reasoning tasks.",
      "Implemented LLM evaluation and validation frameworks to assess answer relevance, retrieval accuracy, faithfulness, and hallucination risk for systematic benchmarking.",
      "Integrated foundation models through AWS Bedrock and LLM APIs with prompt engineering, response validation, error handling, and modular orchestration.",
      "Developed and maintained full-stack web and mobile applications using the MERN stack and React Native.",
      "Integrated Google AdMob into a globally launched mobile app, optimizing ad placements for revenue without hurting UX.",
      "Designed critical APIs handling high-volume requests with secure data flow, and worked extensively with push/in-app notifications.",
      "Deployed a fully functional website on AWS (EC2, S3, CloudFront) for scalability and reliability."
    ]
  },
  {
    "role": "Software Engineer",
    "company": "Perla IT Soln. International Pvt. Ltd.",
    "period": "July 2023 — July 2024",
    "bullets": [
      "Built the WYSAX School Management platform with React, Material UI, NestJS, and PostgreSQL on AWS, supporting English, French, and Arabic via i18n.",
      "Implemented role-based access control and multi-organization support for seamless switching between school entities.",
      "Developed exam creation, student mark recording, and report card generation for performance tracking.",
      "Built RESTful APIs with NestJS decorators and middleware, using TypeORM over PostgreSQL."
    ]
  },
  {
    "role": "Software Engineer Intern",
    "company": "Perla IT Soln. International Pvt. Ltd.",
    "period": "Jan 2023 — June 2023",
    "bullets": [
      "Developed a school management system for international markets, including an exam-taking platform with authentication and result tracking.",
      "Modernized legacy codebases and collaborated across the full development lifecycle to meet project goals."
    ]
  }
];
