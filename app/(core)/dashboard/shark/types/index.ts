export interface Startup {
    id: string;
    name: string;
    tagline: string;
    sector: string;
    videoUrl: string;
    thumbnailUrl: string;
    description: string;
    founderName: string;
    founderTitle: string;
    founderPhotoUrl: string;
    pitchDetails: {
      problem: string;
      solution: string;
      marketSize: string;
      businessModel: string;
      competition: string;
      traction: string;
      team: string;
      askAmount: string;
      equity: string;
      useOfFunds: string;
    };
    comments: Comment[];
  }
  
  export interface Comment {
    id: string;
    sharkId: string;
    sharkName: string;
    sharkPhotoUrl: string;
    text: string;
    timestamp: string;
  }
  
  export interface Shark {
    id: string;
    name: string;
    photoUrl: string;
    interestedStartups: string[];
    commentsMade: {
      startupId: string;
      commentId: string;
    }[];
  }
  