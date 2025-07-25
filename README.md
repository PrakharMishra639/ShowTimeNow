# ShowTimeNow – Movie Booking Frontend 🎬

A modern movie booking application frontend built with **Next.js**, **Tailwind CSS**, **React Toastify**, and **TypeScript**.  
This interface allows users to explore movies, select seats, book tickets, and manage their profiles.

## Features

- Browse movies by city and category
- Select movie timings and available seats
- Secure JWT-based authentication
- Responsive and dynamic UI using Tailwind CSS
- Toast notifications using React Toastify
- Integrated movie carousel and date picker
- Fully typed with TypeScript

## Tech Stack

**Frontend:**

- Next.js v14
- TypeScript
- Tailwind CSS
- React v18
- React Icons
- React Select
- SwiperJS
- React Toastify
- React Horizontal Date Picker

## 📁 Folder Structure

```
showtimenow/
├── app/
│   ├── [cityname]/buytickets/
│   ├── auth/
│   │   ├── signin/
│   │   └── signup/
│   ├── profile/
│   └── page.tsx
├── assets/
├── components/
│   ├── Footer/
│   ├── HomeSlider/
│   └── MovieCarousel/
├── popups/
├── types/
├── styles/
│   ├── globals.css
├── public/
│   ├── favicon.ico
├── .env.local
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PrakharMishra639/ShowTimeNow.git
cd ShowTimeNow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env.local` file and add required environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=<your_backend_api_url>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be running at `http://localhost:3000`.

## 🔗 Related Repositories

- [ShowTimeNow Backend](https://github.com/PrakharMishra639/ShowTimeNow_Backend)
- [ShowTimeNow Admin Panel](https://github.com/PrakharMishra639/ShowTimeNow_AdminPanel)

## 👨‍💻 Author

**Prakhar Mishra**

- GitHub: [@PrakharMishra639](https://github.com/PrakharMishra639)
- LinkedIn: [prakhar-mishra123](https://linkedin.com/in/prakhar-mishra123)
- Email: mprakhar713@gmail.com
