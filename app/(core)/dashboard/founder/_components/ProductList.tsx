import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smart Coffee Maker',
    description: 'AI-powered coffee brewing system',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: '2',
    name: 'EcoCharge',
    description: 'Solar-powered portable charger',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: '3',
    name: 'AquaSense',
    description: 'Smart water purifier for modern homes',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: '4',
    name: 'FitMirror',
    description: 'AI fitness mirror with real-time feedback',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: '5',
    name: 'GlowDesk',
    description: 'Ergonomic desk with mood lighting and charging',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: '6',
    name: 'AirNanny',
    description: 'Indoor air quality monitor with insights',
    imageUrl: 'https://placehold.co/600x400',
  },
];

export function ProductList() {
  return (
    <div className="font-sans">
      {/* Mobile: Horizontal scroll with snap */}
      <div className="block lg:hidden overflow-x-auto snap-x snap-mandatory scroll-smooth px-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="flex gap-4 pb-4">
          {mockProducts.map((product) => (
            <Card
              key={product.id}
              className="min-w-[300px] sm:min-w-[340px] snap-start rounded-2xl bg-gradient-to-br from-muted/20 via-secondary/10 to-accent/10 shadow-md transition hover:shadow-xl hover:scale-[1.02] duration-300 ease-in-out"
            >
              <CardHeader className="pl-3 pr-3  rounded-2xl overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                <CardTitle className="text-lg font-semibold">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <Link href={`/dashboard/founder/${product.id}`} passHref>
                  <Button
                    variant="ghost"
                    className="text-primary hover:bg-primary hover:text-white transition-all"
                  >
                    View Analytics <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            className="rounded-2xl bg-gradient-to-br from-muted/20 via-secondary/10 to-accent/10 shadow-md transition hover:shadow-xl hover:scale-[1.02] duration-300 ease-in-out"
          >
            <CardHeader className="p-0 rounded-t-2xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              <CardTitle className="text-lg font-semibold">
                {product.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <Link href={`/dashboard/founder/${product.id}`} passHref>
                <Button
                  variant="ghost"
                  className="text-primary hover:bg-primary hover:text-white transition-all"
                >
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
