'use client ';
import { useSwipeable } from 'react-swipeable';

const FeedPage = () => {
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log('Swiped left!'),
    onSwipedRight: () => console.log('Swiped right!'),
    onSwipedUp: () => console.log('Swiped up!'),
    onSwipedDown: () => console.log('Swiped down!'),
  });
  return <div {...handlers}>FeedPage</div>;
};
export default FeedPage;
