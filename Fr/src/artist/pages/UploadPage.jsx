// artist/pages/UploadPage.jsx
import React, { useState } from "react";
import UploadSongForm from "../components/UploadSongForm";
import Toast from "../../components/common/Toast";

const UploadPage = () => {
  const [toast, setToast] = useState(null);

  const handleSuccess = () => {
    setToast({ message: "Song uploaded successfully!", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-400">Upload New Song</h1>
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-8">
          <UploadSongForm onSuccess={handleSuccess} />
        </div>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
};

export default UploadPage;