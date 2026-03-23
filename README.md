# RoastMyCV 🔥

An AI-powered CV feedback tool that gives you brutally honest, structured feedback on your resume.

## What it does

Upload your CV as a PDF and get instant feedback including:

- **ATS Score** — see how well your CV passes Applicant Tracking Systems
- **Section Feedback** — honest critique of your Summary, Experience, Skills, Education, and Projects
- **Bullet Point Rewrites** — side-by-side before/after improvements for weak bullets
- **Missing Keywords** — skills and terms recruiters are scanning for
- **Top 3 Fixes** — the highest-impact changes to make right now

## Tech Stack

- React + TypeScript
- Vite
- Open API
- pdfjs-dist

## Run locally
```bash
git clone https://github.com/your-username/roast-my-cv
cd roast-my-cv
npm install
```

Create a `.env` file in the root:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

Then:
```bash
npm run dev
```

## Live Demo

[roastmycv.vercel.app](https://roast-my-cv-two.vercel.app/)

---

Built by [Neeraj Lokwani](https://www.linkedin.com/in/neeraj-lokwani-a80005154/) while job hunting in Germany. Felt the pain, built the tool.