<script setup lang="ts">
import { withBase } from 'vitepress'
import { useData } from 'vitepress'

const { theme, frontmatter } = useData()
</script>

<template>
  <footer v-if="frontmatter.footer !== false" class="VPFooter">
    <div class="container">
      <ul v-if="theme.footerLinks?.length" class="links">
        <li v-for="item in theme.footerLinks" :key="item.link" class="links-item">
          <a class="links-link" :href="withBase(item.link)">{{ item.text }}</a>
        </li>
      </ul>

      <p v-if="theme.siteFooter?.message" class="message" v-html="theme.siteFooter.message"></p>
      <p v-if="theme.siteFooter?.copyright" class="copyright" v-html="theme.siteFooter.copyright"></p>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 0 12px;
  padding: 0;
  list-style: none;
}

.links-link {
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.links-link:hover {
  color: var(--vp-c-text-1);
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
