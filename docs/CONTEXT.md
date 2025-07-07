# **📌 AI-Powered SaaS Idea Finder - App Flow & Features**

## **📖 Overview**

The AI-Powered SaaS Idea Finder helps users discover profitable SaaS ideas by retrieving posts from Reddit and filtering them using AI. The app provides features like authentication, idea exploration, search, filtering, saving ideas, and user profile management.

## **🚀 App Flow**

### **1️⃣ Authentication Flow**

- **User opens the app** → Sees the **Login/Signup screen**.
- **Login options:**
  - Google OAuth
  - GitHub OAuth
  - Email & password authentication
- **If the user is new:**
  - Registers via email/password or OAuth.
- **If the user forgets their password:**
  - Can reset via email.
- **Once logged in:**
  - Redirected to the **Dashboard (Home Screen)**.

---

### **2️⃣ Dashboard (Home Screen)**

#### **Core Functionalities:**

- Displays **AI-filtered SaaS ideas** in a scrollable list.
- **Trending & Latest ideas sections**.
- **Search bar** to quickly find ideas.
- **Filter options**:
  - **Industry** (e.g., FinTech, EdTech, HealthTech)
  - **Difficulty Level** (Beginner, Intermediate, Advanced)
  - **Monetization Model** (Subscription, Ads, One-time purchase)
- **Clicking on an idea** → Opens the **Idea Details Screen**.

---

### **3️⃣ Idea Details Screen**

#### **Core Functionalities:**

- Displays **full breakdown of the SaaS idea**, including:
  - Problem it solves
  - Market potential
  - Recommended tech stack
  - Difficulty level
  - Monetization model
- **Action buttons:**
  - **Save Idea** (Bookmark for later)
  - **Share Idea** (Copy link, social media, email)
  - **View original Reddit post**
- Users can return to the **Dashboard** or browse similar ideas.

---

### **4️⃣ Search & Filter Screen**

#### **Core Functionalities:**

- Users can **search** ideas by keyword.
- **Filter by:**
  - **Industry** (e.g., AI, SaaS, E-commerce, Productivity)
  - **Difficulty Level**
  - **Monetization Model**
- **Sort by:**
  - Trending
  - Newest
  - Best Potential
- Selecting an idea redirects to the **Idea Details Screen**.

---

### **5️⃣ Saved Ideas (My Ideas)**

#### **Core Functionalities:**

- Displays **list of bookmarked ideas**.
- Users can **remove ideas from the saved list**.
- Clicking on a saved idea opens the **Idea Details Screen**.

---

### **6️⃣ User Account Screen**

#### **Core Functionalities:**

- Users can **edit their profile details:**
  - Name
  - Email
  - Profile Picture
- **Change password** (if using email authentication)
- **Logout** option

---

## **🔹 Tech Stack**

Frontend: React Native with JavaScript, Expo, and Expo Router
Backend/Database: Supabase
UI Framework: React Native Paper
AI Processing: DeepSeek

---

## **📌 Summary of Key Features**

✅ **User Authentication** (Google, GitHub, Email, Forgot Password)
✅ **Dashboard with AI-curated SaaS ideas**
✅ **Search & Filter options**
✅ **Idea Details with market insights**
✅ **Save & Share Ideas**
✅ **User Profile Management**

---

## **🗄️ Database Schema**

### **Users Table**

```sql
users (
  id: uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email: text UNIQUE NOT NULL,
  full_name: text,
  avatar_url: text,
  created_at: timestamp with time zone DEFAULT now(),
  updated_at: timestamp with time zone DEFAULT now(),
  auth_provider: text DEFAULT 'email',
  provider_id: text
)
```

### **Ideas Table**

```sql
ideas (
  id: uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title: text NOT NULL,  -- Reddit post title
  user_question: text NOT NULL,  -- AI-summarized content
  full_pain_points: text NOT NULL,  -- Full Pain points
  goal: text NOT NULL,  -- Goal
  market_potential: text NOT NULL,  -- Market potential $$
  difficulty_level: text NOT NULL,  -- Difficulty level
  category: text NOT NULL,  -- Category
  reddit_url: text NOT NULL,  -- Original Reddit post link
  reddit_score: integer DEFAULT 0,
  created_at: timestamp with time zone DEFAULT now(),
  updated_at: timestamp with time zone DEFAULT now()
)
```

### **Saved Ideas Table**

```sql
saved_ideas (
  id: uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id: uuid REFERENCES users(id) ON DELETE CASCADE,
  idea_id: uuid REFERENCES ideas(id) ON DELETE CASCADE,
  created_at: timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, idea_id)
)
```

### **User Settings Table**

```sql
user_settings (
  id: uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id: uuid REFERENCES users(id) ON DELETE CASCADE,
  notification_preferences: jsonb DEFAULT '{"email": true, "push": true}',
  theme_preference: text DEFAULT 'light',
  created_at: timestamp with time zone DEFAULT now(),
  updated_at: timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
)
```

---

## **📁 Folder Structure**

```
app/
├── assets/                 # Images, fonts, and other static assets
│   ├── fonts/
│   └── images/
├── components/            # Reusable UI components
│   ├── auth/             # Authentication related components
│   ├── common/           # Shared components (buttons, cards, etc.)
│   ├── ideas/            # Idea-related components
│   └── profile/          # Profile-related components
├── constants/            # App-wide constants and configuration
│   ├── colors.js
│   ├── layout.js
│   └── config.js
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   ├── useIdeas.js
│   └── useTheme.js
├── services/           # API and external service integrations
│   ├── supabase.js
│   ├── reddit.js
│   └── ai.js
├── store/             # State management
│   ├── auth/
│   ├── ideas/
│   └── settings/
├── utils/            # Helper functions and utilities
│   ├── formatting.js
│   ├── validation.js
│   └── api.js
├── app/             # App routes using Expo Router
│   ├── (auth)/     # Authentication routes
│   │   ├── login.js
│   │   └── signup.js
│   ├── (app)/      # Main app routes
│   │   ├── index.js
│   │   ├── ideas/
│   │   ├── profile/
│   │   └── saved/
│   └── _layout.js
├── App.js          # Root component
├── babel.config.js
├── app.json
└── package.json
```

The folder structure follows a modular and scalable approach, separating concerns and making the codebase maintainable. Each directory has a specific purpose:

- `assets/`: Contains all static files
- `components/`: Reusable UI components organized by feature
- `constants/`: App-wide configuration and constants
- `hooks/`: Custom React hooks for shared logic
- `services/`: External API integrations
- `store/`: State management logic
- `utils/`: Helper functions and utilities
- `app/`: Main application routes using Expo Router

This structure promotes:

- Code reusability
- Easy navigation
- Clear separation of concerns
- Scalability
- Maintainable codebase

---

This document serves as a comprehensive guide for developers to understand and implement the AI-Powered SaaS Idea Finder app. 🚀
