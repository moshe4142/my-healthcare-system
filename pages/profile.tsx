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
  const [profileImage, setProfileImage] = useState("");
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
      setProfileImage(data.profileImage || "");
    } else {
      router.push("/login");
    }
  }, [router]);

  const deletePhoto = () => {
    const usersData = localStorage.getItem("users");
    const profileData = localStorage.getItem("profileData");

    if (!usersData || !profileData) return;

    try {
      const users = JSON.parse(usersData);
      const profile = JSON.parse(profileData);

      // איפוס התמונה במשתמש המחובר
      const updatedUsers = users.map((user: any) =>
        user.id === profile.id ? { ...user, profileImage: "" } : user
      );

      // איפוס התמונה בפרופיל הפעיל
      const updatedProfile = { ...profile, profileImage: "" };

      // עדכון ה-localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("profileData", JSON.stringify(updatedProfile));

      // עדכון סטייט
      setProfileImage("");
    } catch (error) {
      console.error("שגיאה באיפוס התמונה:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("profileData") || "{}");
    let imageData = profileImage;

    const updateStorage = (imageUrl: string) => {
      const updatedProfile = {
        id,
        full_name: fullName,
        date_of_birth: dob,
        phone,
        email,
        address,
        profileImage: imageUrl,
        password: saved.password || "",
      };
      // עדכון profileData
      localStorage.setItem("profileData", JSON.stringify(updatedProfile));
      setProfileImage(imageUrl);

      // עדכון users
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((user: any) =>
        user.id === id ? { ...user, ...updatedProfile } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setIsEditing(false);
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        updateStorage(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      updateStorage(imageData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("profileData");
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);

        // עדכון profileData
        const saved = JSON.parse(localStorage.getItem("profileData") || "{}");
        const updatedProfile = { ...saved, profileImage: imageUrl };
        localStorage.setItem("profileData", JSON.stringify(updatedProfile));

        // עדכון users
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map((user: any) =>
          user.id === saved.id ? { ...user, profileImage: imageUrl } : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      };
      reader.readAsDataURL(file);
    }
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

  const handleChangePassword = () => {
    const profile = JSON.parse(localStorage.getItem("profileData") || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!profile.password) {
      setError("No password was set for this account.");
      return;
    }
    if (profile.password !== currentPassword) {
      setError("Current password is incorrect");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }
    if (currentPassword === newPassword) {
      setError("New password must be different from the current password");
      return;
    }

    // עדכון profileData
    const updatedProfile = {
      ...profile,
      password: newPassword,
    };
    localStorage.setItem("profileData", JSON.stringify(updatedProfile));

    // עדכון ברשימת המשתמשים
    const updatedUsers = users.map((user: any) => {
      if (user.email === profile.email) {
        return { ...user, password: newPassword };
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // ניקוי וסגירה
    setPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setError("");
  };

  const handleDeleteAccount = async () => {
    if (!id) {
      alert("User ID is missing");
      return;
    }
  
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete user:", errorData.error);
        alert("Failed to delete account: " + errorData.error);
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
