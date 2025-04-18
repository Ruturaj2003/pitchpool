
import { Startup, Shark } from "../types";

export const mockStartups: Startup[] = [
  {
    id: "1",
    name: "EcoVent",
    tagline: "Revolutionizing air purification for urban spaces",
    sector: "CleanTech",
    videoUrl: "https://placehold.co/360x640",
    thumbnailUrl: "https://images.unsplash.com/photo-1536063211352-0b94219f6212?q=80&w=2080",
    description: "EcoVent creates biodegradable air purification systems that remove pollutants while producing oxygen through bioengineered plant technologies.",
    founderName: "Alexis Chen",
    founderTitle: "CEO & Founder",
    founderPhotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
    pitchDetails: {
      problem: "Urban air pollution causes 4.2 million deaths annually and reduces quality of life in cities worldwide.",
      solution: "Our bioengineered air purification systems combine plant biology with smart technology to create sustainable air purification.",
      marketSize: "$12.1 billion global air purifier market growing at 10% CAGR.",
      businessModel: "Hardware sales plus subscription model for replacement filters and monitoring software.",
      competition: "Traditional HEPA filters, activated carbon systems, and emerging ionic purifiers.",
      traction: "3,000 units sold in beta phase, partnerships with 2 hotel chains and 5 corporate offices.",
      team: "Founded by plant biologists and clean tech engineers from Stanford and MIT.",
      askAmount: "$1.5 million",
      equity: "10%",
      useOfFunds: "Manufacturing scale-up, R&D for next-gen product, and expanding sales team."
    },
    comments: [
      {
        id: "c1",
        sharkId: "s1",
        sharkName: "Victoria Sharp",
        sharkPhotoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
        text: "Impressive technology and clear market need. Would like to see more on your IP protection strategy.",
        timestamp: "2023-08-15T14:23:00Z"
      }
    ]
  },
  {
    id: "2",
    name: "Quantum Leap AI",
    tagline: "AI-powered investment analysis for everyone",
    sector: "FinTech",
    videoUrl: "https://placehold.co/360x640",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    description: "Quantum Leap democratizes investment intelligence with AI that analyzes market trends and provides personalized investment recommendations.",
    founderName: "Marcus Johnson",
    founderTitle: "CEO & Co-founder",
    founderPhotoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974",
    pitchDetails: {
      problem: "Investment analysis is inaccessible to average people, creating wealth gaps and missed opportunities.",
      solution: "Our AI platform analyzes thousands of data points to deliver personalized investment insights in plain language.",
      marketSize: "$17 billion robo-advisory market with 31% annual growth.",
      businessModel: "Freemium model with basic free access and premium subscription tiers.",
      competition: "Traditional financial advisors, existing robo-advisors, and self-directed investment platforms.",
      traction: "25,000 active users, $5M in managed assets, and 91% user retention rate.",
      team: "Led by former quantitative analysts from Goldman Sachs and AI researchers from Google.",
      askAmount: "$2 million",
      equity: "12%",
      useOfFunds: "Expanding AI capabilities, regulatory compliance, and marketing."
    },
    comments: []
  },
  {
    id: "3",
    name: "MediChain",
    tagline: "Blockchain for secure, portable medical records",
    sector: "HealthTech",
    videoUrl: "https://placehold.co/360x640",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
    description: "MediChain uses blockchain to give patients control over their medical data while enabling secure sharing with healthcare providers worldwide.",
    founderName: "Sophia Torres",
    founderTitle: "CEO & Founder",
    founderPhotoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974",
    pitchDetails: {
      problem: "Fragmented medical records lead to treatment errors, duplicated tests, and patient frustration.",
      solution: "Our blockchain platform creates an immutable, patient-controlled medical history accessible from anywhere.",
      marketSize: "$5.1 billion healthcare blockchain market growing at 64.5% CAGR.",
      businessModel: "SaaS model charging healthcare providers and insurance companies, free for patients.",
      competition: "Traditional EMR systems, emerging blockchain healthcare projects, and patient portal apps.",
      traction: "Pilot programs with 3 hospitals, 28 clinics, and 2 insurance providers covering 130,000 patients.",
      team: "Founded by healthcare IT specialists and blockchain developers with experience at Epic Systems and ConsenSys.",
      askAmount: "$3 million",
      equity: "15%",
      useOfFunds: "Security certifications, expanding integration team, and international expansion."
    },
    comments: []
  }
];

export const mockShark: Shark = {
  id: "s1",
  name: "Victoria Sharp",
  photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
  interestedStartups: ["1"],
  commentsMade: [
    {
      startupId: "1",
      commentId: "c1"
    }
  ]
};