// App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import HomePage from "./user/pages/HomePage";
import SongDetailPage from "./user/pages/SongDetailPage";
import SearchResultsPage from "./user/pages/SearchResultsPage";
import UserProfile from "./user/pages/UserProfile";
import PlaylistsPage from "./user/pages/PlaylistsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/song/:id" element={<SongDetailPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/playlists" element={<PlaylistsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Add other routes for user, artist, admin */}
    </Routes>
  );
}

export default App;