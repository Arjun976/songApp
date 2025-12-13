// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext";

// Layouts
import MainLayout from "./components/layout/MainLayout";        // ← NEW: Navbar + user pages
import ArtistLayout from "./artist/components/ArtistLayout";
import AdminLayout from "./admin/components/AdminLayout";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NotFound from "./pages/NotFound";

// User Pages
import HomePage from "./user/pages/HomePage";
import SongDetailPage from "./user/pages/SongDetailPage";
import SearchResultsPage from "./user/pages/SearchResultsPage";
import UserProfile from "./user/pages/UserProfile";
import PlaylistsPage from "./user/pages/PlaylistsPage";
import PlaylistDetailPage from "./user/pages/PlaylistDetailPage";
import PlayerPage from "./pages/PlayerPage"; // Import PlayerPage
import PublicArtistProfilePage from "./user/pages/PublicArtistProfilePage";

// Artist Pages
import ArtistDashboard from "./artist/pages/ArtistDashboard";
import UploadPage from "./artist/pages/UploadPage";
import MySongsPage from "./artist/pages/MySongsPage";
import EarningsPage from "./artist/pages/EarningsPage";
import ArtistProfilePage from "./artist/pages/ArtistProfilePage";

// Admin Pages
import AdminDashboard from "./admin/pages/AdminDashboard";
import UsersPage from "./admin/pages/UsersPage";
import SongsPage from "./admin/pages/SongsPage";
import RevenuePage from "./admin/pages/RevenuePage";
import SettingsPage from "./admin/pages/SettingsPage";

function App() {
  return (
    <MusicProvider>
      <Routes>
        {/* ==================== USER PAGES (with Navbar) ==================== */}
        <Route element={<MainLayout userRole="user" />}>
          
          <Route path="/home" element={<HomePage />} />
          <Route path="/song/:id" element={<SongDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="/player" element={<PlayerPage />} /> 
          <Route path="/artist/:id" element={<PublicArtistProfilePage />} />
        </Route>

        {/* ==================== ARTIST PANEL (own sidebar) ==================== */}
        <Route path="/dashboard" element={<ArtistLayout />}>
          <Route index element={<ArtistDashboard />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="songs" element={<MySongsPage />} />
          <Route path="earnings" element={<EarningsPage />} />
          <Route path="profile" element={<ArtistProfilePage />} />
        </Route>

        {/* ==================== ADMIN PANEL (own sidebar) ==================== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="songs" element={<SongsPage />} />
          <Route path="revenue" element={<RevenuePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* ==================== AUTH PAGES (no Navbar) ==================== */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ==================== 404 ==================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MusicProvider>
  );
}

export default App;