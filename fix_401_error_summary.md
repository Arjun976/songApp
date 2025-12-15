I've identified and fixed the cause of the `401 Unauthorized` error.

There was a mismatch in how authentication was handled between the frontend and the backend. The backend expects an `Authorization: Bearer <token>` header, but some parts of the frontend were sending an `x-auth-token` header instead.

I have corrected this in the following files:
1.  `Fr/src/api/payments.js` (which was causing your immediate error)
2.  `Fr/src/api/songs.js` (which would have caused similar errors for actions like rating or commenting on songs)

With these changes, the `401` error should be resolved. Please ensure you are logged in, and try the payment process again.