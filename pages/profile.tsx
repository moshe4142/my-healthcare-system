import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setFullName(data.fullName || '');
      setDob(data.dob || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
      setAddress(data.address || '');
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const data = { fullName, dob, phone, email, address };
    localStorage.setItem('profileData', JSON.stringify(data));
    console.log('Form saved with values:', data);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-[#e0f7fa] to-white min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
            {fullName
              ? fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
              : '👤'}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <FormRow label="Full Name">
            {isEditing ? (
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            ) : (
              <StaticText>{fullName}</StaticText>
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
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded-md"
              >
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
    </div>
  );
};

// Small reusable components
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
