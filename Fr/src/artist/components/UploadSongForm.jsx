// artist/components/UploadSongForm.jsx
import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { FaUpload, FaMusic, FaImage } from "react-icons/fa";
import { uploadSong } from "../../api/admin"; // Import the uploadSong API call
import Toast from "../../components/common/Toast";


const UploadSongForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    title: "", genre: "", price: 0, isPremium: false
  });
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setToast(null);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("genre", form.genre);
    formData.append("isPremium", form.isPremium);
    formData.append("price", form.price);
    formData.append("audio", audioFile);
    formData.append("cover", coverFile);

    try {
      await uploadSong(formData);
      onSuccess?.();
    } catch (error) {
      console.error("Upload error:", error);
      setToast({ message: error.response?.data?.message || "Upload failed", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Audio Upload */}
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-purple-500 transition">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            className="hidden"
            id="audio"
          />
          <label htmlFor="audio" className="cursor-pointer">
            <FaMusic className="mx-auto text-4xl text-purple-400 mb-3" />
            <p className="text-gray-400">
              {audioFile ? audioFile.name : "Click to upload audio"}
            </p>
          </label>
        </div>

        {/* Cover Art */}
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-purple-500 transition">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            className="hidden"
            id="cover"
          />
          <label htmlFor="cover" className="cursor-pointer">
            <FaImage className="mx-auto text-4xl text-purple-400 mb-3" />
            <p className="text-gray-400">
              {coverFile ? coverFile.name : "Click to upload cover"}
            </p>
          </label>
        </div>
      </div>

      <Input
        label="Song Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Midnight Dreams"
        required
      />

      <Input
        label="Genre"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
        placeholder="Electronic, Hip Hop, Pop..."
        required
      />

      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={form.isPremium}
          onChange={(e) => setForm({ ...form, isPremium: e.target.checked })}
          className="w-5 h-5 text-purple-600"
        />
        <label className="text-white">Premium Download (Paid)</label>
      </div>

      {form.isPremium && (
        <Input
          label="Price ($)"
          type="number"
          min="0.99"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="1.99"
        />
      )}

      <Button type="submit" loading={uploading} className="w-full">
        <FaUpload className="mr-2" /> Upload Song
      </Button>
    </form>
  );
};

export default UploadSongForm;