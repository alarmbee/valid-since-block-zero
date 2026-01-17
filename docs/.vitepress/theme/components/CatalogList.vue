<script setup lang="ts">
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { catalog } from '../../data/catalog';

import { caseStatusKey, caseStatusLabel } from '../utils/caseStatus';
import { questionStatusKey, questionStatusLabel } from '../utils/questionStatus';

type Kind = 'question' | 'template' | 'case';

// NOTE: "conclusion" is a fourth structured doc type next to Q/T/C.
type KindWithConclusions = Kind | 'conclusion';

const props = defineProps<{ kind: KindWithConclusions }>();

const items = computed(() => {
  const list = (catalog as any).items ?? [];
  return list
    .filter((i: any) => i?.kind === props.kind)
    .slice()
    .sort((a: any, b: any) => String(a.id).localeCompare(String(b.id)));
});
</script>

<template>
  <ul class="vsbz-catalog-list">
    <li v-for="item in items" :key="item.id" class="vsbz-catalog-item">
      <a :href="withBase(item.route)" class="vsbz-catalog-link">
        <span class="vsbz-catalog-id">{{ item.id }}</span>
        <span class="vsbz-catalog-title">{{ item.title }}</span>
        <span
          v-if="props.kind === 'question'"
          class="vsbz-catalog-status"
          :class="`vsbz-qstatus--${questionStatusKey(item.status)}`"
        >
          <i
            class="vsbz-status-fa"
            :class="
              questionStatusKey(item.status) === 'validation'
                ? 'fa-solid fa-shield-halved'
                : questionStatusKey(item.status) === 'operations'
                  ? 'fa-solid fa-gears'
                  : questionStatusKey(item.status) === 'interpretation'
                    ? 'fa-solid fa-gavel'
                    : questionStatusKey(item.status) === 'certainty'
                      ? 'fa-solid fa-triangle-exclamation'
                      : 'fa-regular fa-circle-question'
            "
            aria-hidden="true"
          />
          <span class="vsbz-status-text">{{ questionStatusLabel(item.status) }}</span>
        </span>
        <span
          v-if="props.kind === 'case'"
          class="vsbz-catalog-status"
          :class="`vsbz-status--${caseStatusKey(item.status)}`"
        >
          <span class="vsbz-status-dot" aria-hidden="true" />
          <span class="vsbz-status-text">{{ caseStatusLabel(item.status) }}</span>
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.vsbz-catalog-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.vsbz-catalog-item {
  margin: 0;
  padding: 0;
}

.vsbz-catalog-link {
  display: block;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}

.vsbz-catalog-link:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
}

.vsbz-catalog-id {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.vsbz-catalog-title {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.vsbz-catalog-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.65rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.vsbz-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-text-3);
  flex-shrink: 0;
}


.vsbz-status-fa {
  font-size: 1rem;
  line-height: 1;
}

.vsbz-qstatus--validation .vsbz-status-fa {
  color: var(--vp-c-tip-1, var(--vp-c-green-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}

.vsbz-qstatus--operations .vsbz-status-fa {
  color: var(--vp-c-brand-1, var(--vp-c-brand));
}

.vsbz-qstatus--interpretation .vsbz-status-fa {
  color: var(--vp-c-warning-1, var(--vp-c-brand));
}

.vsbz-qstatus--certainty .vsbz-status-fa {
  color: var(--vp-c-danger-1, var(--vp-c-red-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}

.vsbz-status--open .vsbz-status-dot {
  background-color: var(--vp-c-warning-1, var(--vp-c-brand-1, var(--vp-c-brand)));
}

.vsbz-status--answered .vsbz-status-dot {
  background-color: var(--vp-c-tip-1, var(--vp-c-green-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}

.vsbz-status--followup .vsbz-status-dot {
  background-color: var(--vp-c-danger-1, var(--vp-c-red-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}
</style>
