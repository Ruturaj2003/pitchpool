// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Bookmark,
  Heart,
  Zap,
  User,
  AlertCircle,
  Lightbulb,
  Globe,
  DollarSign,
  Users,
  TrendingUp,
  Percent,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Building,
  Target,
  Layers,
  MessageCircle,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DetailedPitchPage: React.FC = () => {
  const router = useRouter();
  const onSwipeRight = () => router.back();

  const handlers = useSwipeable({
    onSwipedRight: onSwipeRight,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  const startup = {
    name: 'EcoCharge',
    tagline: 'Charging the world sustainably',
    sector: 'Renewable Energy',
    founderName: 'Jane Doe',
    founderTitle: 'CEO & Founder',
    founderPhotoUrl: 'https://via.placeholder.com/100',
    problem: 'EV charging is slow and inaccessible in remote areas.',
    solution: 'Solar-powered charging stations with battery storage.',
    marketSize: '$5B global EV infrastructure market',
    businessModel: 'Hardware sales + subscription model',
    competition: 'ChargePoint, EVgo, Tesla',
    traction: '100+ stations deployed',
    team: 'Jane Doe, Mike Ross, Rachel Zane',
    askAmount: '$250,000',
    equity: '10%',
    useOfFunds: 'City expansions & tech improvements',
  };

  // State for accordion sections
  const [openSection, setOpenSection] = useState('overview');
  // State for comment modal
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the comment to your backend
    console.log('Submitted comment:', comment);
    // Clear the comment field and close the modal
    setComment('');
    setCommentModalOpen(false);
    // You could also show a success message
  };

  return (
    <div {...handlers} className="min-h-screen bg-gray-50 py-8">
      <main className="w-full max-w-3xl mx-auto p-4 space-y-6 font-inter">
        {/* Hero */}
        <header className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{startup.name}</h1>
            <p className="mt-1 text-lg text-gray-600">{startup.tagline}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded bg-indigo-100 text-indigo-800">
              <Zap className="w-4 h-4 mr-1" />
              {startup.sector}
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">{startup.founderName}</p>
              <p className="text-gray-600">{startup.founderTitle}</p>
            </div>
          </div>
        </header>

        {/* Action Bar */}
        <div className="sticky top-4 z-20 bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-wrap items-center justify-evenly gap-4">
          <ActionButton
            icon={<Heart className="w-5 h-5" />}
            label="Interest"
            primary
          />
          <ActionButton icon={<Bookmark className="w-5 h-5" />} label="Save" />
          <ActionButton
            icon={<MessageCircle className="w-5 h-5" />}
            label="Add Feedback"
            onClick={() => setCommentModalOpen(true)}
          />
        </div>

        {/* Accordion Sections */}
        <AccordionSection
          id="overview"
          title="Business Overview"
          icon={<Building className="w-5 h-5" />}
          isOpen={openSection === 'overview'}
          toggleOpen={() => toggleSection('overview')}
        >
          <div className="grid grid-cols-1 gap-4">
            <InfoCard
              icon={<AlertCircle className="w-5 h-5 text-red-500" />}
              title="Problem"
              value={startup.problem}
            />
            <InfoCard
              icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}
              title="Solution"
              value={startup.solution}
            />
            <InfoCard
              icon={<DollarSign className="w-5 h-5 text-teal-500" />}
              title="Business Model"
              value={startup.businessModel}
            />
          </div>
        </AccordionSection>

        <AccordionSection
          id="market"
          title="Market & Opportunity"
          icon={<Globe className="w-5 h-5" />}
          isOpen={openSection === 'market'}
          toggleOpen={() => toggleSection('market')}
        >
          <div className="grid grid-cols-1 gap-4">
            <InfoCard
              icon={<Globe className="w-5 h-5 text-green-500" />}
              title="Market Size"
              value={startup.marketSize}
            />
            <InfoCard
              icon={<Users className="w-5 h-5 text-orange-500" />}
              title="Competition"
              value={startup.competition}
            />
            <InfoCard
              icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
              title="Traction"
              value={startup.traction}
            />
          </div>
        </AccordionSection>

        <AccordionSection
          id="team"
          title="Team"
          icon={<Users className="w-5 h-5" />}
          isOpen={openSection === 'team'}
          toggleOpen={() => toggleSection('team')}
        >
          <div className="grid grid-cols-1 gap-4">
            <InfoCard
              icon={<Users className="w-5 h-5 text-purple-500" />}
              title="Team Members"
              value={startup.team}
            />
          </div>
        </AccordionSection>

        <AccordionSection
          id="investment"
          title="Investment Opportunity"
          icon={<Target className="w-5 h-5" />}
          isOpen={openSection === 'investment'}
          toggleOpen={() => toggleSection('investment')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
              title="Ask Amount"
              value={startup.askAmount}
            />
            <InfoCard
              icon={<Percent className="w-5 h-5 text-indigo-600" />}
              title="Equity"
              value={startup.equity}
            />
            <InfoCard
              className="md:col-span-2"
              icon={<Briefcase className="w-5 h-5 text-gray-700" />}
              title="Use of Funds"
              value={startup.useOfFunds}
            />
          </div>
        </AccordionSection>
      </main>

      {/* Glass Effect Comment Modal */}
      <AnimatePresence>
        {commentModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop with blur effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm"
              onClick={() => setCommentModalOpen(false)}
            />

            {/* Modal with glass effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="bg-white bg-opacity-70 backdrop-blur-md border border-white border-opacity-20 rounded-xl shadow-xl p-6 w-full max-w-lg relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Add Your Feedback
                </h2>
                <button
                  onClick={() => setCommentModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-50 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleCommentSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="comment">
                    Share your thoughts on this startup:
                  </label>
                  <textarea
                    id="comment"
                    className="w-full px-4 py-2 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={6}
                    placeholder="Write your feedback here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCommentModalOpen(false)}
                    className="px-4 py-2 bg-white bg-opacity-50 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-opacity-70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 bg-opacity-90 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-100 transition-colors"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Accordion Section Component
const AccordionSection: React.FC<{
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
}> = ({ id, title, icon, isOpen, toggleOpen, children }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <button
      className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      onClick={toggleOpen}
    >
      <div className="flex items-center">
        <div className="p-2 bg-gray-100 rounded-lg mr-3">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>

    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="px-5 pb-5"
      >
        {children}
      </motion.div>
    )}
  </div>
);

// Info Card Component
const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  className?: string;
}> = ({ icon, title, value, className = '' }) => (
  <div
    className={`bg-gray-50 rounded-lg p-4 flex items-start space-x-3 ${className}`}
  >
    <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-gray-800">{value}</p>
    </div>
  </div>
);

// Action Button Component
const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
  onClick?: () => void;
}> = ({ icon, label, primary = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition
      ${
        primary
          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
      }`}
  >
    {icon}
    {label}
  </button>
);

export default DetailedPitchPage;
