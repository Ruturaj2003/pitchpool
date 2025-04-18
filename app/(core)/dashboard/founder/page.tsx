import { ProductList } from "./_components/ProductList";

const FounderDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container py-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, Founder</h1>
          <p className="text-muted-foreground">
            Select a product to view its pitch analytics
          </p>
        </div>
          <ProductList />       
      </div>
    </div>
  );
};
export default FounderDashboard;
