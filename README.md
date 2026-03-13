# Portfolio — Flask + TypeScript

Đorđe Nešić's personal portfolio. Dark-themed with smooth animations, containerized with Docker, deployed via Helm on Kubernetes.

## Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── pipeline.yml          # CI/CD — lint, test, build, push
├── backend/
│   ├── app.py                    # Flask API (edit your data here)
│   ├── Dockerfile
│   └── gunicorn.conf.py          # Production WSGI config
├── frontend/
│   ├── Dockerfile
│   ├── index.html                # Static HTML — fetches from API
│   ├── nginx.conf                # Nginx reverse proxy config
│   └── style.css                 # Stylesheet
├── helm/
│   └── portfolio/
│       ├── Chart.yaml
│       ├── values.yaml           # Edit image repos and ingress host here
│       └── templates/
│           ├── _helpers.tpl
│           ├── backend-deployment.yaml
│           ├── backend-service.yaml
│           ├── frontend-deployment.yaml
│           ├── frontend-service.yaml
│           ├── hpa.yaml
│           ├── ingress.yaml
│           └── NOTES.txt
├── static/
│   └── ts/
│       └── portfolio.ts          # TypeScript source (compile before building)
├── tests/
│   └── tests.py                  # pytest API tests
├── .coveragerc
├── .dockerignore
├── .gitignore
├── docker-compose.yml            # Local development
├── pytest.ini
├── requirements.txt              # Flask + Gunicorn
├── requirements-dev.txt          # pytest + flake8
└── tsconfig.json
```

## Local Development

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Compile TypeScript
npm install -g typescript
npx tsc

# 3. Run with Docker Compose
docker compose up --build
```

Visit http://localhost

## Customization

Edit the data at the top of `backend/app.py`:
- `ABOUT` — your name, bio, skills, contact info
- `EXPERIENCES` — your work history
- `PROJECTS` — your portfolio projects

After editing TypeScript, recompile before building:
```bash
npx tsc
# or watch mode
npx tsc --watch
```

## CI/CD Pipeline

The GitHub Actions pipeline (`.github/workflows/pipeline.yml`) runs on every push to `main`:

| Job | What it does |
|-----|-------------|
| `lint-test-backend` | flake8 lint + pytest with 80% coverage requirement |
| `lint-frontend` | TypeScript strict type check (`tsc --noEmit`) |
| `lint-helm` | `helm lint` + dry-run template render |
| `build-push` | Builds and pushes both images to `ghcr.io` (main branch only) |

Images are tagged with both `latest` and the commit SHA (e.g. `sha-abc1234`).

## Deploying to Kubernetes (k3s)

### 1. Create the namespace and image pull secret
```bash
kubectl create namespace portfolio

kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=Nesic99 \
  --docker-password=YOUR_GITHUB_PAT \
  --namespace portfolio
```

### 2. Update values.yaml
```yaml
imagePullSecrets:
  - name: ghcr-secret

backend:
  image:
    repository: ghcr.io/nesic99/portfolio-backend
    tag: latest

frontend:
  image:
    repository: ghcr.io/nesic99/portfolio-frontend
    tag: latest

ingress:
  enabled: true
  className: traefik   # k3s default — change to nginx if using nginx ingress
  host: your-domain.com
```

### 3. Install the Helm chart
```bash
helm install portfolio ./helm/portfolio \
  --namespace portfolio \
  --values helm/portfolio/values.yaml
```

### 4. Check status
```bash
kubectl get pods -n portfolio
kubectl get ingress -n portfolio
```

### 5. Port-forward for local access (skip ingress)
```bash
kubectl port-forward svc/portfolio-frontend -n portfolio 8080:80
# Visit http://localhost:8080
```

### Upgrading after a new image push
```bash
helm upgrade portfolio ./helm/portfolio \
  --namespace portfolio \
  --values helm/portfolio/values.yaml
```

### Uninstall
```bash
helm uninstall portfolio -n portfolio
```

## Architecture

```
Browser → Nginx (frontend) → /api/* → Flask/Gunicorn (backend)
                           → /*     → index.html (static)
```

- **Frontend** — Nginx serves `index.html` which fetches data from the API on load
- **Backend** — Flask API only, no template rendering, served by Gunicorn in production
- **Networking** — Backend is ClusterIP only (not exposed outside the cluster), all traffic routes through Nginx