# HubX News App

A modern and user-friendly news application. This app allows you to view, search, and add current news to your favorites.

## 🚀 Features

- **Latest News**: View the most current news integrated with News API
- **Search Function**: Search news by keywords
- **Favorites**: Add and manage news in favorites
- **Responsive Design**: Perfect viewing on all devices
- **Dark Mode**: Dark theme support to reduce eye strain
- **Modern UI**: Stylish and modern interface with Tailwind CSS and Shadcn UI
- **Authentication**: User authentication system with NextAuth.js
- **Protected Routes**: Access control for authenticated users
- **User Profile**: Personal profile page for authenticated users

## 🛠️ Technologies

- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **RTK Query**: API requests
- **Tailwind CSS**: Styling and design
- **Shadcn UI**: Component library
- **Framer Motion**: Animations
- **News API**: News data
- **NextAuth.js**: Authentication system

## 📋 Requirements

- Node.js 18.0.0 or higher
- npm or yarn
- News API key (you can get it for free from [https://newsapi.org/](https://newsapi.org/))

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CotNeo/news-app.git
   cd news-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file and add your News API key:

   ```
   NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
   ```

4. Start the application:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Go to [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Home Page

The home page contains a general introduction to the application and its features. From here, you can easily access other pages.

### News Page

On the news page, the latest news is listed. You can use the search bar to search for news on specific topics. You can view details or add to favorites by clicking on each news item.

### Favorites Page

On the favorites page, you can view and manage the news you've saved. You can remove a news item from your favorites by clicking the "Remove from Favorites" button.

### Authentication

The application includes a complete authentication system:

- **Sign In**: Users can sign in with username and password
- **Profile Page**: Authenticated users can access their profile page
- **Protected Routes**: Certain routes are only accessible to authenticated users
- **User Menu**: The header displays different options based on authentication status

For demo purposes, you can use the following credentials:
- Username: admin
- Password: 123456

## 🧩 Project Structure

```
news-app/
├── public/             # Static files
├── src/                # Source code
│   ├── app/            # Next.js page components
│   │   ├── auth/       # Authentication pages
│   │   ├── profile/    # User profile pages
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   ├── redux/          # Redux store and slices
│   ├── services/       # API services
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
├── .env.local          # Environment variables
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🔄 API Usage

The application uses News API to fetch news. API requests are managed with RTK Query and defined in the `src/services/api.ts` file.

In case the API doesn't work, the application automatically switches to mock data, so the user experience is not interrupted.

### 📢 API Usage in Vercel Environment

In the Vercel environment, **mockup data is used because News API is paid**. There are mockup data in **`src/services/api.ts`** instead of real news data. Therefore, the application works without an API key in the live environment, but real news data is not displayed.

🔗 **Live Demo:** [HubX News App Vercel](https://news-2r1030j1v-cotneos-projects.vercel.app/news)

## 🌍 Project Purpose

This project was developed for the **HubX frontend developer position**. The application has been developed using modern frontend technologies, with a focus on performance and user experience.

## 🌙 Dark Mode

The application automatically applies dark or light theme according to user preferences. You can use the theme button in the upper right corner to change the theme.

## 🤝 Contributing

We welcome your contributions! Please follow these steps:

1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions or feedback, please send an email to furkanaliakar@gmail.com or open an issue on GitHub.

---

Stay informed about current news with HubX News App! 📰✨

## BONUS

(https://www.youtube.com/watch?v=pzrTT8g1mK0)

If it's suitable for you, I would like to update the Navbar. :) :)

