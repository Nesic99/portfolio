FROM python:3.12-slim

# Don't run as root
RUN useradd --create-home appuser
WORKDIR /home/appuser

# Install deps first (layer cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app and gunicorn config
COPY app.py .
COPY gunicorn.conf.py .

# Switch to non-root user
USER appuser

EXPOSE 5000

# Use gunicorn instead of Flask dev server
CMD ["gunicorn", "--config", "gunicorn.conf.py", "app:app"]
