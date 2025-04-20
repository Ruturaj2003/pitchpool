// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase'; // Make sure the correct path is used
import { ref, set, remove, onValue } from 'firebase/database';
// ICONS
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
  MessageCircle,
  X,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import InterestAction from './_components/InterestAction';
import { useCommonStore } from '@/store/common';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';

// Firebase pitch ID

const DetailedPitchPage: React.FC = () => {
  const router = useRouter();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState('overview');
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const { user } = useUser();
  const avatarUrl = user?.imageUrl;
  const firstName = user?.firstName;
  const userId = user.id;
  const pitchId = useCommonStore((state) => state.pitchId);

  useEffect(() => {
    const pitchRef = ref(db, `pitches/${pitchId?.id}`);
    const unsubscribe = onValue(pitchRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setStartup(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onSwipeRight = () => router.back();

  const handlers = useSwipeable({
    onSwipedRight: onSwipeRight,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });
  // founderid , Founder Name , Founder Url , PitchId msg
  const handleInterested = async () => {
    try {
      await axios.post('/api/interested', {
        userId,
        pitchId: pitchId.id,
      });
      toast.success('Marked as Interested');
    } catch (error) {
      toast.error('Failed to mark as Interested');
    }
  };

  const handleSaveLater = async () => {
    try {
      await axios.post('/api/watchlater', {
        investorId: userId,
        pitchId: pitchId.id,
      });
      toast.success('Saved for later');
    } catch (error) {
      toast.error('Failed to save for later');
    }
  };

  const toggleSection = (sectionId) =>
    setOpenSection(openSection === sectionId ? null : sectionId);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`/api/pitch/${pitchId.id}`);

      const data = await res.data;
      const founderId = data.userId;
      const founderName = data.founderName;
      const founderPhotoUrl = data.founderPhotoUrl;
      console.log(founderId);
      console.log(userId);

      const sendingOBj = {
        investorId: userId,
        investorName: firstName,
        investorPhotoUrl: avatarUrl,

        founderId: founderId,
        founderName: founderName,
        founderPhotoUrl: founderPhotoUrl,

        pitchId: pitchId.id,
        message: comment,
      };

      await axios.post('/api/pitch/feedback', sendingOBj);

      toast.success('Comment submitted!');
      setComment('');
      setCommentModalOpen(false);
    } catch (error) {
      toast.error('Failed to submit comment');
      console.error('Comment submit error:', error);
    }
  };
  if (loading) return <div className="text-center mt-20">Loading pitch...</div>;
  if (!startup)
    return (
      <div className="text-center mt-20 text-red-600">Pitch not found</div>
    );

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
            onClick={handleInterested}
            icon={<Heart className="w-5 h-5" />}
            label="Interest"
            primary
          />
          <ActionButton
            onClick={handleSaveLater}
            icon={<Bookmark className="w-5 h-5" />}
            label="Save"
          />
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
              title="Problem"
              icon={<AlertCircle className="w-5 h-5 text-red-500" />}
              value={startup.pitchDetails.problem}
            />
            <InfoCard
              title="Solution"
              icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}
              value={startup.pitchDetails.solution}
            />
            <InfoCard
              title="Business Model"
              icon={<DollarSign className="w-5 h-5 text-teal-500" />}
              value={startup.pitchDetails.businessModel}
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
              title="Market Size"
              icon={<Globe className="w-5 h-5 text-green-500" />}
              value={startup.pitchDetails.marketSize}
            />
            <InfoCard
              title="Competition"
              icon={<Users className="w-5 h-5 text-orange-500" />}
              value={startup.pitchDetails.competition}
            />
            <InfoCard
              title="Traction"
              icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
              value={startup.pitchDetails.traction}
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
          <InfoCard
            title="Team Members"
            icon={<Users className="w-5 h-5 text-purple-500" />}
            value={startup.pitchDetails.team}
          />
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
              title="Ask Amount"
              icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
              value={startup.pitchDetails.askAmount}
            />
            <InfoCard
              title="Equity"
              icon={<Percent className="w-5 h-5 text-indigo-600" />}
              value={startup.pitchDetails.equity}
            />
            <InfoCard
              title="Use of Funds"
              icon={<Briefcase className="w-5 h-5 text-gray-700" />}
              value={startup.pitchDetails.useOfFunds}
              className="md:col-span-2"
            />
          </div>
        </AccordionSection>
      </main>

      {/* Feedback Modal */}
      <AnimatePresence>
        {commentModalOpen && (
          <motion.div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setCommentModalOpen(false)}
            />
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
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Components
const ActionButton = ({ icon, label, primary, onClick }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded-lg border flex items-center gap-2 ${
      primary ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
    } hover:${primary ? 'bg-indigo-700' : 'bg-gray-200'} transition-all`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const AccordionSection = ({
  id,
  title,
  icon,
  isOpen,
  toggleOpen,
  children,
}) => (
  <section className="rounded-xl shadow-md p-4 bg-white">
    <div
      onClick={toggleOpen}
      className="flex justify-between items-center cursor-pointer"
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-xl">
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </div>
    </div>
    {isOpen && <div className="mt-4">{children}</div>}
  </section>
);

const InfoCard = ({ icon, title, value, className }) => (
  <div
    className={`bg-gray-100 rounded-lg p-4 flex items-start gap-4 ${className}`}
  >
    <div className="text-indigo-500">{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-700">{title}</h4>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export default DetailedPitchPage;
