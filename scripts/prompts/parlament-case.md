You will generate ONE Markdown file content for a new case under docs/cases/.

Context:
- Document id: {{DOC_ID}}
- Document title: {{TITLE}}
- Source URL (canonical): {{SOURCE_URL}}
- Fetched at (UTC ISO): {{FETCHED_AT}}
- Document type: {{DOC_TYPE}}

Mandatory output rules:
- Output ONLY the Markdown document content.
- Do NOT wrap in code fences.
- Language: Hungarian.
- Style: compatible with existing 2026 case docs (formal, structured, concise).
- Grounding: Only use information present in the provided extracted text and excerpts.
- Every material claim MUST include a citation in parentheses like:
  (forrás: {{SOURCE_URL}}, excerpt: <EXCERPT_ID>[, oldal: <N>])

Frontmatter (YAML) requirements:
- Must include these keys with non-empty values:
  status: nyitott
  links:
    questions: []
    templates: []
    cases: []
    conclusions: []
  thread: {}
  date: "{{FETCHED_AT}}"
  subject: "{{TITLE}}"
  mailto: "Országgyűlés"
  source_url: "{{SOURCE_URL}}"
  doc_id: "{{DOC_ID}}"
  fetched_at: "{{FETCHED_AT}}"
- You may add tags: [] if helpful.

Body requirements:
- Must start with a level-1 title: # {{TITLE}}
- Include sections with short headings (##):
  - ## Összefoglaló (5-10 bullet)
  - ## Kulcsidézetek (include 3-6 short quoted excerpts)
  - ## Megállapítások (structured, cite)
  - ## Nyitott kérdések (explicit unknowns)
  - ## Forrás (include {{SOURCE_URL}})

Available excerpts (JSON array; excerpt_id + optional page + text):
{{EXCERPTS_JSON}}

Extracted text (may be truncated):
{{TEXT}}
