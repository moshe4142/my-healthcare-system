"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "@mui/material";

const ProfilePage = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image_url, setImage_url] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setId(data.id || "");
      setFullName(data.full_name || "");
      setDob(data.date_of_birth || "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
      setAddress(data.address || "");
      setImage_url(data.image_url || "");
    } else {
      router.push("/login");
    }
  }, [router]);

  const deletePhoto = async () => {
  const profileData = localStorage.getItem("profileData");
  if (!profileData) return;

  try {
    const profile = JSON.parse(profileData);
    const { id, public_id } = profile;

    // 1. Delete from Cloudinary
    if (public_id) {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id }),
      });
    }

    // 2. Update DB to clear image fields
    await fetch(`/api/updateUser/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...profile, image_url: '', public_id: '' }),
    });

    // 3. Update localStorage
    const updatedProfile = { ...profile, image_url: '', public_id: '' };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));

    // 4. Update UI
    setImage_url('');
  } catch (err) {
    console.error("Error deleting image:", err);
  }
};


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      full_name: fullName,
      date_of_birth: dob,
      phone,
      email,
      address,
      image_url: image_url,
    };

    try {
      const response = await fetch(`/api/updateUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        // עדכון המידע בצד הלקוח
        // הפנייה לעמוד פרופיל אחרי עדכון המידע
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };



  const handleLogout = () => {
    localStorage.removeItem("profileData");
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result;

    try {
      const uploadRes = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        console.error(uploadData.error);
        return;
      }

      const { imageUrl, public_id } = uploadData;
      setImage_url(imageUrl); // Update UI

      // Save in DB
      await fetch(`/api/updateUser/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          date_of_birth: dob,
          phone,
          email,
          address,
          image_url: imageUrl,
          public_id: public_id,
        }),
      });

      // Save in localStorage
      const updatedProfile = {
        id,
        full_name: fullName,
        date_of_birth: dob,
        phone,
        email,
        address,
        image_url: imageUrl,
        public_id: public_id,
      };
      localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  reader.readAsDataURL(file);
};




  const initials = fullName
    ? fullName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
    : "👤";

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const handleChangePassword = async () => {
  setError("");

  if (!currentPassword || !newPassword) {
    setError("Both fields are required");
    return;
  }

  if (newPassword.length < 6) {
    setError("New password must be at least 6 characters");
    return;
  }

  if (currentPassword === newPassword) {
    setError("New password must be different from current password");
    return;
  }

  const profile = JSON.parse(localStorage.getItem("profileData") || "{}");
  const id = profile.id;

  try {
    const res = await fetch('/api/changePassword/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, currentPassword, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Failed to change password');
      return;
    }

    alert("Password changed successfully");

    setPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
  } catch (err) {
    console.error("Password change error:", err);
    setError("Something went wrong");
  }
};


  const handleDeleteAccount = async () => {
    if (!id) {
      alert("User ID is missing");
      return;
    }

    try {
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to delete user:", data.error);
        alert("Failed to delete account: " + data.error);
        return;
      }

      // אם הצליח - ניקוי ה-localStorage והפנייה לדף הרשמה
      localStorage.clear();
      window.location.href = "/signup";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Something went wrong while deleting your account.");
    }
  };


  return (
    <div className="p-6 bg-gradient-to-b from-[#e0f7fa] to-white min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        <div className="flex justify-center">
          <IconButton onClick={handleMenu} size="large">
            {image_url ? (
              <Avatar src={image_url} sx={{ width: 64, height: 64 }} />
            ) : (
              <Avatar sx={{ width: 64, height: 64 }}>{initials}</Avatar>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component="label">
              Upload Photo
              <input
                type="file"
                hidden
                onChange={(e) => {
                  handleImageUpload(e);
                  handleClose(); // סגירת התפריט אחרי העלאה
                }}
              />
            </MenuItem>

            <MenuItem
              onClick={() => {
                deletePhoto();
                handleClose();
              }}
            >
              Delete Photo
            </MenuItem>
            <MenuItem
              onClick={() => {
                setPasswordDialogOpen(true);
                handleClose();
              }}
            >
              Change Password
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDeleteAccount();
                handleClose();
              }}
            >
              <p className="text-red-400">Delete Account</p>
            </MenuItem>
          </Menu>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {[
            {
              label: "ID",
              value: id,
              setter: setId,
              type: "text",
            },
            {
              label: "Full Name",
              value: fullName,
              setter: setFullName,
              type: "text",
            },
            {
              label: "Date of Birth",
              value: dob,
              setter: setDob,
              type: "date",
            },
            {
              label: "Phone Number",
              value: phone,
              setter: setPhone,
              type: "text",
            },
            {
              label: "Email",
              value: email,
              setter: setEmail,
              type: "email",
            },
            {
              label: "Address",
              value: address,
              setter: setAddress,
              type: "text",
            },
          ].map(({ label, value, setter, type }) => (
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

      <Dialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
      >
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
          <Button onClick={handleChangePassword} color="primary">
            Save
          </Button>
          <Button
            onClick={() => setPasswordDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;


