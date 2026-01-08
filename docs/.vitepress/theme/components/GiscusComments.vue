<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";

type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
  strict?: "0" | "1";
  reactionsEnabled?: "0" | "1";
  emitMetadata?: "0" | "1";
  inputPosition?: "top" | "bottom";
  lang?: string;
  loading?: "lazy" | "eager";
  themeLight?: string;
  themeDark?: string;
};

const container = ref<HTMLElement | null>(null);

const { theme, frontmatter, isDark } = useData();
const route = useRoute();

const giscus = computed<GiscusConfig | null>(() => {
  const cfg = (theme.value as any)?.giscus as Partial<GiscusConfig> | undefined;
  if (!cfg) return null;

  const required: Array<keyof GiscusConfig> = ["repo", "repoId", "category", "categoryId"];
  for (const k of required) {
    if (!cfg[k] || String(cfg[k]).trim() === "") return null;
  }

  return {
    repo: String(cfg.repo),
    repoId: String(cfg.repoId),
    category: String(cfg.category),
    categoryId: String(cfg.categoryId),
    mapping: cfg.mapping ?? "pathname",
    strict: cfg.strict ?? "0",
    reactionsEnabled: cfg.reactionsEnabled ?? "1",
    emitMetadata: cfg.emitMetadata ?? "0",
    inputPosition: cfg.inputPosition ?? "top",
    lang: cfg.lang ?? "hu",
    loading: cfg.loading ?? "lazy",
    themeLight: cfg.themeLight ?? "light",
    themeDark: cfg.themeDark ?? "dark_dimmed"
  };
});

const commentsEnabled = computed(() => {
  const fm = frontmatter.value as any;
  if (fm?.comments === false) return false;
  return true;
});

function currentThemeName() {
  const cfg = giscus.value;
  if (!cfg) return "light";
  return isDark.value ? cfg.themeDark ?? "dark_dimmed" : cfg.themeLight ?? "light";
}

function clearContainer() {
  if (!container.value) return;
  container.value.innerHTML = "";
}

function mountGiscus() {
  if (typeof window === "undefined") return;
  if (!container.value) return;
  const cfg = giscus.value;
  if (!cfg) return;

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";

  script.setAttribute("data-repo", cfg.repo);
  script.setAttribute("data-repo-id", cfg.repoId);
  script.setAttribute("data-category", cfg.category);
  script.setAttribute("data-category-id", cfg.categoryId);
  script.setAttribute("data-mapping", cfg.mapping ?? "pathname");
  script.setAttribute("data-strict", cfg.strict ?? "0");
  script.setAttribute("data-reactions-enabled", cfg.reactionsEnabled ?? "1");
  script.setAttribute("data-emit-metadata", cfg.emitMetadata ?? "0");
  script.setAttribute("data-input-position", cfg.inputPosition ?? "top");
  script.setAttribute("data-lang", cfg.lang ?? "hu");
  script.setAttribute("data-loading", cfg.loading ?? "lazy");
  script.setAttribute("data-theme", currentThemeName());

  container.value.appendChild(script);
}

function sendThemeToIframe() {
  if (typeof window === "undefined") return;
  const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
  if (!iframe?.contentWindow) return;

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: currentThemeName()
        }
      }
    },
    "https://giscus.app"
  );
}

async function reload() {
  if (!commentsEnabled.value) return;
  if (!giscus.value) return;

  await nextTick();
  clearContainer();
  mountGiscus();
}

onMounted(() => {
  void reload();
});

watch(
  () => route.path,
  () => {
    void reload();
  }
);

watch(
  () => isDark.value,
  () => {
    sendThemeToIframe();
  }
);
</script>

<template>
  <div v-if="commentsEnabled && giscus" class="vsbz-comments">
    <div ref="container" />
  </div>
</template>

<style scoped>
.vsbz-comments {
  margin-top: 1.25rem;
}
</style>
