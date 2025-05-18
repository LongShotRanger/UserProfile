# Trek Rental User Profile App

This is a simple Next.js app for managing user profiles, preferences, and viewing rental history.

## 🚀 Features

- View and edit user profile (name, phone, bio, photo)
- Toggle preferences like Dark Mode and Email Notifications
- View rental history with order details
- Change password form with validation

## 🛠️ Tech Stack

- Next.js 13+ (App Router)
- React (Client Components)
- Tailwind CSS
- Deployed on Vercel

## 📁 Folder Structure
/app
/profile
page.tsx # Main Profile page
change-password.tsx # Optional password form
/rentals
page.tsx # Rental history
/lib
mockData.ts # Mock user & rental data

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/trek-profile-app.git
cd trek-profile-app

Install Dependencies
npm install
# or
yarn

Run Locally

npm run dev
# or
yarn dev

Visit http://localhost:3000/profile to view the profile page.
📦 Deployment

This project is ready to deploy to Vercel:

    Push your code to GitHub.

    Go to vercel.com and import your GitHub repo.

    Vercel auto-detects Next.js and deploys it for free.

📌 Notes

    This is a frontend-only project.

    All data is from mockData.ts and not persisted.

    For real-world apps, integrate with a backend and authentication.

📸 Preview

    Optional: Add screenshots or a Loom demo here

🧠 Decisions Made

    Used local state to mock update/save functionality.

    Profile image is preview-only and not editable in this version.

    Used basic Tailwind CSS instead of component libraries for control and simplicity.

🙌 Credits

Built by Vimlesh Rawat
=======
# UserProfile
>>>>>>> f7970d05dbbcf7c42ee5cc85618ef416beb59e51
