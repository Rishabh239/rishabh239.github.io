# Rishabh Tripathi - Portfolio v2

A clean, single-page portfolio built with Next.js and deployed on GitHub Pages.

## 🚀 Quick Update

Since you already have a repo, just replace the files:

### Option A: Replace Everything (Recommended)

1. Delete all files in your local `github-portfolio` folder (keep the `.git` folder!)
2. Copy all files from this folder into `github-portfolio`
3. Run:
```powershell
git add .
git commit -m "Portfolio v2 - Single page design"
git push
```

### Option B: Manual Update

1. Replace these folders/files:
   - `src/` (entire folder)
   - `public/` (entire folder)
   - `package.json`
   - `next.config.js`
   - `.github/workflows/deploy.yml`

2. Commit and push

## 📁 Structure

```
portfolio-v2/
├── public/
│   └── images/           # Your project images
│       ├── profile.jpg
│       ├── spatial-domains.png
│       ├── domain-heatmap.png
│       ├── umap-celltype.png
│       ├── qc-violins.png
│       ├── mirge-dashboard.png
│       ├── isomir-heatmap.png
│       └── mirna-abundance.png
├── src/
│   ├── pages/
│   │   ├── _app.tsx
│   │   └── index.tsx     # ← Main single-page portfolio
│   └── styles/
│       └── globals.css
├── package.json
├── next.config.js
└── tsconfig.json
```

## ✏️ Editing Content

All content is in `src/pages/index.tsx`:

- **PERSONAL** - Your info, links, tagline
- **PILLARS** - The "What I Do" section
- **PROJECTS** - Featured projects with images
- **EXPERIENCES** - Work history
- **SKILLS** - Technical skills by category

## 🖼️ Changing Images

Replace files in `public/images/` with new versions (keep same filenames).

## 🎨 Customization

- **Primary color**: Search for `#6366F1` (indigo) and replace
- **Background**: Search for `#050505` 
- **Fonts**: Change in `globals.css` Google Fonts import

## 🌐 Live Site

After pushing, your site will be at: https://rishabh239.github.io
