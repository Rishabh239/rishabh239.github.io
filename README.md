# Rishabh Tripathi - Bioinformatics Portfolio

A role-aware portfolio website built with Next.js and deployed on GitHub Pages.

🔗 **Live Demo**: https://rishabh239.github.io (after deployment)

---

## 🚀 Quick Deploy (5 minutes)

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it: `rishabh239.github.io` (for username.github.io URL)
   - OR name it anything else (will be at `username.github.io/repo-name`)
3. Make it **Public**
4. Don't initialize with README (we have one)
5. Click **Create repository**

### Step 2: Upload This Code

**Option A: Using GitHub Web Interface (Easiest)**
1. Download this folder as a ZIP
2. Extract it
3. Go to your new GitHub repo
4. Click **"uploading an existing file"** link
5. Drag all files/folders into the upload area
6. Click **Commit changes**

**Option B: Using Git Command Line**
```bash
# Navigate to this folder
cd github-portfolio

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your repo as remote (replace with your repo URL)
git remote add origin https://github.com/Rishabh239/rishabh239.github.io.git

# Push
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: **GitHub Actions**
5. That's it! The workflow will auto-run

### Step 4: Wait & Visit

1. Go to **Actions** tab in your repo
2. Watch the "Deploy to GitHub Pages" workflow run
3. Once green ✅, visit:
   - `https://rishabh239.github.io` (if repo named `rishabh239.github.io`)
   - `https://rishabh239.github.io/repo-name` (if different repo name)

---

## 🏗️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
github-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploy on push
├── src/
│   ├── config/
│   │   └── data.ts         # ⭐ All your portfolio data
│   ├── pages/
│   │   ├── index.tsx       # Home (Role Selector)
│   │   ├── pipeline.tsx    # Pipeline page
│   │   ├── about.tsx       # About page
│   │   ├── projects/
│   │   │   ├── index.tsx   # All projects
│   │   │   └── [id].tsx    # Individual project
│   │   └── stages/
│   │       └── [slug].tsx  # Pipeline stages
│   └── styles/
│       └── globals.css     # Global styles
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## ✏️ Customization

### Edit Your Content

All your portfolio data is in **`src/config/data.ts`**:

```typescript
// Personal info
export const PERSONAL = {
  name: "Rishabh Tripathi",
  email: "tripathirishabh91@gmail.com",
  // ...
}

// Projects
export const PROJECTS = {
  "spatial-atlas": {
    title: "...",
    // ...
  }
}

// Experience
export const EXPERIENCES = [...]

// Skills
export const SKILL_CATEGORIES = [...]
```

### Add a New Project

1. Open `src/config/data.ts`
2. Add to the `PROJECTS` object:
```typescript
"new-project": {
  id: "new-project",
  title: "My New Project",
  subtitle: "Short description",
  status: "Completed",
  tags: ["Tag1", "Tag2"],
  technologies: ["Python", "..."],
  abstract: "Longer description...",
  biologicalQuestion: "...",
  methodology: "...",
  keyResults: "...",
  pipelineSteps: ["Step 1", "Step 2", "..."],
  githubUrl: "https://github.com/...",
}
```

### Change Colors

The role accent colors are in `src/config/data.ts`:
```typescript
export const ROLE_META = {
  bio: { accent: "#22C55E" },   // Green
  ml: { accent: "#A855F7" },    // Purple
  compbio: { accent: "#F59E0B" }, // Amber
  eng: { accent: "#3B82F6" },   // Blue
}
```

---

## 🎨 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Role selector - "How are you evaluating me?" |
| Pipeline | `/pipeline` | 6-stage analysis pipeline |
| Projects | `/projects` | All projects list |
| Project | `/projects/[id]` | Individual project detail |
| Stages | `/stages/[slug]` | Pipeline stage detail |
| About | `/about` | Experience, skills, contact |

---

## 🔧 Troubleshooting

### Build fails?
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`

### GitHub Actions not running?
- Make sure the `.github/workflows/deploy.yml` file exists
- Check the Actions tab for error logs

### Page not found (404)?
- Wait a few minutes for GitHub Pages to update
- Check if the build succeeded in Actions tab
- Try hard refresh (Ctrl+Shift+R)

### Want a custom domain?
1. Buy a domain (Namecheap, Google Domains, etc.)
2. Add a `CNAME` file in the `public/` folder with your domain
3. Configure DNS settings to point to GitHub Pages

---

## 📦 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Inline styles (no external CSS framework)
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages
- **Language**: TypeScript

---

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

---

Made with ❤️ by Rishabh Tripathi
