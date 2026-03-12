{{/*
Expand the name of the chart.
*/}}
{{- define "portfolio.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "portfolio.fullname" -}}
{{- printf "%s" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "portfolio.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Backend selector labels
*/}}
{{- define "portfolio.backend.selectorLabels" -}}
app.kubernetes.io/name: {{ include "portfolio.name" . }}-backend
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Frontend selector labels
*/}}
{{- define "portfolio.frontend.selectorLabels" -}}
app.kubernetes.io/name: {{ include "portfolio.name" . }}-frontend
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
