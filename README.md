# Student Hub

Student Hub is a social media platform designed exclusively for students of Kebbi State University. It provides a platform for students to connect, share information, and engage with each other within the campus community.

## Features

- **Post Creation**: Students can create posts to share updates, ask questions, or discuss topics.
- **Comments**: Users can comment on posts to engage in discussions.
- **Likes**: Show appreciation for posts by liking them.
- **Real-time Chat**: Private messaging feature for one-on-one conversations between students.
- **Profile Customization**: Students can customize their profiles with profile pictures and information.

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Chakra UI
- **Backend**:
  - Firebase Authentication for user authentication
  - Firebase Firestore for database
  - Firebase Storage for storing user images

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/python-fuse/studentHub.git
   ```
2. Install dependencies:
   ```bash
   cd studentHub
   npm install
   ```
3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Set up Firebase Authentication, Firestore, and Storage services.
4. Set up Firebase configuration:
   - Copy your Firebase config object from Firebase Console.
   - Create a `.env` file in the root directory and add your Firebase config:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```
5. Start the development server:
   ```bash
   npm start
   ```
6. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Firebase Setup

1. Authentication:
   - Enable Email/Password and Google Sign-In methods.
   - Set up Firestore security rules for user authentication.

2. Firestore Database:
   - Create a collection named `users`.
   - Create a subcollection named `posts` under each user document.

3. Storage:
   - Create a folder named `user-profile-images` for storing user profile pictures.


## Contributors

- Umar Muhammad(https://github.com/python-fuse)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---
 or need further assistance, please let me know!
