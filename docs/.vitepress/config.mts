import { defineConfig, type DefaultTheme } from "vitepress";
import { catalog } from "./data/catalog";
import attrs from 'markdown-it-attrs';

const markdownItAttrsPlugin = (attrs as any).default ?? attrs;

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

type CaseStatusKey = 'open' | 'answered' | 'closed' | 'followup' | 'unknown';

function caseStatusKey(status: unknown): CaseStatusKey {
  if (!status) return 'unknown';
  const raw = String(status).trim().toLowerCase();
  if (raw === 'nyitott' || raw === 'open') return 'open';
  if (raw === 'megválaszolt' || raw === 'megvalaszolt' || raw === 'answered' || raw === 'reply_only') return 'answered';
  if (
    raw === 'válasz nélkül lezárva' ||
    raw === 'valasz nelkul lezarva' ||
    raw === 'lezárt' ||
    raw === 'lezart' ||
    raw === 'closed'
  ) {
    return 'closed';
  }
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
  if (key === 'closed') return 'válasz nélkül lezárva';
  if (key === 'followup') return 'további kérdéseket felvető';
  return typeof status === 'string' && status.trim() ? status : 'ismeretlen';
}

type QuestionStatusKey = 'validation' | 'operations' | 'interpretation' | 'certainty' | 'unknown';

type ConclusionStatusKey = 'hot' | 'high' | 'medium' | 'low' | 'unknown';

function questionStatusKey(status: unknown): QuestionStatusKey {
  if (!status) return 'unknown';
  const raw = String(status).trim().toLowerCase();

  if (raw === 'validation') return 'validation';
  if (raw === 'operations') return 'operations';
  if (raw === 'interpretation') return 'interpretation';
  if (raw === 'certainty') return 'certainty';

  if (raw === 'validálással kapcsolatos gyakorlati kérdés' || raw === 'validalassal kapcsolatos gyakorlati kerdes') return 'validation';
  if (raw === 'szolgáltató működési gyakorlatát érintő kérdés' || raw === 'szolgaltato mukodesi gyakorlatat erinto kerdes') return 'operations';
  if (raw === 'jogértelmezési kérdés' || raw === 'jogertelmezesi kerdes') return 'interpretation';
  if (raw === 'jogbiztonságot érintő kérdés' || raw === 'jogbiztonsagot erinto kerdes') return 'certainty';

  if (raw === 'validation' || raw === 'practical' || raw === 'gyakorlati') return 'validation';
  if (raw === 'operations' || raw === 'operational' || raw === 'mukodesi') return 'operations';
  if (raw === 'interpretation' || raw === 'legal_interpretation' || raw === 'jogertelmezes') return 'interpretation';
  if (raw === 'certainty' || raw === 'legal_certainty' || raw === 'jogbiztonsag') return 'certainty';

  return 'unknown';
}

function questionStatusIconClass(key: QuestionStatusKey): string {
  if (key === 'validation') return 'fa-solid fa-shield-halved';
  if (key === 'operations') return 'fa-solid fa-gears';
  if (key === 'interpretation') return 'fa-solid fa-gavel';
  if (key === 'certainty') return 'fa-solid fa-triangle-exclamation';
  return 'fa-regular fa-circle-question';
}

function conclusionStatusKey(status: unknown): ConclusionStatusKey {
  if (!status) return 'unknown';
  const raw = String(status).trim().toLowerCase();
  if (raw === 'hot') return 'hot';
  if (raw === 'legégetőbb' || raw === 'leggetobb' || raw === 'égető' || raw === 'egeto') return 'hot';
  if (raw === 'magas' || raw === 'high' || raw === 'súlyos' || raw === 'sulyos') return 'high';
  if (raw === 'közepes' || raw === 'kozepes' || raw === 'medium') return 'medium';
  if (raw === 'alacsony' || raw === 'low') return 'low';
  return 'unknown';
}

function conclusionStatusLabel(status: unknown): string {
  const key = conclusionStatusKey(status);
  if (key === 'hot') return 'HOT';
  if (key === 'high') return 'magas';
  if (key === 'medium') return 'közepes';
  if (key === 'low') return 'alacsony';
  return typeof status === 'string' && status.trim() ? status : 'ismeretlen';
}

function conclusionStatusIconClass(key: ConclusionStatusKey): string {
  if (key === 'hot') return 'fa-solid fa-fire-flame-curved';
  if (key === 'high') return 'fa-solid fa-temperature-high';
  if (key === 'medium') return 'fa-solid fa-temperature-half';
  if (key === 'low') return 'fa-solid fa-temperature-low';
  return 'fa-regular fa-circle-question';
}

