import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Globe,
  LogOut,
  Edit2,
  Save,
  X,
  AlertCircle,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  role: "patient" | "doctor" | "pharma";
  joinDate: string;
  language: "en" | "hi";
}

export default function Profile() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "patient";
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: userName,
    email: userEmail,
    phone: "+1 (555) 000-0000",
    role: (userRole as any) || "patient",
    joinDate: "2024-01-01",
    language: "en",
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    localStorage.setItem("userName", editedProfile.fullName);
    localStorage.setItem("userEmail", editedProfile.email);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      alert("Password changed successfully!");
      setShowPasswordDialog(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    navigate("/register");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "patient":
        return "bg-blue-500/10 text-blue-700";
      case "doctor":
        return "bg-green-500/10 text-green-700";
      case "pharma":
        return "bg-orange-500/10 text-orange-700";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground font-roboto">Profile</h1>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="gap-2"
              >
                <Edit2 size={18} />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Avatar and Basic Info */}
          <div className="bg-card border border-border rounded-lg p-6 shadow mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground font-roboto">
                  {profile.fullName}
                </h2>
                <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full capitalize ${getRoleBadgeColor(profile.role)}`}>
                  {profile.role}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Mail className="text-muted-foreground" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, email: e.target.value })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground">{profile.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Phone className="text-muted-foreground" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, phone: e.target.value })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground">{profile.phone}</p>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <User className="text-muted-foreground" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={editedProfile.fullName}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, fullName: e.target.value })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground">{profile.fullName}</p>
                  )}
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Heart className="text-muted-foreground" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-foreground">{profile.joinDate}</p>
                </div>
              </div>

              {/* Language */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Globe className="text-muted-foreground" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Language</p>
                  {isEditing ? (
                    <select
                      value={editedProfile.language}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          language: e.target.value as "en" | "hi",
                        })
                      }
                      className="mt-1 w-full border border-border rounded-lg p-2 bg-card"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi (हिंदी)</option>
                    </select>
                  ) : (
                    <p className="text-foreground">
                      {profile.language === "en" ? "English" : "Hindi"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedProfile(profile);
                  }}
                  className="flex-1 gap-2"
                >
                  <X size={18} />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Security Section */}
          <h2 className="text-lg font-semibold text-foreground mb-4 font-roboto">
            Security & Settings
          </h2>

          <div className="space-y-3 mb-6">
            {/* Change Password */}
            <button
              onClick={() => setShowPasswordDialog(true)}
              className="w-full bg-card border border-border rounded-lg p-4 flex items-center gap-3 hover:border-primary transition-all"
            >
              <Lock className="text-primary" size={20} />
              <div className="text-left flex-1">
                <p className="font-semibold text-foreground">Change Password</p>
                <p className="text-xs text-muted-foreground">
                  Update your account password
                </p>
              </div>
            </button>

            {/* Health Records */}
            <button className="w-full bg-card border border-border rounded-lg p-4 flex items-center gap-3 hover:border-primary transition-all">
              <Heart className="text-primary" size={20} />
              <div className="text-left flex-1">
                <p className="font-semibold text-foreground">Medical History</p>
                <p className="text-xs text-muted-foreground">
                  View your health records
                </p>
              </div>
            </button>

            {/* Notification Settings */}
            <button className="w-full bg-card border border-border rounded-lg p-4 flex items-center gap-3 hover:border-primary transition-all">
              <AlertCircle className="text-primary" size={20} />
              <div className="text-left flex-1">
                <p className="font-semibold text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Manage notification preferences
                </p>
              </div>
            </button>
          </div>

          {/* Account Actions */}
          <h2 className="text-lg font-semibold text-foreground mb-4 font-roboto">
            Account Actions
          </h2>

          <div className="space-y-3">
            {/* Logout */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full gap-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </Button>

            {/* Delete Account */}
            <Button
              onClick={() => setShowDeleteDialog(true)}
              variant="outline"
              className="w-full gap-2 border-destructive text-destructive hover:bg-destructive/10"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-foreground mb-2">
                New Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-destructive">Passwords do not match</p>
            )}

            {newPassword && newPassword.length < 6 && (
              <p className="text-xs text-yellow-600">
                Password must be at least 6 characters
              </p>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordDialog(false);
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                disabled={
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword ||
                  newPassword.length < 6
                }
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Change Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-destructive">
              ⚠️ You are about to delete your account permanently. Please confirm if you
              want to proceed.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
            >
              Delete Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
