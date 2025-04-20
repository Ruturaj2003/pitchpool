// components/PitchCard.js

import { PaperClipIcon, EyeIcon } from '@heroicons/react/20/solid';

const PitchCard = ({
  pitchId = '12345',
  founderName = 'John Doe',
  founderUrl = 'https://example.com',
  message = 'This is a pitch message about an innovative solution.',
  date = '2025-04-20',
  fieldBadge = 'Technology',
}) => {
  return (
    <div className="max-w mx-auto bg-gradient-to-br from-[#47d4d2] via-[#1097e0] to-[#224ada] p-6 rounded-2xl shadow-xl backdrop-blur-lg hover:shadow-2xl transition-all ease-in-out duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-white">{founderName}</h3>
        <span className="text-xs text-white bg-[#5ed2f976] px-3 py-1 rounded-full">
          {fieldBadge}
        </span>
      </div>
      <p className="text-base text-white mb-4">{message}</p>
      <div className="flex items-center text-white text-xs mb-3">
        <PaperClipIcon className="h-4 w-4 mr-2 text-white" />
        <a
          href={founderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Founder’s Website
        </a>
      </div>
      <div className="flex justify-between items-center text-white text-sm">
        <span>{date}</span>
        <button className="flex items-center bg-[#4eaee29f] text-white py-2 px-4 rounded-lg text-sm">
          <EyeIcon className="h-5 w-5 mr-2" />
          View Detail
        </button>
      </div>
    </div>
  );
};

export default PitchCard;