function caseStatusIconClass(key: CaseStatusKey): string {
  if (key === 'open') return 'fa-solid fa-hourglass-half';
  if (key === 'answered') return 'fa-solid fa-circle-check';
  if (key === 'closed') return 'fa-solid fa-lock';
  if (key === 'followup') return 'fa-solid fa-circle-question';
  return 'fa-regular fa-circle-question';
}

function questionStatusLabel(status: unknown): string {
  const key = questionStatusKey(status);
  if (key === 'validation') return 'validálással kapcsolatos gyakorlati kérdés';
  if (key === 'operations') return 'szolgáltató működési gyakorlatát érintő kérdés';
  if (key === 'interpretation') return 'jogértelmezési kérdés';
  if (key === 'certainty') return 'jogbiztonságot érintő kérdés';
  return typeof status === 'string' && status.trim() ? status : 'ismeretlen';
}

function itemsForKind(kind: "question" | "template" | "case") {
  return catalog.items
    .filter((i) => i.kind === kind)
    .filter((i) => {
      if (kind !== 'case') return true;
      const prev = (i as any).thread?.previous;
      return !prev;
    })
    .slice()
    .sort(sortById)
    .map((i) => {
      if (kind === 'template') {
        const text = [
          '<span class="vsbz-sidebar-card">',
          `  <span class="vsbz-sidebar-card__id">${escapeHtml(i.id)}</span>`,
          `  <span class="vsbz-sidebar-card__title">${escapeHtml(i.title)}</span>`,
          '</span>'
        ].join('\n');

        return { text, link: i.route };
      }

      if (kind === 'question') {
        const statusKey = questionStatusKey((i as any).status);
        const statusLabel = escapeHtml(questionStatusLabel((i as any).status));
        const iconClass = escapeHtml(questionStatusIconClass(statusKey));

        const text = [
          '<span class="vsbz-sidebar-card">',
          `  <span class="vsbz-sidebar-card__id">${escapeHtml(i.id)}</span>`,
          `  <span class="vsbz-sidebar-card__title">${escapeHtml(i.title)}</span>`,
          `  <span class="vsbz-sidebar-card__status vsbz-qstatus--${statusKey}" data-tooltip="${statusLabel}">`,
          `    <i class="vsbz-status-fa ${iconClass}" aria-hidden="true"></i>`,
          '  </span>',
          '</span>'
        ].join('\n');

        return { text, link: i.route };
      }

      const statusKey = caseStatusKey((i as any).status);
      const statusLabel = escapeHtml(caseStatusLabel((i as any).status));
      const iconClass = escapeHtml(caseStatusIconClass(statusKey));

      const text = [
        '<span class="vsbz-sidebar-card">',
        `  <span class="vsbz-sidebar-card__id">${escapeHtml(i.id)}</span>`,
        `  <span class="vsbz-sidebar-card__title">${escapeHtml(i.title)}</span>`,
        `  <span class="vsbz-sidebar-card__status vsbz-status--${statusKey}" data-tooltip="${statusLabel}">`,
        `    <i class="vsbz-status-fa ${iconClass}" aria-hidden="true"></i>`,
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
      const statusKey = conclusionStatusKey((i as any).status);
      const statusLabel = escapeHtml(conclusionStatusLabel((i as any).status));
      const iconClass = escapeHtml(conclusionStatusIconClass(statusKey));

      const cardClass = statusKey === 'hot' ? 'vsbz-sidebar-card vsbz-sidebar-card--hot' : 'vsbz-sidebar-card';

      const text = [
        `<span class="${cardClass}">`,
        `  <span class="vsbz-sidebar-card__id">${escapeHtml(i.id)}</span>`,
        `  <span class="vsbz-sidebar-card__title">${escapeHtml(i.title)}</span>`,
        statusKey !== 'unknown'
          ? `  <span class="vsbz-sidebar-card__status vsbz-cstatus--${statusKey}" data-tooltip="${statusLabel}">\n    <i class="vsbz-status-fa ${iconClass}" aria-hidden="true"></i>\n  </span>`
          : '',
        '</span>'
      ].join('\n');

      return { text, link: i.route };
    });
}

function itemsForFaq() {
  return catalog.items
    .filter((i) => i.kind === 'faq')
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
    { text: "GYIK", link: "/faq/" },
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
        { text: "Hogy tudsz segíteni?", link: "/hogy-tudsz-segiteni" },
        { text: "Forrásanyagok", link: "/hivatkozasok" }
      ]
    },
    {
      text: "GYIK",
      collapsed: true,
      items: [{ text: "GYIK tájékoztató", link: "/faq/" }, ...itemsForFaq()]
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
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
      }
    ],
    [
      'script',
      {
        defer: '',
        'data-website-id': '5f181da4-ee72-4652-938f-39a01cdb701a',
        src: 'https://cloud.umami.is/script.js'
      }
    ]
  ],

  markdown: {
    config(md) {
      md.use(markdownItAttrsPlugin as any);
    }
  },

  themeConfig
});
