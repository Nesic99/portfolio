# gunicorn.conf.py

import multiprocessing

# Workers: standard formula is (2 x CPU cores) + 1
# For a portfolio/API this is plenty — scale up if needed
workers = (multiprocessing.cpu_count() * 2) + 1
worker_class = "sync"
threads = 2

# Binding
bind = "0.0.0.0:5000"

# Timeouts
timeout = 30
keepalive = 5

# Logging — output to stdout/stderr so Docker captures it
accesslog = "-"
errorlog = "-"
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s'

# Security — don't expose gunicorn version in headers
server_name = ""

# Graceful shutdown
graceful_timeout = 30
