import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoUploader } from "./VideoUploader";
// import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smart Coffee Maker",
    description: "AI-powered coffee brewing system",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: "2",
    name: "EcoCharge",
    description: "Solar-powered portable charger",
    imageUrl: "https://placehold.co/600x400",
  },
];

export function ProductList() {
  // const navigate = useNavigate();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockProducts.map((product) => (
        <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="space-y-2">
            <CardTitle>{product.name}</CardTitle>
            <p className="text-muted-foreground">{product.description}</p>
            <Button
              variant="ghost"
              className="group-hover:translate-x-1 transition-transform duration-200"
              //onClick={() => navigate(`/product/${product.id}`)}
            >
              View Analytics
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ))}

      <div className="grid gap-4 md:grid-cols-2">
        <VideoUploader />
      </div>

    </div>
  );
}