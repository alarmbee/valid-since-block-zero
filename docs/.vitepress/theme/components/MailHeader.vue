<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const props = defineProps<{
  to?: string
  date?: string
  subject?: string
  status?: string
}>()

const displayTo = computed(() => props.to || frontmatter.value.mailto || frontmatter.value.to)
const displayDate = computed(() => props.date || frontmatter.value.date)
const displaySubject = computed(() => props.subject || frontmatter.value.subject)
const displayStatus = computed(() => props.status || frontmatter.value.status)

type CaseStatusKey = 'open' | 'answered' | 'followup' | 'unknown'

function caseStatusKey(status: unknown): CaseStatusKey {
  if (!status) return 'unknown'
  const raw = String(status).trim().toLowerCase()
  if (raw === 'nyitott' || raw === 'open') return 'open'
  if (raw === 'megválaszolt' || raw === 'megvalaszolt' || raw === 'answered' || raw === 'reply_only') return 'answered'
  if (
    raw === 'további kérdéseket felvető' ||
    raw === 'tovabbi kerdeseket felveto' ||
    raw === 'followup' ||
    raw === 'follow_up'
  ) {
    return 'followup'
  }
  return 'unknown'
}

function caseStatusLabel(status: unknown): string {
  const key = caseStatusKey(status)
  if (key === 'open') return 'nyitott'
  if (key === 'answered') return 'megválaszolt'
  if (key === 'followup') return 'további kérdéseket felvető'
  return typeof status === 'string' && status.trim() ? status : 'ismeretlen'
}

const statusKey = computed(() => caseStatusKey(displayStatus.value))
const statusLabel = computed(() => caseStatusLabel(displayStatus.value))
</script>

<template>
  <div class="mail-header" v-if="displayTo || displayDate || displaySubject || displayStatus">
    <div v-if="displayTo" class="mail-row">
      <span class="label">To:</span>
      <span class="value">{{ displayTo }}</span>
    </div>
    <div v-if="displayDate" class="mail-row">
      <span class="label">Date:</span>
      <span class="value">{{ displayDate }}</span>
    </div>
    <div v-if="displaySubject" class="mail-row">
      <span class="label">Subject:</span>
      <span class="value subject">{{ displaySubject }}</span>
    </div>
    <div v-if="displayStatus" class="mail-row">
      <span class="label">Status:</span>
      <span class="value">
        <span class="status-badge" :class="`status--${statusKey}`">
          <span class="status-dot" aria-hidden="true" />
          <span class="status-text">{{ statusLabel }}</span>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.mail-header {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  line-height: 1.5;
}

.mail-row {
  display: flex;
  margin-bottom: 4px;
}

.mail-row:last-child {
  margin-bottom: 0;
}

.label {
  color: var(--vp-c-text-2);
  width: 80px;
  flex-shrink: 0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 0.5px;
  align-self: flex-start;
}

.value {
  color: var(--vp-c-text-1);
  word-break: break-word;
}

.subject {
  font-weight: 600;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.status--open .status-dot {
  background-color: var(--vp-c-warning-1, var(--vp-c-brand-1, var(--vp-c-brand)));
}

.status--answered .status-dot {
  background-color: var(--vp-c-tip-1, var(--vp-c-green-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}

.status--followup .status-dot {
  background-color: var(--vp-c-danger-1, var(--vp-c-red-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}
</style>
