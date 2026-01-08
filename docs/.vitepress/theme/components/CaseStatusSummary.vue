<script setup lang="ts">
import { computed } from 'vue';
import { catalog } from '../../data/catalog';

import { caseStatusKey } from '../utils/caseStatus';

const caseItems = computed(() => {
  const list = (catalog as any).items ?? [];
  return list.filter((i: any) => i?.kind === 'case');
});

const counts = computed(() => {
  let open = 0;
  let followup = 0;
  let answered = 0;

  for (const item of caseItems.value) {
    const key = caseStatusKey(item?.status);
    if (key === 'answered') answered += 1;
    else if (key === 'followup') followup += 1;
    else open += 1;
  }

  const total = open + followup + answered;
  return {
    open,
    followup,
    answered,
    total,
    openPct: total ? (open / total) * 100 : 0,
    followupPct: total ? (followup / total) * 100 : 0,
    answeredPct: total ? (answered / total) * 100 : 0
  };
});
</script>

<template>
  <section class="vsbz-case-status" aria-label="Eset státusz összesítő">
    <div class="vsbz-case-status__header">
      <h2 class="vsbz-case-status__title">Státuszok összesítve</h2>
      <p class="vsbz-case-status__subtitle">
        Összesen: <strong>{{ counts.total }}</strong>
      </p>
    </div>

    <div
      class="vsbz-case-status__bar"
      role="img"
      :aria-label="`Nyitott: ${counts.open}, további kérdéseket felvető: ${counts.followup}, megválaszolt: ${counts.answered}`"
    >
      <div class="vsbz-case-status__seg vsbz-case-status__seg--open" :style="{ width: `${counts.openPct}%` }" />
      <div class="vsbz-case-status__seg vsbz-case-status__seg--followup" :style="{ width: `${counts.followupPct}%` }" />
      <div class="vsbz-case-status__seg vsbz-case-status__seg--answered" :style="{ width: `${counts.answeredPct}%` }" />
    </div>

    <div class="vsbz-case-status__legend" aria-label="Státusz bontás">
      <div class="vsbz-case-status__item">
        <span class="vsbz-case-status__dot vsbz-case-status__dot--open" aria-hidden="true" />
        <span class="vsbz-case-status__label">Nyitott</span>
        <span class="vsbz-case-status__value">{{ counts.open }}</span>
      </div>
      <div class="vsbz-case-status__item">
        <span class="vsbz-case-status__dot vsbz-case-status__dot--followup" aria-hidden="true" />
        <span class="vsbz-case-status__label">További kérdéseket felvető</span>
        <span class="vsbz-case-status__value">{{ counts.followup }}</span>
      </div>
      <div class="vsbz-case-status__item">
        <span class="vsbz-case-status__dot vsbz-case-status__dot--answered" aria-hidden="true" />
        <span class="vsbz-case-status__label">Megválaszolt</span>
        <span class="vsbz-case-status__value">{{ counts.answered }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vsbz-case-status {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0 1.25rem;
}

.vsbz-case-status__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.vsbz-case-status__title {
  margin: 0;
  font-size: 1.05rem;
  border-top: unset;
  padding-top: unset;
}


.vsbz-case-status__subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.vsbz-case-status__bar {
  height: 12px;
  border-radius: 9999px;
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: flex;
}

.vsbz-case-status__seg {
  height: 100%;
}

.vsbz-case-status__seg--open {
  background: var(--vp-c-warning-1, var(--vp-c-brand-1, var(--vp-c-brand)));
}

.vsbz-case-status__seg--followup {
  background: var(--vp-c-danger-1, var(--vp-c-red-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}

.vsbz-case-status__seg--answered {
  background: var(--vp-c-tip-1, var(--vp-c-green-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}

.vsbz-case-status__legend {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem 0.75rem;
  margin-top: 0.75rem;
}

@media (max-width: 640px) {
  .vsbz-case-status__legend {
    grid-template-columns: 1fr;
  }
}

.vsbz-case-status__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.55rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.vsbz-case-status__dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.vsbz-case-status__dot--open {
  background: var(--vp-c-warning-1, var(--vp-c-brand-1, var(--vp-c-brand)));
}

.vsbz-case-status__dot--followup {
  background: var(--vp-c-danger-1, var(--vp-c-red-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}

.vsbz-case-status__dot--answered {
  background: var(--vp-c-tip-1, var(--vp-c-green-1, var(--vp-c-brand-1, var(--vp-c-brand))));
}

.vsbz-case-status__label {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1rem;
}

.vsbz-case-status__value {
  margin-left: auto;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
</style>
