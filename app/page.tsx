import Image from 'next/image';
import Navbar from './_components/Navbar';
import HeroSection from './_components/HeroSection';
import FeaturesSection from './_components/FeaturesSection';
import HowItWorks from './_components/HowItWorks';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <FeaturesSection></FeaturesSection>
      <HowItWorks></HowItWorks>
    </div>
  );
}
