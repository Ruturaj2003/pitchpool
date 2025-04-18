import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Record Your Pitch',
    description: 'Create a 60-second video showcasing your startup idea',
  },
  {
    number: '02',
    title: 'Share Your Vision',
    description:
      'Upload your pitch and reach potential investors and collaborators',
  },
  {
    number: '03',
    title: 'Connect & Grow',
    description:
      'Match with interested parties and take your startup to the next level',
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <span className="text-5xl font-bold text-primary/20">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-6 w-8 h-8 text-primary transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;
