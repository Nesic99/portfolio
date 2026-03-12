from flask import Flask, jsonify
 
app = Flask(__name__)

# ── Data ──────────────────────────────────────────────────────────────────────

ABOUT = {
    "name": "Đorđe Nešić",
    "title": "DevOps Engineer",
    "bio": (
        "I enjoy helping bring interesting and practical ideas and projects to life. "
        "Actively looking for ways to further improve myself. "
    ),
    "location": "Niš, Serbia",
    "email": "djordjenesic4@gmail.com",
    "github": "https://github.com/Nesic99",
    "skills": ["OCI", "Bash Scripting", "Kafka", "Kubernetes", "Jenkins", "OpenTelemetry", "Instana", "PostgreSQL", "Docker", "AWS", "CI/CD", "RHEL", "Terraform", "Ansible", "oVirt", "Redis", "Cassandra", "Zabbix", "Prometheus", "Grafana", "ElasticSearch", "VictoriaLogs/Traces", "GitLab", "Helm"],
}

EXPERIENCES = [
    {
        "company": "Dualsoft",
        "role": "Junior SysOps Engineer",
        "period": "2025 July – 2026 March",
        "description": "Participated in an on-call rotation, responding to incidents, investigating root causes, and helping restore services. Configured and maintained a monitoring stack including Instana, Zabbix, and Prometheus/Grafana. Maintained and monitored systems such as Kafka, Redis, Elasticsearch, and Cassandra. Gained hands-on experience with Oracle Cloud Infrastructure (OCI) and maintained local development virtual machines using oVirt.Contributed to centralized logging and observability by implementing OpenTelemetry instrumentation and integrating with VictoriaLogs and VictoriaTraces for log aggregation and distributed tracing. Provisioned and maintained Linux infrastructure, primarily RHEL-based. Automated operational tasks using Bash, Ansible, Terraform, and CI/CD pipelines, including a project for automatic SSL renewal using GitLab. Deployed and monitored services on Kubernetes and managed version control workflows with Git. Applied security best practices such as key management, firewall configuration, and patching. Wrote documentation for infrastructure architecture, operational procedures, and troubleshooting to support team knowledge sharing. Structured Helm-based deployments around service dependencies.",
        "tags": ["System Administration", "Docker", "Kubernetes", "Jenkins", "Monitoring", "Grafana", "Zabbix", "Prometheus", "Instana", "OCI", "CI/CD", "RHEL", "OpenTelemetry", "oVirt", "Redis", "Kafka", "Cassandra", "Bash Scripting", "Ansible"],
    },
    {
        "company": "Dualsoft",
        "role": "DevOps/SysOps Internship",
        "period": "2025 April – 2025 July",
        "description": "Working in a team and with other teams to bring to life a project containing a betting application. Collaborating with developers to develop and deploy a betting application which we presented at the end of the internship.",
        "tags": ["System Administration", "Docker", "Kubernetes", "Jenkins", "Monitoring", "Grafana", "Zabbix", "Prometheus"],
    },
    {
        "company": "Syncit Group",
        "role": "DevOps Intern",
        "period": "May 2022 – July 2022",
        "description": "Working with Linux, Docker, Proxmox, and Git, and using Jira for bug tracking and agile project management.",
        "tags": ["Docker", "Linux", "Proxmox", "Jira"],
    },
]

PROJECTS = [
    {
        "title": "RandomSteamGame",
        "description": "An application that suggests what Steam game from your library you should play next",
        "tech": ["TypeScript", "SQLite", "LLM"],
        "url": "#"
    }
]

# ── Routes ────────────────────────────────────────────────────────────────────
@app.route("/api/about")
def api_about():
    return jsonify(ABOUT)
 
@app.route("/api/experiences")
def api_experiences():
    return jsonify(EXPERIENCES)
 
@app.route("/api/projects")
def api_projects():
    return jsonify(PROJECTS)
 
if __name__ == "__main__":
    import os
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(debug=debug)