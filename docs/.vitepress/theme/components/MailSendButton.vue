<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const { frontmatter, page } = useData()
const route = useRoute()

const props = defineProps<{
  to?: string
  subject?: string
  buttonText?: string
  maxBodyLength?: number
}>()

const displayTo = computed(() => props.to || frontmatter.value.mailto || frontmatter.value.to)
const displaySubject = computed(
  () => props.subject || frontmatter.value.subject || frontmatter.value.title || page.value.title || ''
)

const mailtoHref = ref<string>('')

function normalizeInlineText(value: string): string {
  return value.replace(/\s+/g, ' ')
}

function trimBlock(value: string): string {
  return value.replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
}

function nodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return normalizeInlineText(node.nodeValue ?? '')
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return ''

  const el = node as HTMLElement
  const tag = el.tagName.toLowerCase()

  const childrenInline = () => Array.from(el.childNodes).map(nodeToMarkdown).join('')
  const childrenBlock = () => Array.from(el.childNodes).map(nodeToMarkdown).join('')

  if (tag === 'br') return '\n'

  if (tag === 'strong' || tag === 'b') return `**${childrenInline()}**`
  if (tag === 'em' || tag === 'i') return `*${childrenInline()}*`

  if (tag === 'code') {
    // Inline code; fenced blocks are handled by <pre>.
    if (el.parentElement?.tagName.toLowerCase() === 'pre') return ''
    const text = normalizeInlineText(el.textContent ?? '')
    return text ? `\`${text}\`` : ''
  }

  if (tag === 'a') {
    const text = normalizeInlineText(el.textContent ?? '')
    const href = el.getAttribute('href') || ''
    if (!href) return text
    return `[${text || href}](${href})`
  }

  if (tag === 'pre') {
    const code = (el.textContent ?? '').replace(/\n$/, '')
    if (!code.trim()) return ''
    return `\n\n\`\`\`\n${code}\n\`\`\`\n\n`
  }

  if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
    const level = Number(tag.slice(1))
    const text = normalizeInlineText(el.textContent ?? '').trim()
    if (!text) return ''
    return `\n\n${'#'.repeat(level)} ${text}\n\n`
  }

  if (tag === 'p') {
    const text = childrenInline().trim()
    return text ? `${text}\n\n` : ''
  }

  if (tag === 'blockquote') {
    const inner = trimBlock(childrenBlock())
    if (!inner) return ''
    const quoted = inner
      .split('\n')
      .map((line) => (line.trim() ? `> ${line}` : '>'))
      .join('\n')
    return `\n\n${quoted}\n\n`
  }

  if (tag === 'hr') return `\n\n---\n\n`

  if (tag === 'ul' || tag === 'ol') {
    const isOrdered = tag === 'ol'
    const items = Array.from(el.children).filter((c) => c.tagName.toLowerCase() === 'li') as HTMLElement[]
    const lines: string[] = []
    items.forEach((li, idx) => {
      const prefix = isOrdered ? `${idx + 1}. ` : '- '
      const liText = trimBlock(nodeToMarkdown(li)).replace(/\n+/g, ' ')
      if (liText) lines.push(`${prefix}${liText}`)
    })
    return lines.length ? `\n\n${lines.join('\n')}\n\n` : ''
  }

  if (tag === 'li') {
    // Treat list item as inline-ish; nested lists are handled by parent.
    return childrenInline().trim()
  }

  // Default: unwrap.
  return childrenInline()
}

function extractBodyMarkdown(): string {
  if (typeof document === 'undefined') return ''

  const root = (document.querySelector('main .vp-doc') || document.querySelector('.vp-doc')) as HTMLElement | null
  if (!root) return ''

  const clone = root.cloneNode(true) as HTMLElement

  // Remove UI elements we don't want to include in the outgoing email body.
  clone.querySelectorAll('.mail-header, .mail-send-cta').forEach((el) => el.remove())

  const markdownish = trimBlock(nodeToMarkdown(clone))
  return markdownish
}

function buildBody(): string {
  let body = extractBodyMarkdown()

  const limit = props.maxBodyLength ?? 8000
  if (limit > 0 && body.length > limit) {
    body = `${body.slice(0, limit)}\n\n[...levél törzse rövidítve a hossza miatt...]`
  }

  return body
}

function buildMailtoHref(): string {
  const to = String(displayTo.value || '').trim()
  if (!to) return ''

  const subject = String(displaySubject.value || '').trim()
  const body = buildBody()

  // Avoid URLSearchParams here because it encodes spaces as '+', which many mail clients display literally.
  const params: string[] = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  const query = params.join('&')
  return query ? `mailto:${to}?${query}` : `mailto:${to}`
}

async function refreshHref() {
  if (typeof window === 'undefined') return
  await nextTick()
  mailtoHref.value = buildMailtoHref()
}

onMounted(() => {
  void refreshHref()
})

watch(
  () => route.path,
  () => {
    void refreshHref()
  }
)
</script>

<template>
  <a
    v-if="mailtoHref"
    class="mail-send-button"
    :href="mailtoHref"
    :aria-disabled="false"
    data-umami-event="mail_send"
    :data-umami-event-title="page.title || ''"
  >
    {{ props.buttonText ?? 'Elküldöm' }}
  </a>
</template>

<style scoped>
.mail-send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 32px auto 0;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  color: var(--vp-c-bg);
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  transition: transform 0.12s ease, filter 0.12s ease;
}

.mail-send-button:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.mail-send-button:active {
  transform: translateY(0);
}
</style>
