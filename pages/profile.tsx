'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
} from '@mui/material';

const ProfilePage = () => {
  const router = useRouter();
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
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
      setId(data.id || '');
      setFullName(data.full_name || '');
      setDob(data.date_of_birth || '');
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
      id,
      full_name: fullName,
      date_of_birth: dob,
      phone,
      email,
      address,
      profileImage,
      password: JSON.parse(localStorage.getItem('profileData') || '{}').password || ''
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

  const initials = fullName
    ? fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
    : '👤';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    const saved = JSON.parse(localStorage.getItem('profileData') || '{}');
    if (saved.password !== currentPassword) {
      setError('Current password is incorrect');
      return;
    }
    saved.password = newPassword;
    localStorage.setItem('profileData', JSON.stringify(saved));
    setPasswordDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setError('');
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

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
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
          {[{
            label: 'ID',
            value: id,
            setter: setId,
            type: 'text'
          }, {
            label: 'Full Name',
            value: fullName,
            setter: setFullName,
            type: 'text'
          }, {
            label: 'Date of Birth',
            value: dob,
            setter: setDob,
            type: 'date'
          }, {
            label: 'Phone Number',
            value: phone,
            setter: setPhone,
            type: 'text'
          }, {
            label: 'Email',
            value: email,
            setter: setEmail,
            type: 'email'
          }, {
            label: 'Address',
            value: address,
            setter: setAddress,
            type: 'text'
          }].map(({ label, value, setter, type }) => (
            <div key={label}>
              <label className="font-semibold">{label}</label>
              {isEditing ? (
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="block w-full border px-4 py-2 mt-1 rounded"
                />
              ) : (
                <p className="mt-1 text-gray-700">{value}</p>
              )}
            </div>
          ))}

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
        <DialogContent>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="block w-full border px-4 py-2 mt-2 rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full border px-4 py-2 mt-2 rounded"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePassword} color="primary">Save</Button>
          <Button onClick={() => setPasswordDialogOpen(false)} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
