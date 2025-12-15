import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaDownload, FaMusic, FaHeart, FaSave, FaTimes } from "react-icons/fa";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getUserStats, updateUserProfile } from "../../api/users";
import Input from "../../components/ui/Input";

const UserProfile = () => {
  const { user, updateUser, loading: authLoading } = useContext(AuthContext);
  const [stats, setStats] = useState({
    playlists: 0,
    downloads: 0,
    favorites: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  console.log('UserProfile Rendered with user:', user);
x
  useEffect(() => {

    if (user) {
      setFormData({ name: user.name, bio: user.bio || "" });
      setPreview(user.profilePicture);
    }
  }, [user]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStats = await getUserStats();
        setStats(userStats);
      } catch (error) {
        console.error("Failed to fetch user stats", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({ name: user.name, bio: user.bio || "" });
      setPreview(user.profilePicture);
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    if (file) {
      data.append("profilePicture", file);
    }

    // Log FormData contents for debugging
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const updatedUser = await updateUserProfile(data);
      updateUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Card>
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16">
              <Avatar src={preview || "/api/placeholder/100/100"} alt={user.name} size="lg" />
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <input type="file" id="profilePicture" className="hidden" onChange={handleFileChange} accept="image/*"/>
                  <label htmlFor="profilePicture" className="bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700">
                    <FaEdit/>
                  </label>
                </div>
              )}
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-4">
                  <Input name="name" value={formData.name} onChange={handleChange} className="text-black"/>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Your bio" className="w-full bg-gray-800 text-white rounded p-2" />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="text-gray-300 mt-2">{user.bio || "No bio yet."}</p>
                </div>
              )}
               <div className="mt-4 flex gap-2">

                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm" >
                      <FaSave className="mr-1" /> Save Changes
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleEditToggle}>
                      <FaTimes className="mr-1" /> Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleEditToggle}>
                    <FaEdit className="mr-1" /> Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8 text-center">
            <div className="bg-black/40 p-4 rounded-lg">
              <FaMusic className="text-2xl text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.playlists}</p>
              <p className="text-sm text-gray-400">Playlists</p>
            </div>
            <div className="bg-black/40 p-4 rounded-lg">
              <FaDownload className="text-2xl text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.downloads}</p>
              <p className="text-sm text-gray-400">Downloads</p>
            </div>
            <div className="bg-black/40 p-4 rounded-lg">
              <FaHeart className="text-2xl text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.favorites}</p>
              <p className="text-sm text-gray-400">Favorites</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;