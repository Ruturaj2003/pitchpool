import React from 'react';
import { useSwipeable } from 'react-swipeable';

interface ReelCardProps {
  imageUrl: string;
  productName: string;
  description: string;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeRight?: () => void;
}

const ReelCard: React.FC<ReelCardProps> = ({
  imageUrl,
  productName,
  description,
  onSwipeUp,
  onSwipeDown,
  onSwipeRight,
}) => {
  const handlers = useSwipeable({
    onSwipedUp: () => onSwipeUp?.(),
    onSwipedDown: () => onSwipeDown?.(),
    onSwipedRight: () => onSwipeRight?.(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div
      {...handlers}
      className="relative h-screen w-full overflow-hidden bg-black touch-none"
    >
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{productName}</h2>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ReelCard;
