import pytest
from app import app, ABOUT, EXPERIENCES, PROJECTS


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


# ── /api/about ────────────────────────────────────────────────────────────────

def test_about_status(client):
    res = client.get("/api/about")
    assert res.status_code == 200

def test_about_content_type(client):
    res = client.get("/api/about")
    assert res.content_type == "application/json"

def test_about_required_fields(client):
    data = client.get("/api/about").get_json()
    for field in ("name", "title", "bio", "location", "email", "github", "skills"):
        assert field in data, f"Missing field: {field}"

def test_about_skills_is_list(client):
    data = client.get("/api/about").get_json()
    assert isinstance(data["skills"], list)
    assert len(data["skills"]) > 0

def test_about_email_format(client):
    data = client.get("/api/about").get_json()
    assert "@" in data["email"]

def test_about_github_is_url(client):
    data = client.get("/api/about").get_json()
    assert data["github"].startswith("https://")


# ── /api/experiences ──────────────────────────────────────────────────────────

def test_experiences_status(client):
    res = client.get("/api/experiences")
    assert res.status_code == 200

def test_experiences_is_list(client):
    data = client.get("/api/experiences").get_json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_experiences_required_fields(client):
    data = client.get("/api/experiences").get_json()
    for exp in data:
        for field in ("company", "role", "period", "description", "tags"):
            assert field in exp, f"Missing field '{field}' in experience: {exp}"

def test_experiences_tags_are_lists(client):
    data = client.get("/api/experiences").get_json()
    for exp in data:
        assert isinstance(exp["tags"], list)


# ── /api/projects ─────────────────────────────────────────────────────────────

def test_projects_status(client):
    res = client.get("/api/projects")
    assert res.status_code == 200

def test_projects_is_list(client):
    data = client.get("/api/projects").get_json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_projects_required_fields(client):
    data = client.get("/api/projects").get_json()
    for project in data:
        for field in ("title", "description", "tech", "url", "stars", "status"):
            assert field in project, f"Missing field '{field}' in project: {project}"

def test_projects_tech_are_lists(client):
    data = client.get("/api/projects").get_json()
    for project in data:
        assert isinstance(project["tech"], list)


# ── 404 handling ──────────────────────────────────────────────────────────────

def test_unknown_route_returns_404(client):
    res = client.get("/api/doesnotexist")
    assert res.status_code == 404