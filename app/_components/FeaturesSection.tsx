import { Sparkles, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: '60-Second Pitches',
    description:
      'Capture attention with concise, impactful video presentations of your startup idea.',
  },
  {
    icon: Zap,
    title: 'Quick Decisions',
    description:
      'Swipe right on ideas you love, connect instantly with innovative founders.',
  },
  {
    icon: Users,
    title: 'Connect & Collaborate',
    description:
      'Build your network of founders, investors, and collaborators in one place.',
  },
];

const FeaturesSection = () => {
  return (
    <div>
      {' '}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturesSection;
