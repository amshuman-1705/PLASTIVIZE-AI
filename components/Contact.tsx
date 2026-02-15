import React, { useState, FormEvent } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import ViewHeader from './common/ViewHeader';
import { useToast } from '../contexts/ToastContext';

interface ContactProps {
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast({ type: 'error', title: 'Missing Fields', message: 'Please fill out all fields to send your message.' });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      addToast({ type: 'success', title: 'Message Sent!', message: 'Thanks for reaching out. We will get back to you soon.' });
      setName('');
      setEmail('');
      setMessage('');
      setIsLoading(false);
    }, 1000);
  };

  const InputField: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, placeholder?: string}> = ({ label, value, onChange, type = 'text', placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-brand-text-light mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-brand-gray text-brand-text placeholder-gray-400 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
        />
    </div>
  );
  
  const TextareaField: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder?: string}> = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-brand-text-light mb-1">{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={5}
            className="w-full px-4 py-2 bg-brand-gray text-brand-text placeholder-gray-400 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
        />
    </div>
  );

  return (
    <div>
      <ViewHeader title="Contact Us" onBack={onBack} />
      <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-8 items-start">
        <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-brand-text mb-2">Get in Touch</h2>
              <p className="text-brand-text-light mb-4">Have questions or feedback? We'd love to hear from you!</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField 
                    label="Full Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                />
                 <InputField 
                    label="Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                />
                 <TextareaField 
                    label="Your Message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know how we can help..."
                />
                <Button type="submit" isLoading={isLoading}>
                    Send Message
                </Button>
              </form>
            </Card>
        </div>
        <div className="space-y-6 mt-6 md:mt-0">
            <Card>
                <h3 className="text-lg font-bold text-brand-text mb-3">Contact Information</h3>
                <div className="space-y-3 text-brand-text-light">
                    <p><strong>Email:</strong> support@plastivize.app</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Address:</strong> 123 Green Way, Eco City, 98765</p>
                </div>
            </Card>
            <Card>
                <h3 className="text-lg font-bold text-brand-text mb-3">Frequently Asked Questions</h3>
                <div className="space-y-3 text-sm">
                    <div>
                        <p className="font-semibold text-brand-text">How accurate is the plastic scanner?</p>
                        <p className="text-brand-text-light">Our AI is trained on thousands of images and is highly accurate, but results can vary based on image quality and lighting.</p>
                    </div>
                     <div>
                        <p className="font-semibold text-brand-text">How are Eco-Points calculated?</p>
                        <p className="text-brand-text-light">You earn a set amount of points for each successful scan, with bonuses for rare plastics or participating in community challenges.</p>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
