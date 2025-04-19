# Mini Job Board App

A simple full-stack job board application where companies can post jobs and users can browse them. This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Supabase (Auth + Database)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Features

### Core Functionality

- **Authentication** (Supabase Auth)
  - User sign-up and login
- **Post a Job**
  - Authenticated users can create job posts with:
    - Title
    - Company Name
    - Description
    - Location
    - Job Type (Full-Time, Part-Time, Contract)
- **Browse Jobs**
  - Public listing of all job posts
  - Filter jobs by location or job type
- **Job Detail Page**
  - View complete details of a selected job
- **User Dashboard**
  - View, edit, or delete user’s posted jobs

## How to run locally

### 1. **Clone the repo**

```bash
git clone https://github.com/yuhanasy/mini-job-board.git
cd mini-job-board
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Install Supabase CLI**

If you don't have the Supabase CLI installed, install it by following the instructions from the [official docs](https://supabase.com/docs/guides/cli).

For macOS (using Homebrew):

```bash
brew install supabase/tap/supabase
```

For other platforms, refer to the [CLI installation guide](https://supabase.com/docs/guides/cli#install-the-cli).

### 4. **Initialize a new Supabase project**

> Skip this step if you already have a Supabase project.

1. Go to [https://app.supabase.com](https://app.supabase.com) and create a new project.
2. Note down your **Project URL** and **Anon Public Key** from the project settings.
3. Link your local project to your Supabase project:

```bash
supabase link --project-ref your-project-ref
```

> You can find your `project-ref` in the Supabase dashboard URL: `https://app.supabase.com/project/<project-ref>`

### 5. **Apply database migrations**

Run this command to push the local migration files to your Supabase project:

```bash
supabase db push
```

This will apply the schema defined in your `supabase/migrations` folder to your Supabase project.

### 6. **Set up environment variables**

Copy a `.env.example` file and replace with the supabase credentials:

```bash
cp .env.example .env.local
```

### 7. **Run the development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## If I Had More Time...

- [ ] Add pagination and infinite scrolling for job listings
- [ ] Add user profile and avatar support
- [ ] Implement client-side form validation and error handling
- [ ] Improve accessibility and mobile responsiveness
- [ ] Add unit and integration tests using Vitest and React Testing Library
- [ ] ...
