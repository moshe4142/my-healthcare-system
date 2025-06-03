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
  const [publicId, setPublicId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  // Helper function to format date for input field
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Get local date components to avoid timezone shift
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/me", {
          method: "GET",
          credentials: "include", // Include JWT cookie
        });

        if (response.ok) {
          const data = await response.json();
          setId(data.id || "");
          setFullName(data.full_name || "");
          setDob(formatDateForInput(data.date_of_birth || ""));
          setPhone(data.phone || "");
          setEmail(data.email || "");
          setAddress(data.address || "");
          setImage_url(data.image_url || "");
          setPublicId(data.public_id || "");
        } else {
          // JWT invalid or expired, redirect to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push("/login");
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      full_name: fullName,
      date_of_birth: dob,
      phone,
      email,
      address,
      image_url: image_url,
      public_id: publicId,
    };

    try {
      const response = await fetch(`/api/updateUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include JWT cookie
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        setIsEditing(false);
        // Optionally redirect to dashboard
        // router.push("/");
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
          credentials: "include", // Include JWT cookie
          body: JSON.stringify({ image: base64 }),
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          console.error(uploadData.error);
          return;
        }

        const { imageUrl, public_id } = uploadData;
        setImage_url(imageUrl);
        setPublicId(public_id);

        // Update user profile with new image
        await fetch(`/api/updateUser/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
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

      } catch (err) {
        console.error('Upload error:', err);
      }
    };

    reader.readAsDataURL(file);
  };

  const deletePhoto = async () => {
    try {
      if (publicId) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ public_id: publicId }),
        });
      }

      await fetch(`/api/updateUser/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          full_name: fullName,
          date_of_birth: dob,
          phone,
          email,
          address,
          image_url: "",
          public_id: "",
        }),
      });

      setImage_url("");
      setPublicId("");
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  const handleChangePassword = async () => {
    setError("");
    if (!currentPassword || !newPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    try {
      const response = await fetch("/api/changePassword/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include JWT cookie
        body: JSON.stringify({ 
          id, 
          currentPassword, 
          newPassword 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to change password");
        return;
      }

      alert("Password changed successfully");
      setPasswordDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setError(""); // Clear any previous errors
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

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/deleteUser/${id}`, {
        method: "DELETE",
        credentials: "include", // Include JWT cookie
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Delete failed:", data);
        alert("Failed to delete: " + (data.error || "Unknown error"));
        return;
      }

      // Account deleted successfully, redirect to signup
      router.push("/signup");
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Error deleting account");
    }
  };

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("")
    : "👤";

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
                accept="image/*"
                onChange={(e) => {
                  handleImageUpload(e);
                  handleClose();
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
              disabled: true, // ID should not be editable
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
          ].map(({ label, value, setter, type, disabled = false }) => (
            <div key={label}>
              <label className="font-semibold">{label}</label>
              {isEditing && !disabled ? (
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="block w-full border px-4 py-2 mt-1 rounded"
                  required={label !== "Address"} // Make address optional
                />
              ) : (
                <p className="mt-1 text-gray-700">
                  {label === "Date of Birth" && value 
                    ? formatDateForDisplay(new Date(value).toISOString())
                    : value || "Not specified"
                  }
                </p>
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
            onClick={() => {
              setPasswordDialogOpen(false);
              setError("");
              setCurrentPassword("");
              setNewPassword("");
            }}
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