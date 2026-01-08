import { defineConfig, type DefaultTheme } from "vitepress";
import { catalog } from "./data/catalog";

function sortById(a: { id: string }, b: { id: string }) {
  return String(a.id).localeCompare(String(b.id));
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type CaseStatusKey = 'open' | 'answered' | 'followup' | 'unknown';

function caseStatusKey(status: unknown): CaseStatusKey {
  if (!status) return 'unknown';
  const raw = String(status).trim().toLowerCase();
  if (raw === 'nyitott' || raw === 'open') return 'open';
  if (raw === 'megválaszolt' || raw === 'megvalaszolt' || raw === 'answered' || raw === 'reply_only') return 'answered';
  if (
    raw === 'további kérdéseket felvető' ||
    raw === 'tovabbi kerdeseket felveto' ||
    raw === 'followup' ||
    raw === 'follow_up'
  ) {
    return 'followup';
  }
  return 'unknown';
}

function caseStatusLabel(status: unknown): string {
  const key = caseStatusKey(status);
  if (key === 'open') return 'nyitott';
  if (key === 'answered') return 'megválaszolt';
  if (key === 'followup') return 'további kérdéseket felvető';
  return typeof status === 'string' && status.trim() ? status : 'ismeretlen';
}

function itemsForKind(kind: "question" | "template" | "case") {
  return catalog.items
    .filter((i) => i.kind === kind)
    .slice()
    .sort(sortById)
    .map((i) => {
      if (kind !== 'case') {
        const text = [
          '<span class="vsbz-sidebar-card">',
          `  <span class="vsbz-sidebar-card__id">${escapeHtml(i.id)}</span>`,
          `  <span class="vsbz-sidebar-card__title">${escapeHtml(i.title)}</span>`,
          '</span>'
        ].join('\n');

        return { text, link: i.route };
      }

      const statusKey = caseStatusKey((i as any).status);
      const statusLabel = escapeHtml(caseStatusLabel((i as any).status));

      const text = [
        '<span class="vsbz-sidebar-card">',
        `  <span class="vsbz-sidebar-card__id">${escapeHtml(i.id)}</span>`,
        `  <span class="vsbz-sidebar-card__title">${escapeHtml(i.title)}</span>`,
        `  <span class="vsbz-sidebar-card__status vsbz-status--${statusKey}">`,
        '    <span class="vsbz-status-dot" aria-hidden="true"></span>',
        `    <span class="vsbz-status-text">${statusLabel}</span>`,
        '  </span>',
        '</span>'
      ].join('\n');

      return { text, link: i.route };
    });
}

function itemsForConclusions() {
  return catalog.items
    .filter((i) => i.kind === 'conclusion')
    .slice()
    .sort(sortById)
    .map((i) => {
      const text = [
        '<span class="vsbz-sidebar-card">',
        `  <span class="vsbz-sidebar-card__id">${escapeHtml(i.id)}</span>`,
        `  <span class="vsbz-sidebar-card__title">${escapeHtml(i.title)}</span>`,
        '</span>'
      ].join('\n');

      return { text, link: i.route };
    });
}

type ThemeConfig = DefaultTheme.Config & {
  giscus?: {
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping?: string;
    strict?: "0" | "1";
    reactionsEnabled?: "0" | "1";
    emitMetadata?: "0" | "1";
    inputPosition?: "top" | "bottom";
    lang?: string;
    loading?: "lazy" | "eager";
    themeLight?: string;
    themeDark?: string;
  };
  siteFooter?: {
    message?: string;
    copyright?: string;
  };
  footerLinks?: Array<{ text: string; link: string }>;
};

const themeConfig: ThemeConfig = {
  siteTitle: "vsbz",
  logo: "/favicon.svg",

  nav: [
    { text: "Kérdések", link: "/questions/" },
    { text: "Email minták", link: "/templates/" },
    { text: "Esetek", link: "/cases/" },
    { text: "Következtetések", link: "/conclusions/" },
    { text: "Névjegy", link: "/about" }
  ],

  sidebar: [
    {
      text: "Alapok",
      collapsed: true,
      items: [
        { text: "Kezdőlap", link: "/" },
        { text: "Névjegy", link: "/about" },
        { text: "Forrásanyagok", link: "/hivatkozasok" }
      ]
    },
    {
      text: "Kérdések",
      collapsed: true,
      items: [{ text: "Kérdések listája", link: "/questions/" }, ...itemsForKind("question")]
    },
    {
      text: "Email minták",
      collapsed: true,
      items: [{ text: "Email minták listája", link: "/templates/" }, ...itemsForKind("template")]
    },
    {
      text: "Esetek",
      collapsed: true,
      items: [{ text: "Esetek listája", link: "/cases/" }, ...itemsForKind("case")]
    },
    {
      text: "Következtetések",
      collapsed: true,
      items: [{ text: "Következtetések listája", link: "/conclusions/" }, ...itemsForConclusions()]
    }
  ],

  socialLinks: [{ icon: "github", link: "https://github.com/alarmbee/valid-since-block-zero" }],

  editLink: {
    pattern: "https://github.com/alarmbee/valid-since-block-zero/edit/main/docs/:path",
    text: "Edit with GitHub"
  },

  search: {
    provider: "local"
  },

  siteFooter: {
    message: "Nem jogi tanácsadás — dokumentációs célú összefoglalók.",
    copyright: "© Valid Since Block Zero"
  },

  footerLinks: [
    { text: "Adatkezelés", link: "/adatkezeles" },
    { text: "Cookie", link: "/cookie" },
    { text: "Moderálás", link: "/moderalas" },
    { text: "Impresszum", link: "/impresszum" }
  ],

  // Giscus comments (GitHub Discussions)
  // Fill these values from https://giscus.app after installing the Giscus GitHub App.
  // If any required value is missing, the comments widget will not render.
  giscus: {
    repo: "alarmbee/valid-since-block-zero",
    repoId: "R_kgDOQ2JnUg",
    category: "General",
    categoryId: "DIC_kwDOQ2JnUs4C0uiB",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    lang: "hu",
    loading: "lazy",
    themeLight: "light",
    themeDark: "dark_dimmed"
  }

};

export default defineConfig({
  lang: "hu-HU",
  title: "Valid Since Block Zero",
  description: "Publikus tudástár és eset gyűjtemény a hazai kripto-validációs kötelezettséghez.",
  // custom domainhez. Repo alatti Pages-hez: "/REPO_NEVE/"
  base: "/",
  // base: "/valid-since-block-zero/",

  lastUpdated: true,
  cleanUrls: true,
  head: [
    [
      'script',
      {
        defer: '',
        'data-website-id': '5f181da4-ee72-4652-938f-39a01cdb701a',
        src: 'https://cloud.umami.is/script.js'
      }
    ]
  ],

  themeConfig
});
