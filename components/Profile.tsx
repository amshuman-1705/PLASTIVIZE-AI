import React, { useState, FormEvent } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import ViewHeader from './common/ViewHeader';
import { useUserData } from '../contexts/UserDataContext';
import { useToast } from '../contexts/ToastContext';

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const { userData, updateUsername } = useUserData();
  const { addToast } = useToast();

  const [newUsername, setNewUsername] = useState(userData.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleUsernameSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || newUsername.trim() === userData.username) {
      return;
    }
    setIsSavingUsername(true);
    // Simulate API call
    setTimeout(() => {
      updateUsername(newUsername);
      addToast({ type: 'success', title: 'Username Updated', message: `Your username has been changed to ${newUsername}.` });
      setIsSavingUsername(false);
    }, 500);
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
        addToast({ type: 'error', title: 'Missing Fields', message: 'Please fill out all password fields.' });
        return;
    }
    if (newPassword !== confirmPassword) {
        addToast({ type: 'error', title: 'Passwords Do Not Match', message: 'Your new password and confirmation do not match.' });
        return;
    }
    if (newPassword.length < 6) {
        addToast({ type: 'error', title: 'Password Too Short', message: 'Password should be at least 6 characters.' });
        return;
    }

    setIsChangingPassword(true);
    // Simulate API call
    setTimeout(() => {
      addToast({ type: 'success', title: 'Password Changed', message: 'Your password has been successfully updated.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
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

  return (
    <div>
      <ViewHeader title="Profile Settings" onBack={onBack} />
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <h2 className="text-xl font-bold text-brand-text mb-4">Account Information</h2>
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <InputField 
              label="Username" 
              value={newUsername} 
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <div className="flex justify-end">
                <Button type="submit" isLoading={isSavingUsername} className="w-auto px-6">
                    Save Changes
                </Button>
            </div>
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-brand-text mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <InputField 
                label="Current Password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
            />
            <InputField 
                label="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
            />
            <InputField 
                label="Confirm New Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
            />
              <div className="flex justify-end">
                <Button type="submit" isLoading={isChangingPassword} className="w-auto px-6">
                    Change Password
                </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
