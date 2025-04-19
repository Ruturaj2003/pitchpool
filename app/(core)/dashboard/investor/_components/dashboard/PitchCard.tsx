import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PitchCardProps {
  id: string;
  companyName: string;
  description: string;
  category: string;
  askAmount: string;
  logo?: string;
  rating?: number;
  isBookmarked?: boolean;
  type: 'interested' | 'feedback' | 'watch-later';
  className?: string;
  style?: React.CSSProperties;
}

const PitchCard: React.FC<PitchCardProps> = ({
  id,
  companyName,
  description,
  category,
  askAmount,
  logo,
  rating = 0,
  isBookmarked = false,
  type,
  className,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'interested':
        return <Heart className="h-4 w-4 text-foreground" fill="#F87171" />;
      case 'feedback':
        return <MessageSquare className="h-4 w-4 text-foreground" />;
      case 'watch-later':
        return <Clock className="h-4 w-4 text-foreground" />;
      default:
        return null;
    }
  };

  const renderRating = () => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-foreground fill-foreground' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-md border-none card-gradient hover:card-gradient-hover animate-scale-in',
        className
      )}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center space-x-3">
          {logo ? (
            <div className="h-10 w-10 rounded overflow-hidden bg-white shadow-sm">
              <img
                src={logo}
                alt={`${companyName} logo`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              {companyName.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground">{companyName}</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTypeIcon()}
              <span className="ml-1 capitalize">
                {type === 'watch-later' ? 'Watch Later' : type}
              </span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          {category}
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
          {description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm font-medium text-foreground">
            Ask: <span className="text-accent">{askAmount}</span>
          </span>
          {renderRating()}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2 justify-between">
        <Button
          variant="default"
          size="sm"
          className="flex-1 bg-primary hover:bg-primary/90 text-white"
        >
          View Details
        </Button>
        {type === 'interested' && (
          <Button variant="outline" size="sm" className="flex-1">
            Contact
          </Button>
        )}
        {type === 'feedback' && (
          <Button variant="outline" size="sm" className="flex-1">
            Edit Feedback
          </Button>
        )}
        {type === 'watch-later' && (
          <Button variant="outline" size="sm" className="flex-1">
            Move to Interested
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PitchCard;
