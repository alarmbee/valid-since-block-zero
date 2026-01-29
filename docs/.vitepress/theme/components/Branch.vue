<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData, withBase } from 'vitepress';
import { catalog } from '../../data/catalog';
import { appendHash, parseTargetRef } from '../utils/targetRef';

const props = withDefaults(
  defineProps<{
    popup: string;
    title?: string;
  }>(),
  {
    title: 'Kapcsolódó tartalmak'
  }
);

const { frontmatter } = useData();

const isOpen = ref(false);

const branchEntries = computed(() => {
  const popupId = String(props.popup || '').trim();
  if (!popupId) return [];

  const fm = frontmatter.value as any;
  const currentId = fm?.id ? String(fm.id) : '';

  const fmBranches = fm?.links?.branches;
  const fmPopup = fmBranches && typeof fmBranches === 'object' ? fmBranches[popupId] : null;

  let rawMap: Record<string, unknown> | null = null;
  if (fmPopup && typeof fmPopup === 'object' && !Array.isArray(fmPopup)) {
    rawMap = fmPopup as Record<string, unknown>;
  }

  // Fallback: allow reading from generated catalog (useful if frontmatter is missing in some contexts)
  if (!rawMap && currentId) {
    const catalogPopup = (catalog as any)?.byId?.[currentId]?.links?.branches?.[popupId];
    if (Array.isArray(catalogPopup)) {
      return catalogPopup
        .map((e: any) => ({ label: String(e?.text ?? ''), targetId: String(e?.targetId ?? '') }))
        .filter((e: any) => e.label && e.targetId);
    }
  }

  if (!rawMap) return [];

  return Object.entries(rawMap)
    .map(([label, targetId]) => ({ label: String(label || '').trim(), targetId: String(targetId || '').trim() }))
    .filter((e) => e.label && e.targetId)
    .sort((a, b) => a.label.localeCompare(b.label));
});

const resolved = computed(() => {
  const byId = (catalog as any).byId ?? {};
  return branchEntries.value.map((e) => {
    const parsed = parseTargetRef(e.targetId);
    const item = parsed.id ? byId[parsed.id] : null;
    if (!item) {
      return {
        label: e.label,
        targetId: e.targetId,
        title: e.targetId,
        route: '',
        missing: true
      };
    }

    return {
      label: e.label,
      targetId: e.targetId,
      title: String(item.title ?? e.targetId),
      route: appendHash(String(item.route ?? ''), parsed.hash),
      missing: false
    };
  });
});

const hasEntries = computed(() => resolved.value.length > 0);

function open() {
  if (!hasEntries.value) return;
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close();
}

function updateBodyScrollLock() {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = isOpen.value ? 'hidden' : '';
}

watch(isOpen, updateBodyScrollLock);

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onKeydown);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeydown);
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <span class="vsbz-branch">
    <button
      type="button"
      class="vsbz-branch__trigger"
      :disabled="!hasEntries"
      :aria-disabled="!hasEntries"
      @click="open"
    >
      <slot />
    </button>

    <teleport to="body">
      <div v-if="isOpen" class="vsbz-branch__overlay" role="dialog" aria-modal="true" @click.self="close">
        <div class="vsbz-branch__modal">
          <div class="vsbz-branch__header">
            <div class="vsbz-branch__title">
              <span class="vsbz-branch__title-text">{{ props.title }}</span>
            </div>
            <button type="button" class="vsbz-branch__close" aria-label="Bezárás" @click="close">×</button>
          </div>

          <div class="vsbz-branch__content">
            <ul class="vsbz-branch__list">
              <li v-for="item in resolved" :key="`${item.label}::${item.targetId}`" class="vsbz-branch__item">
                <a v-if="!item.missing" class="vsbz-branch__card" :href="withBase(item.route)" @click="close">
                  <span class="vsbz-branch__label">{{ item.label }}</span>
                  <span class="vsbz-branch__meta">
                    <span class="vsbz-branch__id">{{ item.targetId }}</span>
                    <span class="vsbz-branch__docTitle">{{ item.title }}</span>
                  </span>
                </a>

                <div v-else class="vsbz-branch__card vsbz-branch__card--missing">
                  <span class="vsbz-branch__label">{{ item.label }}</span>
                  <span class="vsbz-branch__meta">
                    <span class="vsbz-branch__id">{{ item.targetId }}</span>
                    <span class="vsbz-branch__missing">(Hiányzó hivatkozás)</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </teleport>
  </span>
</template>

<style scoped>
.vsbz-branch__trigger {
  display: inline;
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
}

.vsbz-branch__trigger:disabled {
  cursor: default;
  opacity: 0.75;
  text-decoration: none;
}

.vsbz-branch__overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

.vsbz-branch__modal {
  width: min(760px, 100%);
  max-height: min(80vh, 720px);
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.vsbz-branch__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.vsbz-branch__title-text {
  font-weight: 650;
}

.vsbz-branch__subtitle {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.vsbz-branch__close {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  width: 36px;
  height: 36px;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.vsbz-branch__close:hover {
  border-color: var(--vp-c-brand);
}

.vsbz-branch__content {
  padding: 1rem;
  overflow: auto;
  max-height: calc(min(80vh, 720px) - 62px);
}

.vsbz-branch__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.vsbz-branch__item {
  margin: 0;
}

.vsbz-branch__card {
  display: block;
  padding: 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}

.vsbz-branch__card:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft-up);
}

.vsbz-branch__card--missing {
  opacity: 0.75;
  border-style: dashed;
}

.vsbz-branch__label {
  display: block;
  font-weight: 650;
  margin-bottom: 0.35rem;
}

.vsbz-branch__meta {
  display: block;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.vsbz-branch__id {
  display: inline-block;
  font-weight: 600;
  margin-right: 0.5rem;
}

.vsbz-branch__docTitle {
  color: var(--vp-c-text-2);
}

.vsbz-branch__missing {
  font-style: italic;
}
</style>
