'use client';

import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

interface Pitch {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  userId: string;
}

export function ProductList() {
  const { user } = useUser();
  const [pitches, setPitches] = useState<Pitch[]>([]);

  useEffect(() => {
    if (!user) return;

    const pitchesRef = ref(db, 'pitches');
    const unsubscribe = onValue(pitchesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedPitches = Object.entries(data)
          .map(([id, value]: any) => ({
            id,
            name: value.name,
            description: value.description,
            thumbnailUrl: value.thumbnailUrl,
            userId: value.userId,
          }))
          .filter((pitch) => pitch.userId === user.id); // 🧠 Filter by current user ID

        setPitches(loadedPitches);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="font-sans">
      {/* Mobile layout */}
      <div className="block lg:hidden overflow-x-auto snap-x snap-mandatory scroll-smooth px-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="flex gap-4 pb-4">
          {pitches.map((pitch) => (
            <Card
              key={pitch.id}
              className="min-w-[300px] sm:min-w-[340px] snap-start rounded-2xl bg-gradient-to-br from-muted/20 via-secondary/10 to-accent/10 shadow-md transition hover:shadow-xl hover:scale-[1.02] duration-300 ease-in-out"
            >
              <CardHeader className="pl-3 pr-3 rounded-2xl overflow-hidden">
                <img
                  src={pitch.thumbnailUrl}
                  alt={pitch.name}
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                <CardTitle className="text-lg font-semibold">{pitch.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{pitch.description}</p>
                <Link href={`/dashboard/founder/${pitch.id}`}>
                  <Button variant="ghost" className="text-primary hover:bg-primary hover:text-white transition-all">
                    View Analytics <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-6">
        {pitches.map((pitch) => (
          <Card
            key={pitch.id}
            className="rounded-2xl bg-gradient-to-br from-muted/20 via-secondary/10 to-accent/10 shadow-md transition hover:shadow-xl hover:scale-[1.02] duration-300 ease-in-out"
          >
            <CardHeader className="p-0 pr-3 pl-3 rounded-t-2xl overflow-hidden">
              <img
                src={pitch.thumbnailUrl}
                alt={pitch.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              <CardTitle className="text-lg font-semibold">{pitch.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{pitch.description}</p>
              <Link href={`/dashboard/founder/${pitch.id}`}>
                <Button variant="ghost" className="text-primary hover:bg-primary hover:text-white transition-all">
                  View Analytics <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
