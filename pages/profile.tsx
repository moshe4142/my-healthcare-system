'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const ProfilePage = () => {
  const router = useRouter();
  const [UserNmae, setUserName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserName(data.username || '');
      setDob(data['date of birth'] || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
      setAddress(data.address || '');
      setProfileImage(data.profileImage || '');
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username: UserNmae,
'date of birth': dob,
      phone,
      email,
      address,
      profileImage,
      password: localStorage.getItem('profileData')
        ? JSON.parse(localStorage.getItem('profileData')!).password || ''
        : '',
    };
    localStorage.setItem('profileData', JSON.stringify(data));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('profileData');
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        const data = JSON.parse(localStorage.getItem('profileData') || '{}');
        data.profileImage = imageUrl;
        localStorage.setItem('profileData', JSON.stringify(data));
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = UserNmae
    ? UserNmae
        .split(' ')
        .map((n) => n[0])
        .join('')
    : '👤';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-[#e0f7fa] to-white min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        <div className="flex justify-center">
          <IconButton onClick={handleMenu} size="large">
            {profileImage ? (
              <Avatar src={profileImage} sx={{ width: 64, height: 64 }} />
            ) : (
              <Avatar sx={{ width: 64, height: 64 }}>{initials}</Avatar>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MenuItem component="label">
              Upload Photo
              <input type="file" hidden onChange={handleImageUpload} />
            </MenuItem>
            <MenuItem onClick={() => { setPasswordDialogOpen(true); handleClose(); }}>
              Change Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <FormRow label="User Name">
            {isEditing ? (
              <Input value={UserNmae} onChange={(e) => setUserName(e.target.value)} />
            ) : (
              <StaticText>{UserNmae}</StaticText>
            )}
          </FormRow>

          <FormRow label="Date of Birth">
            {isEditing ? (
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            ) : (
              <StaticText>{dob}</StaticText>
            )}
          </FormRow>

          <FormRow label="Phone Number">
            {isEditing ? (
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : (
              <StaticText>{phone}</StaticText>
            )}
          </FormRow>

          <FormRow label="Email">
            {isEditing ? (
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <StaticText>{email}</StaticText>
            )}
          </FormRow>

          <FormRow label="Address">
            {isEditing ? (
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            ) : (
              <StaticText>{address}</StaticText>
            )}
          </FormRow>

          {isEditing && (
            <div className="flex justify-end gap-4 pt-6">
              <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-md">
                Save
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
            </div>
          )}
        </form>

        {!isEditing && (
          <div className="flex justify-end pt-6">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-md w-full"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent className="flex flex-col gap-4 pt-2">
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const savedData = localStorage.getItem('profileData');
              if (!savedData) return;
              const data = JSON.parse(savedData);
              const storedPassword = data.password || '';
              if (currentPassword !== storedPassword) {
                setError('Incorrect current password');
                return;
              }
              if (!newPassword || newPassword === currentPassword) {
                setError('New password must be different and not empty');
                return;
              }
              data.password = newPassword;
              localStorage.setItem('profileData', JSON.stringify(data));
              setPasswordDialogOpen(false);
              setCurrentPassword('');
              setNewPassword('');
              setError('');
            }}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const FormRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const Input = ({
  value,
  onChange,
  type = 'text',
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
  />
);

const StaticText = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full px-4 py-2 bg-gray-100 rounded-md">{children}</div>
);

export default ProfilePage;
