<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useRoute } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';
import CaseThreadNav from './components/CaseThreadNav.vue';
import RelatedLinks from './components/RelatedLinks.vue';
import GiscusComments from './components/GiscusComments.vue';
import SiteFooter from './components/SiteFooter.vue';

const route = useRoute();

const TEMPLATE_PAGE_CLASS = 'vsbz-kind-template';
const CASE_PAGE_CLASS = 'vsbz-kind-case';

function updateRootClassesForRoute(routePath: string) {
  // Email template pages live under /templates/* (and we keep this check tolerant
  // to older/alternate paths).
  const isTemplatePage = routePath.startsWith('/templates/') || routePath.startsWith('/questions/templates/');
  const isCasePage = routePath.startsWith('/cases/C-');

  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle(TEMPLATE_PAGE_CLASS, isTemplatePage);
  document.documentElement.classList.toggle(CASE_PAGE_CLASS, isCasePage);
}

let isProgrammaticSidebarClick = false;
let accordionScheduled = false;
let preferredOpenGroup: Element | null = null;

function scheduleAccordionEnforce() {
  if (accordionScheduled) return;
  accordionScheduled = true;
  requestAnimationFrame(async () => {
    accordionScheduled = false;
    await enforceSidebarAccordion();
  });
}

function isExpanded(groupEl: Element): boolean {
  // VitePress uses the `collapsed` class on the group element.
  return !groupEl.classList.contains('collapsed');
}

function clickGroupHeader(groupEl: Element) {
  const headerEl = groupEl.querySelector<HTMLElement>(':scope > .item[role="button"]');
  if (!headerEl) return;
  isProgrammaticSidebarClick = true;
  headerEl.click();
  // Reset after this tick so we don't catch our own follow-up clicks.
  queueMicrotask(() => {
    isProgrammaticSidebarClick = false;
  });
}

async function enforceSidebarAccordion() {
  await nextTick();

  const sidebarNav = document.querySelector('.VPSidebar .nav');
  if (!sidebarNav) return;

  const groups = Array.from(sidebarNav.querySelectorAll('section.VPSidebarItem.level-0.collapsible'));
  if (groups.length === 0) return;

  const routeActiveGroup =
    groups.find((g) => g.classList.contains('has-active')) ||
    groups.find((g) => g.querySelector('.VPSidebarItem.is-active, a.VPLink.active')) ||
    null;

  if (preferredOpenGroup && !sidebarNav.contains(preferredOpenGroup)) {
    preferredOpenGroup = null;
  }

  const activeGroup = preferredOpenGroup || routeActiveGroup;

  if (activeGroup) {
    if (!isExpanded(activeGroup)) {
      clickGroupHeader(activeGroup);
      await nextTick();
    }

    for (const group of groups) {
      if (group === activeGroup) continue;
      if (isExpanded(group)) {
        clickGroupHeader(group);
      }
    }
  }
}

function installSidebarAccordionListeners() {
  const sidebarNav = document.querySelector('.VPSidebar .nav');
  if (!sidebarNav) return;

  if (sidebarNav instanceof HTMLElement && sidebarNav.dataset.vsbzAccordionBound === '1') {
    return;
  }

  if (sidebarNav instanceof HTMLElement) {
    sidebarNav.dataset.vsbzAccordionBound = '1';
  }

  sidebarNav.addEventListener(
    'click',
    async (event) => {
      if (isProgrammaticSidebarClick) return;
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const header = target.closest<HTMLElement>('section.VPSidebarItem.level-0 > .item[role="button"]');
      if (!header) return;

      const group = header.closest('section.VPSidebarItem.level-0');
      if (group) preferredOpenGroup = group;

      scheduleAccordionEnforce();
    },
    { capture: false }
  );
}

onMounted(async () => {
  updateRootClassesForRoute(route.path);
  installSidebarAccordionListeners();
  scheduleAccordionEnforce();
});

watch(
  () => route.path,
  async () => {
    preferredOpenGroup = null;
    updateRootClassesForRoute(route.path);
    installSidebarAccordionListeners();
    scheduleAccordionEnforce();
  }
);
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-footer-before>
      <CaseThreadNav />
      <RelatedLinks />
    </template>

    <template #doc-after>
      <GiscusComments />
    </template>

    <template #layout-bottom>
      <SiteFooter />
    </template>
  </DefaultTheme.Layout>
</template>
