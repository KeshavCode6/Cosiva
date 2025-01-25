import { DollarSign } from 'lucide-react';
import { LandingAnimatedSection } from './LandingAnimatedSection';

// Define the features array
const features = [
    {
        title: 'Affordability',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur!',
        icon: <DollarSign />,
    },
    {
        title: 'Accessibility',
        description: 'Our platform is accessible to all ages, making learning easier and fun for everyone.',
        icon: <DollarSign />,
    },
    {
        title: 'Engagement',
        description: 'Cosiva keeps kids engaged with interactive, hands-on programming.',
        icon: <DollarSign />,
    },
    {
        title: 'Support',
        description: 'Our team is always here to support you through every learning step.',
        icon: <DollarSign />,
    },
];

const LandingWhyUs = () => {
    return (
        <LandingAnimatedSection className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 md:gap-24 sm:px-12">
            <div className="bg-primary w-96 h-72 rounded-lg" />
            <div className="grid grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <div className="flex flex-col items-center" key={index}>
                        <div className="bg-primary rounded-full aspect-square text-white flex items-center justify-center w-12">
                            {feature.icon}
                        </div>
                        <span className="font-semibold text-xl mt-2">{feature.title}</span>
                        <span className="max-w-72 text-center text-base">{feature.description}</span>
                    </div>
                ))}
            </div>
        </LandingAnimatedSection>
    );
};

export default LandingWhyUs;