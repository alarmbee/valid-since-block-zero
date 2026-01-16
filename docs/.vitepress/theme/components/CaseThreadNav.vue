<script setup lang="ts">
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { catalog } from '../../data/catalog';

const { frontmatter, page } = useData();

type ThreadLink = {
  id: string;
  title: string;
  route: string;
  missing: boolean;
} | null;

const isCaseDoc = computed(() => {
  const fp = page.value.filePath || '';
  return fp.startsWith('cases/');
});

const currentId = computed(() => {
  const id = (frontmatter.value as any)?.id;
  return id ? String(id) : '';
});

function resolveCase(id: string): ThreadLink {
  if (!id) return null;
  const byId = (catalog as any).byId ?? {};
  const item = byId[id];
  if (!item) return { id, title: id, route: '', missing: true };
  return { id, title: item.title ?? id, route: item.route ?? '', missing: false };
}

function findDerivedNeighbor(direction: 'previous' | 'next'): string {
  const items = (catalog as any).items ?? [];
  const here = currentId.value;
  if (!here) return '';

  if (direction === 'next') {
    const nextItem = items.find((i: any) => i?.kind === 'case' && i?.thread?.previous === here);
    return nextItem?.id ? String(nextItem.id) : '';
  }

  const prevItem = items.find((i: any) => i?.kind === 'case' && i?.thread?.next === here);
  return prevItem?.id ? String(prevItem.id) : '';
}

const thread = computed(() => {
  const byId = (catalog as any).byId ?? {};
  const item = byId[currentId.value];
  return item?.thread ?? null;
});

const previousId = computed(() => {
  const explicit = thread.value?.previous ?? '';
  return explicit ? String(explicit) : findDerivedNeighbor('previous');
});

const nextId = computed(() => {
  const explicit = thread.value?.next ?? '';
  return explicit ? String(explicit) : findDerivedNeighbor('next');
});

const previous = computed(() => resolveCase(previousId.value));
const next = computed(() => resolveCase(nextId.value));

const hasAnything = computed(() => Boolean(previous.value || next.value));
</script>

<template>
  <section v-if="isCaseDoc && currentId && hasAnything" class="vsbz-thread">
    <h2 class="vsbz-thread-title">Email folyam</h2>

    <div class="vsbz-thread-grid">
      <div class="vsbz-thread-col">
        <h3 class="vsbz-thread-col-title">Előző</h3>
        <a v-if="previous && !previous.missing" :href="withBase(previous.route)" class="vsbz-thread-card">
          <span class="vsbz-thread-card-id">{{ previous.id }}</span>
          <span class="vsbz-thread-card-title">{{ previous.title }}</span>
        </a>
        <div v-else-if="previous && previous.missing" class="vsbz-thread-card vsbz-thread-card--missing">
          <span class="vsbz-thread-card-id">{{ previous.id }}</span>
          <span class="vsbz-thread-card-note">(Hiányzó hivatkozás)</span>
        </div>
        <div v-else class="vsbz-thread-card vsbz-thread-card--empty">Nincs előző elem.</div>
      </div>

      <div class="vsbz-thread-col">
        <h3 class="vsbz-thread-col-title">Következő</h3>
        <a v-if="next && !next.missing" :href="withBase(next.route)" class="vsbz-thread-card">
          <span class="vsbz-thread-card-id">{{ next.id }}</span>
          <span class="vsbz-thread-card-title">{{ next.title }}</span>
        </a>
        <div v-else-if="next && next.missing" class="vsbz-thread-card vsbz-thread-card--missing">
          <span class="vsbz-thread-card-id">{{ next.id }}</span>
          <span class="vsbz-thread-card-note">(Hiányzó hivatkozás)</span>
        </div>
        <div v-else class="vsbz-thread-card vsbz-thread-card--empty">Nincs következő elem.</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vsbz-thread {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.vsbz-thread-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  padding: 0;
}

.vsbz-thread-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 720px) {
  .vsbz-thread-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.vsbz-thread-col-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
  padding: 0;
}

.vsbz-thread-card {
  display: block;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}

a.vsbz-thread-card {
  color: var(--vp-c-brand-1);
}

a.vsbz-thread-card:visited {
  color: var(--vp-c-brand-2);
}

.vsbz-thread-card:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
  color: var(--vp-c-brand-2);
}

.vsbz-thread-card--missing {
  opacity: 0.7;
  border-style: dashed;
}

.vsbz-thread-card--empty {
  opacity: 0.7;
  font-style: italic;
  color: var(--vp-c-text-2);
}

.vsbz-thread-card-id {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.vsbz-thread-card-title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
}

.vsbz-thread-card-note {
  font-size: 0.875rem;
  font-style: italic;
  color: var(--vp-c-text-3);
}
</style>
