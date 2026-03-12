# Portfolio — Flask + TypeScript

A clean, dark-themed personal portfolio with smooth animations.

## Project Structure

```
portfolio/
├── app.py                  # Flask app & data
├── requirements.txt
├── tsconfig.json
├── templates/
│   └── index.html          # Jinja2 template
└── static/
    ├── css/
    │   └── style.css
    ├── ts/
    │   └── portfolio.ts    # TypeScript source
    └── js/
        └── portfolio.js    # Compiled output (auto-generated)
```

## Setup

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Install TypeScript (if not already installed)
npm install -g typescript

# 3. Compile TypeScript
npx tsc

# 4. Run Flask
python3 app.py
```

Visit http://localhost:5000

## Customization

Edit the data at the top of `app.py`:
- `ABOUT` — your name, bio, skills, contact info
- `EXPERIENCES` — your work history
- `PROJECTS` — your portfolio projects

After editing TypeScript, recompile with: `npx tsc`

For development with auto-recompile:
```bash
npx tsc --watch
```
