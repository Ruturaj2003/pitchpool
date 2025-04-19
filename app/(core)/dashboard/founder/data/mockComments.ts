
export interface SharkComment {
    id: string;
    sharkName: string;
    sharkImage: string;
    comment: string;
    date: string;
    time: string;
    pitchTitle: string;
  }
  
  export const mockComments: SharkComment[] = [
    {
      id: "1",
      sharkName: "Alex Morgan",
      sharkImage: "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "I love the business model. Your customer acquisition strategy is solid, but I'm concerned about your valuation. Let's discuss how we can optimize your growth strategy.",
      date: "2025-04-16",
      time: "10:30 AM",
      pitchTitle: "EcoTech Solutions"
    },
    {
      id: "2",
      sharkName: "David Chen",
      sharkImage: "https://randomuser.me/api/portraits/men/32.jpg",
      comment: "Impressive pitch! Your product solves a real problem. I'd suggest focusing more on enterprise clients for quicker revenue growth. I'd be happy to introduce you to some potential clients in my network.",
      date: "2025-04-15",
      time: "2:45 PM",
      pitchTitle: "HealthMonitor App"
    },
    {
      id: "3",
      sharkName: "Sarah Johnson",
      sharkImage: "https://randomuser.me/api/portraits/women/68.jpg",
      comment: "Great presentation skills! The market potential is enormous but your user acquisition cost seems high. I'd like to see a more detailed plan on how you'll reduce it over time.",
      date: "2025-04-15",
      time: "11:15 AM",
      pitchTitle: "Urban Delivery Network"
    },
    {
      id: "4",
      sharkName: "Michael Rodriguez",
      sharkImage: "https://randomuser.me/api/portraits/men/45.jpg",
      comment: "Revolutionary product with strong IP protection. I'm concerned about manufacturing scalability though. Let's discuss how to streamline your production process to meet potential demand.",
      date: "2025-04-14",
      time: "3:30 PM",
      pitchTitle: "SmartHome Security System"
    },
    {
      id: "5",
      sharkName: "Emma Willis",
      sharkImage: "https://randomuser.me/api/portraits/women/22.jpg",
      comment: "Your founders' background is impressive and perfectly aligned with this business. I see potential for global expansion, but let's refine the go-to-market strategy for international markets first.",
      date: "2025-04-13",
      time: "1:20 PM",
      pitchTitle: "AI Language Tutor"
    }
  ];