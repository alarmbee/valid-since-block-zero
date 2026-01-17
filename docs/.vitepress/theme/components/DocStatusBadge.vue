<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

import { questionStatusKey, questionStatusLabel } from '../utils/questionStatus';

const { frontmatter, page } = useData();

const kind = computed<'question' | null>(() => {
  const fp = page.value.filePath || '';
  if (fp.startsWith('questions/') && !fp.endsWith('/index.md') && fp !== 'questions/index.md') return 'question';
  return null;
});

const id = computed(() => {
  const raw = (frontmatter.value as any)?.id;
  return raw ? String(raw) : '';
});

const rawStatus = computed(() => (frontmatter.value as any)?.status);

const badge = computed(() => {
  if (!kind.value) return null;

  const key = questionStatusKey(rawStatus.value);
  const label = questionStatusLabel(rawStatus.value);
  const iconClass =
    key === 'validation'
      ? 'fa-solid fa-shield-halved'
      : key === 'operations'
        ? 'fa-solid fa-gears'
        : key === 'interpretation'
          ? 'fa-solid fa-gavel'
          : key === 'certainty'
            ? 'fa-solid fa-triangle-exclamation'
            : 'fa-regular fa-circle-question';
  return { key, label, mode: 'question' as const, iconClass };
});
</script>

<template>
  <div v-if="badge && id" class="vsbz-doc-status" aria-label="Státusz">
    <span
      class="vsbz-doc-status__badge"
      :class="`vsbz-qstatus--${badge.key}`"
    >
      <i class="vsbz-status-fa" :class="badge.iconClass" aria-hidden="true"></i>
      <span class="vsbz-doc-status__text">{{ badge.label }}</span>
    </span>
  </div>
</template>

<style scoped>
.vsbz-doc-status {
  margin: 0.5rem 0 1.25rem;
}

.vsbz-doc-status__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.vsbz-doc-status__text {
  line-height: 1.1rem;
}


.vsbz-status-fa {
  font-size: 1.05rem;
  line-height: 1;
}


.vsbz-qstatus--validation .vsbz-status-fa {
  color: var(--vp-c-tip-1, var(--vp-c-green-1, var(--vp-c-brand)));
}

.vsbz-qstatus--operations .vsbz-status-fa {
  color: var(--vp-c-brand-1, var(--vp-c-brand));
}

.vsbz-qstatus--interpretation .vsbz-status-fa {
  color: var(--vp-c-warning-1, var(--vp-c-brand));
}

.vsbz-qstatus--certainty .vsbz-status-fa {
  color: var(--vp-c-danger-1, var(--vp-c-brand));
}


</style>
