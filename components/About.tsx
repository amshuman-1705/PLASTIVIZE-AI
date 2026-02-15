import React from 'react';
import ViewHeader from './common/ViewHeader';
import Card from './common/Card';
import Avatar from './common/Avatar';
import { Logo } from './icons/Logo';

interface AboutProps {
  onBack: () => void;
}

const TeamMember: React.FC<{ name: string; role: string }> = ({ name, role }) => (
    <div className="text-center">
        <Avatar name={name} className="w-24 h-24 mx-auto mb-3 text-2xl border-4 border-white shadow-md" />
        <h4 className="font-bold text-brand-text">{name}</h4>
        <p className="text-sm text-brand-text-light">{role}</p>
    </div>
);

const ValueCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="text-center p-4">
        <div className="text-4xl mb-3">{icon}</div>
        <h4 className="font-bold text-lg text-brand-text mb-2">{title}</h4>
        <p className="text-brand-text-light text-sm">{children}</p>
    </div>
);


const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div>
      <ViewHeader title="About PLASTIVIZE" onBack={onBack} />
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center py-8 px-4 bg-gradient-to-br from-brand-green to-teal-600 text-white rounded-xl shadow-lg">
            <Logo className="h-16 w-auto mx-auto mb-4" waveColor1="#FFFFFF" waveColor2="#A7F3D0" textColor="#FFFFFF"/>
            <h2 className="text-3xl font-bold mb-2">Our Mission</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
                To empower individuals and communities to combat plastic pollution through technology, education, and creative reuse.
            </p>
        </div>
        
        <Card>
            <h3 className="text-2xl font-bold text-brand-text mb-4">Our Story</h3>
            <div className="space-y-4 text-brand-text-light">
                <p>
                    PLASTIVIZE was born from a simple idea: what if we could use the power of AI to make a real-world impact on plastic waste? We saw a world struggling with plastic pollution and individuals who wanted to help but didn't know where to start. 
                </p>
                <p>
                    Our journey began with a small team of passionate developers, environmentalists, and designers. We spent months developing a smart system that could not only identify any plastic item from a photo but also provide meaningful, actionable information about its lifecycle. From a simple scanner, PLASTIVIZE grew into a comprehensive platform with tools to calculate your footprint, a community to share progress, and a global map to visualize the scale of the challenge. We believe that every piece of plastic identified, recycled, or reused is a small victory for our planet.
                </p>
            </div>
        </Card>
        
        <Card>
            <h3 className="text-2xl font-bold text-brand-text text-center mb-6">Meet the Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-lg mx-auto">
                <TeamMember name="Namburi Rishika" role="Founder & CEO" />
                <TeamMember name="Nooka Nikshith" role="Lead AI Engineer" />
            </div>
        </Card>
        
        <Card>
             <h3 className="text-2xl font-bold text-brand-text text-center mb-6">Our Values</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ValueCard icon="🌱" title="Sustainability">
                    We are committed to protecting our planet for future generations by promoting responsible consumption and waste management.
                </ValueCard>
                <ValueCard icon="💡" title="Innovation">
                    We leverage cutting-edge AI technology to create practical and effective solutions for complex environmental problems.
                </ValueCard>
                 <ValueCard icon="🤝" title="Community">
                    We believe in the power of collective action and strive to build a supportive global network of environmental advocates.
                </ValueCard>
             </div>
        </Card>

      </div>
    </div>
  );
};

export default About;