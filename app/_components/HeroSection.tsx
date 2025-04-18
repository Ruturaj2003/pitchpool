'use client';
import { Button } from '@/components/ui/button';
import {
  CircleDollarSign,
  HandCoins,
  Phone,
  PiggyBank,
  Play,
  Rocket,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const handleRoleLogin = (role: 'founder' | 'investor') => {
    sessionStorage.setItem('user_role', role);
    return router.push('/sign-in');
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 text-white z-10 animate-slide-up">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Pitch Your Startup
            <br />
            <span className="text-accent">In Seconds</span>
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Share your vision through short video pitches. Swipe to discover
            groundbreaking startups and connect with founders.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => handleRoleLogin('investor')}
              size="lg"
              className="bg-accent hover:bg-accent/90"
            >
              <PiggyBank className="mr-2 h-6 w-6" />I Want to Invest
            </Button>
            <Button
              onClick={() => handleRoleLogin('founder')}
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20"
            >
              <Rocket className="mr-2 h-6 w-6" />
              Pitch My Startup
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative w-[280px] h-[560px] mx-auto">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-xl rounded-3xl border-4 border-white/20"></div>
            <div className="absolute inset-2 bg-black rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-secondary to-primary opacity-75"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
