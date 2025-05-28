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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setId(data.id || "");
        setFullName(data.full_name || "");
        setDob(data.date_of_birth || "");
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
        setImage_url(data.image_url || "");
        setPublicId(data.public_id || "");
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      full_name: fullName,
      date_of_birth: dob,
      phone,
      email,
      address,
      image_url,
      public_id: publicId,
    };

    try {
      const response = await fetch(`/api/updateUser/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        router.push("/");
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
        const uploadRes = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

        await fetch(`/api/updateUser/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
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
        console.error("Upload error:", err);
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
          body: JSON.stringify({ public_id: publicId }),
        });
      }

      await fetch(`/api/updateUser/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
      setError("New password must be different.");
      return;
    }

    try {
      const response = await fetch("/api/changePassword/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Password change failed");
        return;
      }

      setPasswordDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Server error");
    }
  };

  const handleDeleteAccount = async () => {
    if (!id) return alert("Missing ID");

    try {
      const res = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Failed to delete: " + data.error);
        return;
      }

      router.push("/signup");
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Error deleting account");
    }
  };

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("")
    : "👤";

  return (
    <div className="p-6 bg-gradient-to-b from-[#e0f7fa] to-white min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        <div className="flex justify-center">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="large">
            {image_url ? (
              <Avatar src={image_url} sx={{ width: 64, height: 64 }} />
            ) : (
              <Avatar sx={{ width: 64, height: 64 }}>{initials}</Avatar>
            )}
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem component="label">
              Upload Photo
              <input type="file" hidden onChange={(e) => { handleImageUpload(e); setAnchorEl(null); }} />
            </MenuItem>
            <MenuItem onClick={() => { deletePhoto(); setAnchorEl(null); }}>Delete Photo</MenuItem>
            <MenuItem onClick={() => { setPasswordDialogOpen(true); setAnchorEl(null); }}>Change Password</MenuItem>
            <MenuItem onClick={() => { handleLogout(); setAnchorEl(null); }}>Logout</MenuItem>
            <MenuItem onClick={() => { handleDeleteAccount(); setAnchorEl(null); }}>
              <p className="text-red-500">Delete Account</p>
            </MenuItem>
          </Menu>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: "ID", value: id, setter: setId, type: "text", disabled: true },
            { label: "Full Name", value: fullName, setter: setFullName, type: "text" },
            { label: "Date of Birth", value: dob, setter: setDob, type: "date" },
            { label: "Phone Number", value: phone, setter: setPhone, type: "text" },
            { label: "Email", value: email, setter: setEmail, type: "email" },
            { label: "Address", value: address, setter: setAddress, type: "text" },
          ].map(({ label, value, setter, type, disabled }) => (
            <div key={label}>
              <label className="font-semibold">{label}</label>
              {isEditing && !disabled ? (
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
