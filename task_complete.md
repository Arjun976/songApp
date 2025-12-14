## Profile Editing and Profile Picture Feature

This task involved implementing profile editing functionality for all user roles (user, artist, and admin), including the ability to upload a profile picture.

### Backend

- **User Model:** The `User` model was extended to include `profilePicture` (String) and `bio` (String) fields.
- **API Endpoint:** A new `PUT /api/users/profile` endpoint was created to handle profile updates.
- **Controller:** The `userController` was updated with an `updateProfile` function that handles updating the user's name, bio, and profile picture.
- **Image Uploads:** The backend was configured to use Cloudinary for image storage, with `multer` and `multer-storage-cloudinary` to handle file uploads.

### Frontend

- **User Profile Page:** The `UserProfile` component was updated to include an "Edit Profile" mode, allowing users to update their name, bio, and profile picture.
- **Artist Profile Page:** The `ArtistProfilePage` was updated to provide a similar profile editing experience for artists.
- **Admin Settings Page:** The profile editing functionality was removed from the `SettingsPage` in the admin dashboard at the user's request.
- **API Integration:** A new `updateUserProfile` function was added to the frontend API to communicate with the backend. This function sends the updated profile data, including the profile picture, as `multipart/form-data`.
- **UI/UX:** The UI for each profile page was updated to include forms for editing, file inputs for image uploads, and previews for selected images. The user's profile picture is now displayed in the avatar component.
- **State Management:** The `AuthContext` is now updated with the new user information after a successful profile update, ensuring the changes are reflected across the application without a page reload.

## Admin Dashboard Features

This task involved adding new features to the admin dashboard to improve the management of songs and users.

### Song Management

- **View All Songs:** The admin dashboard now includes a "Manage Songs" page that displays a list of all songs in the database.
- **Delete Songs:** Admins have the ability to delete any song directly from the "Manage Songs" page. A confirmation dialog is shown before deleting a song to prevent accidental deletions.

### User Management

- **View All Users:** The "Users" page in the admin dashboard now displays a list of all users, including their roles and status.
- **Ban/Unban Users:** Admins can ban or unban users from the "Users" page. The user's status is updated in real-time. As a security measure, admins cannot ban other admins or themselves.
- **Delete Users:** Admins can permanently delete users from the database. A confirmation dialog is shown to prevent accidental deletions. As a security measure, admins cannot delete other admins or themselves.

## Bug Fixes

This task involved fixing several issues related to the profile editing functionality.

- **Misplaced Profile Picture Button:** The button for uploading a new profile picture was misplaced. This was fixed by wrapping the `Avatar` component and the upload button in a `div` with a `relative` position and a fixed size, ensuring the button is positioned correctly over the avatar.
- **"Edit Profile" Not Working:** The user's profile information was not being saved correctly. This was a two-part issue:
    1.  **UI Not Updating:** The UI was not reflecting the changes after a profile update. This was resolved by creating a new `updateUser` function in the `AuthContext` that updates both the user state and the `localStorage`, ensuring that profile changes are persisted.
    2.  **Server Error:** The `PUT /api/users/profile` endpoint was returning a 500 Internal Server Error. This was caused by a faulty `pre('save')` middleware in the `User` model. The middleware was updated to use the `next()` function correctly, resolving the server error.