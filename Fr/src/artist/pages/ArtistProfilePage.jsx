import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { AuthContext } from "../../context/AuthContext";
import { updateUserProfile } from "../../api/users";
import { FaEdit } from "react-icons/fa";

const ArtistProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, bio: user.bio || "" });
      setPreview(user.profilePicture);
    }
  }, [user]);

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

    try {
      const updatedUser = await updateUserProfile(data);
      updateUser(updatedUser);
      // Maybe show a success toast
    } catch (error) {
      console.error("Failed to update profile", error);
      // Maybe show an error toast
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-400 text-center">Edit Profile</h1>

        <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Avatar src={preview || "/api/placeholder/128/128"} alt={formData.name} size="xl" />
            <div className="absolute bottom-0 right-0">
                <input type="file" id="profilePicture" className="hidden" onChange={handleFileChange} accept="image/*"/>
                <label htmlFor="profilePicture" className="bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700">
                  <FaEdit/>
                </label>
              </div>
          </div>

          <div className="space-y-6">
            <Input label="Artist Name" name="name" value={formData.name} onChange={handleChange} className="text-black"/>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell your story..."
              className="w-full bg-gray-800 text-white rounded p-2 h-32"
            />
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;