import React, { useState, FormEvent } from 'react';
import { useToast } from '../../contexts/ToastContext';
import Button from '../common/Button';
import { Logo } from '../icons/Logo';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/auth";

interface AuthModalProps {
    mode: 'login' | 'signup';
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose }) => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>(mode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToast();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            addToast({
                type: 'error',
                title: 'Invalid Input',
                message: 'Please enter email and password.'
            });
            return;
        }

        setIsLoading(true);

        try {
            if (activeTab === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
                addToast({
                    type: 'success',
                    title: 'Welcome Back!',
                    message: 'Login successful.'
                });
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                addToast({
                    type: 'success',
                    title: 'Account Created!',
                    message: 'Signup successful.'
                });
            }

            onClose();
        } catch (error: any) {
            addToast({
                type: 'error',
                title: 'Authentication Error',
                message: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    const TabButton: React.FC<{label: 'Login' | 'Sign Up', current: 'login' | 'signup', onClick: () => void}> =
    ({ label, current, onClick }) => {
        const isActive = label.toLowerCase() === current;
        return (
            <button
              onClick={onClick}
              className={`w-1/2 py-3 font-bold text-center transition-colors duration-200 ${
                isActive
                  ? 'text-brand-green border-b-2 border-brand-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm animate-modal-content-in" onClick={(e) => e.stopPropagation()}>
                <div className="p-8 space-y-6">
                    <Logo className="h-10 w-auto mx-auto" />

                    <div className="flex border-b">
                        <TabButton label="Login" current={activeTab} onClick={() => setActiveTab('login')} />
                        <TabButton label="Sign Up" current={activeTab} onClick={() => setActiveTab('signup')} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-text-light">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-text-light">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" isLoading={isLoading}>
                            {activeTab === 'login' ? 'Login' : 'Create Account'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
