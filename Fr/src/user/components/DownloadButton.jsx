// components/user/DownloadButton.jsx
import React from "react";
import { FaDownload, FaLock } from "react-icons/fa";
import Button from "../../components/ui/Button";
import PaymentModal from "./PaymentModal";

const DownloadButton = ({ song, size = "md" }) => {
  const [showModal, setShowModal] = React.useState(false);

  if (!song.isPremium) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`http://localhost:5000/api/songs/${song._id}/download`}
        className="text-green-400 hover:text-green-300"
      >
        <FaDownload />
      </a>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size={size === "icon" ? "sm" : size}
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1"
      >
        <FaLock /> ${(song.price / 100).toFixed(2)}
      </Button>

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        song={song}
      />
    </>
  );
};


export default DownloadButton;