# 🍔 Foodies - Food Recipe Sharing Platform

A modern food recipe sharing platform built with Next.js, allowing users to browse delicious meals and share their own recipes with the community.

## 🌐 Live Demo

**[View Live Application →](https://foodies-nine-pi.vercel.app/)**

Experience the app in action: [https://foodies-nine-pi.vercel.app/](https://foodies-nine-pi.vercel.app/)

## 📋 Table of Contents

- [Live Demo](#live-demo)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [API Routes & Server Actions](#api-routes--server-actions)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Environment](#environment)
- [Contributing](#contributing)

## 🎯 Overview

Foodies is a full-stack web application that enables food enthusiasts to:

- Discover and browse a variety of meal recipes
- View detailed cooking instructions and ingredients
- Share their own recipes with the community
- Upload images for their meal creations

## ✨ Features

### User Features

- **Browse Meals**: View a grid of available meals with images and summaries
- **Meal Details**: Access detailed information including:
  - Title and description
  - Step-by-step cooking instructions
  - Creator information
  - High-quality meal images
- **Share Recipe**: Submit your own recipes via an interactive form
- **Image Upload**: Upload meal images with automatic file handling
- **Community Page**: Connect with other food enthusiasts

### Technical Features

- **Server-Side Rendering (SSR)**: Fast page loads with Next.js
- **Server Actions**: Form submissions without API routes
- **SQLite Database**: Persistent storage with better-sqlite3
- **Image Optimization**: Automatic image processing and storage
- **XSS Protection**: Sanitized user inputs
- **URL Slug Generation**: SEO-friendly URLs
- **Form Validation**: Server-side validation for all inputs
- **Revalidation**: Automatic cache invalidation on new submissions

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 14.0.3
- **React**: v18
- **CSS**: CSS Modules for component styling

### Backend

- **Runtime**: Node.js
- **Database**: SQLite with better-sqlite3
- **Form Handling**: Next.js Server Actions

### Security & Utilities

- **XSS Protection**: xss (v1.0.15) - Sanitizes HTML inputs
- **Slug Generation**: slugify (v1.6.6) - Creates URL-friendly slugs
- **Validation**: Custom server-side validation

### Development Tools

- **ESLint**: Code linting with Next.js config
- **Dev Server**: Next.js built-in dev server

## 📁 Project Structure

```
foodies/
├── app/                          # Next.js App Router
│   ├── community/               # Community page
│   ├── meals/                   # Meals-related pages
│   │   ├── [mealSlug]/         # Dynamic meal detail pages
│   │   └── share/              # Share recipe page
│   ├── layout.js               # Root layout
│   ├── page.js                 # Home page
│   ├── globals.css             # Global styles
│   └── not-found.jsx           # 404 page
├── components/                  # Reusable components
│   ├── images/                 # Image-related components
│   ├── main-header/            # Navigation header
│   ├── meals/                  # Meal-specific components
│   ├── meal-item.jsx           # Individual meal card
│   └── meals-grid.jsx          # Meal grid layout
├── lib/                        # Utility functions
│   ├── actions.jsx             # Server actions
│   └── meals.js                # Database operations
├── public/                     # Static assets
│   └── images/                 # Meal images
├── initdb.js                   # Database initialization
├── meals.db                    # SQLite database
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd foodies
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Initialize the database**

   ```bash
   node initdb.js
   ```

   This creates the `meals.db` SQLite database and populates it with sample meals.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Development Mode

```bash
npm run dev
```

Starts the development server at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🗄 Database Schema

### Meals Table

| Column        | Type    | Constraints                | Description             |
| ------------- | ------- | -------------------------- | ----------------------- |
| id            | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique meal identifier  |
| slug          | TEXT    | NOT NULL, UNIQUE           | URL-friendly identifier |
| title         | TEXT    | NOT NULL                   | Meal name               |
| image         | TEXT    | NOT NULL                   | Image path              |
| summary       | TEXT    | NOT NULL                   | Brief description       |
| instructions  | TEXT    | NOT NULL                   | Cooking steps           |
| creator       | TEXT    | NOT NULL                   | Creator name            |
| creator_email | TEXT    | NOT NULL                   | Creator email           |

### Sample Data

The database comes pre-populated with 7 delicious meals:

- Juicy Cheese Burger
- Spicy Curry
- Homemade Dumplings
- Classic Mac n Cheese
- Authentic Pizza
- Wiener Schnitzel
- Fresh Tomato Salad

## 🔧 API Routes & Server Actions

### Database Functions (`lib/meals.js`)

#### `getMeals()`

```javascript
export async function getMeals()
```

- **Returns**: Array of all meals
- **Purpose**: Fetch all meals from database
- **Note**: Includes 2-second delay for demonstration

#### `getMeal(slug)`

```javascript
export function getMeal(slug)
```

- **Parameters**: `slug` - Unique meal identifier
- **Returns**: Single meal object
- **Purpose**: Fetch specific meal by slug

#### `addMeal(meal)`

```javascript
export async function addMeal(meal)
```

- **Parameters**: `meal` - Meal object with form data
- **Purpose**: Add new meal to database
- **Features**:
  - Generates slug from title
  - Sanitizes instructions (XSS protection)
  - Saves image to `/public/images/`
  - Inserts meal into database

### Server Actions (`lib/actions.jsx`)

#### `shareMeal(prevState, formData)`

```javascript
export async function shareMeal(prevState, formData)
```

- **Purpose**: Handle recipe submission form
- **Validation**:
  - All text fields required
  - Email must contain '@'
  - Image must be provided and non-empty
- **Returns**: Error object or redirects to meals page
- **Side Effects**: Revalidates `/meals` path

## 📜 Scripts

| Script | Command         | Description              |
| ------ | --------------- | ------------------------ |
| dev    | `npm run dev`   | Start development server |
| build  | `npm run build` | Create production build  |
| start  | `npm start`     | Start production server  |
| lint   | `npm run lint`  | Run ESLint               |

## 🌐 Environment

### Node Environment

- **Development**: Auto-detected by Next.js
- **Production**: Set via `NODE_ENV=production`

### File Storage

- Images are stored in `public/images/`
- Database file: `meals.db` (SQLite)

## 🔒 Security Features

1. **XSS Protection**: All user-submitted instructions are sanitized using the `xss` library
2. **Server-Side Validation**: All form inputs validated before database insertion
3. **Email Validation**: Basic email format checking
4. **File Upload Validation**: Image size and presence verification
5. **SQL Injection Prevention**: Parameterized queries with better-sqlite3

## 🎨 Styling

- **CSS Modules**: Component-scoped styling
- **Global Styles**: `app/globals.css`
- **Responsive Design**: Mobile-friendly layouts

## 🚀 Deployment

### Vercel (Production)

This application is deployed on [Vercel](https://vercel.com), the platform built by the creators of Next.js.

**Live URL**: [https://foodies-nine-pi.vercel.app/](https://foodies-nine-pi.vercel.app/)

#### Why Vercel?

- **Zero Configuration**: Automatic Next.js detection and optimization
- **Server Actions Support**: Full support for Next.js server actions
- **Database Compatibility**: Works seamlessly with SQLite and serverless functions
- **Automatic Deployments**: Every push to main branch triggers a new deployment
- **Edge Network**: Global CDN for fast content delivery
- **Free Tier**: Perfect for learning projects and small applications

#### Deploy Your Own

To deploy your own instance:

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will auto-detect Next.js and configure everything
5. Click "Deploy" and wait ~2 minutes
6. Your app will be live with a URL like `your-app.vercel.app`

#### Alternative Deployment Options

- **Netlify**: Similar to Vercel with good Next.js support
- **Railway**: For apps needing persistent databases
- **Self-hosted**: Use `npm run build` and `npm start` on any Node.js server

> **Note**: GitHub Pages is not suitable for this project as it only serves static files and cannot run Node.js servers, databases, or server actions.

## 🤝 Contributing

This is a learning project from the "Next 15 and React - The Complete Guide" course.

### Guidelines

1. Follow existing code structure
2. Maintain CSS Modules for styling
3. Use Server Actions for form handling
4. Validate all user inputs
5. Test locally before committing

## 📝 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Built as part of the "Next 15 and React - The Complete Guide" course
- Sample meal data provided by course materials

---

**Version**: 0.1.0  
**Last Updated**: December 2025
