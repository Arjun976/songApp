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
import AdminDashboard from "./admin/pages/AdminDashboard";
import UsersPage from "./admin/pages/UsersPage";
import SongsPage from "./admin/pages/SongsPage";
import RevenuePage from "./admin/pages/RevenuePage";
import SettingsPage from "./admin/pages/SettingsPage";
import AdminLayout from "./admin/components/AdminLayout";
import ArtistDashboard from "./artist/pages/ArtistDashboard";
import UploadPage from "./artist/pages/UploadPage";
import MySongsPage from "./artist/pages/MySongsPage";
import EarningsPage from "./artist/pages/EarningsPage";
import ArtistProfilePage from "./artist/pages/ArtistProfilePage";
import ArtistLayout from "./artist/components/ArtistLayout";

function App() {
  return (
    <Routes>
     {/* Artist */}
  <Route path="/artist" element={<ArtistLayout />}>
    <Route index element={<ArtistDashboard />} />
    <Route path="upload" element={<UploadPage />} />
    <Route path="songs" element={<MySongsPage />} />
    <Route path="earnings" element={<EarningsPage />} />
    <Route path="profile" element={<ArtistProfilePage />} />
  </Route>

  {/* Admin */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<UsersPage />} />
    <Route path="songs" element={<SongsPage />} />
    <Route path="revenue" element={<RevenuePage />} />
    <Route path="settings" element={<SettingsPage />} />
  </Route>

      {/* User Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/song/:id" element={<SongDetailPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/playlists" element={<PlaylistsPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;