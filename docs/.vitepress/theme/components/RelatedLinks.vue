<script setup lang="ts">
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { catalog } from '../../data/catalog';

type RelatedKind = 'questions' | 'templates' | 'cases' | 'conclusions';

const { frontmatter, page } = useData();

const isStructuredDoc = computed(() => {
  const fp = page.value.filePath || '';
  return (
    fp.startsWith('questions/') ||
    fp.startsWith('templates/') ||
    fp.startsWith('cases/') ||
    fp.startsWith('conclusions/')
  );
});

const currentId = computed(() => {
  const id = (frontmatter.value as any)?.id;
  return id ? String(id) : '';
});

const rawLinks = computed(() => {
  const links = (frontmatter.value as any)?.links;
  return {
    questions: Array.isArray(links?.questions) ? links.questions.map(String) : [],
    templates: Array.isArray(links?.templates) ? links.templates.map(String) : [],
    cases: Array.isArray(links?.cases) ? links.cases.map(String) : [],
    conclusions: Array.isArray(links?.conclusions) ? links.conclusions.map(String) : []
  } satisfies Record<RelatedKind, string[]>;
});

function uniqSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

const relatedIds = computed(() => {
  const id = currentId.value;
  const backlinks = (catalog as any).backlinks?.[id] ?? { questions: [], templates: [], cases: [], conclusions: [] };
  return {
    questions: uniqSorted([...rawLinks.value.questions, ...(backlinks.questions ?? []).map(String)]),
    templates: uniqSorted([...rawLinks.value.templates, ...(backlinks.templates ?? []).map(String)]),
    cases: uniqSorted([...rawLinks.value.cases, ...(backlinks.cases ?? []).map(String)]),
    conclusions: uniqSorted([...rawLinks.value.conclusions, ...(backlinks.conclusions ?? []).map(String)])
  } satisfies Record<RelatedKind, string[]>;
});

const resolved = computed(() => {
  const byId = (catalog as any).byId ?? {};
  const resolveOne = (id: string) => {
    const item = byId[id];
    if (!item) return { id, title: id, route: '', missing: true };
    return { id, title: item.title ?? id, route: item.route ?? '', missing: false };
  };

  return {
    questions: relatedIds.value.questions.map(resolveOne),
    templates: relatedIds.value.templates.map(resolveOne),
    cases: relatedIds.value.cases.map(resolveOne),
    conclusions: relatedIds.value.conclusions.map(resolveOne)
  };
});

const hasAnything = computed(() => {
  const r = resolved.value;
  return r.questions.length > 0 || r.templates.length > 0 || r.cases.length > 0 || r.conclusions.length > 0;
});
</script>

<template>
  <section v-if="isStructuredDoc && currentId && hasAnything" class="vsbz-related">
    <h2 class="vsbz-related-title">Kapcsolódó</h2>

    <div v-if="resolved.questions.length" class="vsbz-related__group">
      <h3 class="vsbz-group-title">Kapcsolódó kérdések</h3>
      <ul class="vsbz-link-list">
        <li v-for="item in resolved.questions" :key="item.id" class="vsbz-link-item">
          <a v-if="!item.missing" :href="withBase(item.route)" class="vsbz-card-link">
            <span class="vsbz-card-id">{{ item.id }}</span>
            <span class="vsbz-card-title">{{ item.title }}</span>
          </a>
          <div v-else class="vsbz-card-missing">
            <span class="vsbz-card-id">{{ item.id }}</span>
            <span class="vsbz-card-note">(Hiányzó hivatkozás)</span>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="resolved.templates.length" class="vsbz-related__group">
      <h3 class="vsbz-group-title">Kapcsolódó minták</h3>
      <ul class="vsbz-link-list">
        <li v-for="item in resolved.templates" :key="item.id" class="vsbz-link-item">
          <a v-if="!item.missing" :href="withBase(item.route)" class="vsbz-card-link">
            <span class="vsbz-card-id">{{ item.id }}</span>
            <span class="vsbz-card-title">{{ item.title }}</span>
          </a>
          <div v-else class="vsbz-card-missing">
            <span class="vsbz-card-id">{{ item.id }}</span>
            <span class="vsbz-card-note">(Hiányzó hivatkozás)</span>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="resolved.cases.length" class="vsbz-related__group">
      <h3 class="vsbz-group-title">Kapcsolódó esetek</h3>
      <ul class="vsbz-link-list">
        <li v-for="item in resolved.cases" :key="item.id" class="vsbz-link-item">
          <a v-if="!item.missing" :href="withBase(item.route)" class="vsbz-card-link">
            <span class="vsbz-card-id">{{ item.id }}</span>
            <span class="vsbz-card-title">{{ item.title }}</span>
          </a>
          <div v-else class="vsbz-card-missing">
            <span class="vsbz-card-id">{{ item.id }}</span>
            <span class="vsbz-card-note">(Hiányzó hivatkozás)</span>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="resolved.conclusions.length" class="vsbz-related__group">
      <h3 class="vsbz-group-title">Kapcsolódó következtetések</h3>
      <ul class="vsbz-link-list">
        <li v-for="item in resolved.conclusions" :key="item.id" class="vsbz-link-item">
          <a v-if="!item.missing" :href="withBase(item.route)" class="vsbz-card-link">
            <span class="vsbz-card-id">{{ item.id }}</span>
            <span class="vsbz-card-title">{{ item.title }}</span>
          </a>
          <div v-else class="vsbz-card-missing">
            <span class="vsbz-card-id">{{ item.id }}</span>
            <span class="vsbz-card-note">(Hiányzó hivatkozás)</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.vsbz-related {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.vsbz-related-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  padding: 0;
}

.vsbz-related__group {
  margin-bottom: 2rem;
}

.vsbz-group-title {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
  padding: 0;
}

.vsbz-link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.vsbz-link-item {
  margin: 0;
  padding: 0;
}

.vsbz-card-link,
.vsbz-card-missing {
  display: block;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}

.vsbz-card-link {
  color: var(--vp-c-brand-1);
}

.vsbz-card-link:visited {
  color: var(--vp-c-brand-2);
}

.vsbz-card-link:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
  color: var(--vp-c-brand-2);
}

.vsbz-card-missing {
  opacity: 0.7;
  border-style: dashed;
}

.vsbz-card-id {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.vsbz-card-title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
}

.vsbz-card-note {
  font-size: 0.875rem;
  font-style: italic;
  color: var(--vp-c-text-3);
}
</style>
