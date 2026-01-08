import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import Layout from "./Layout.vue";
import CatalogList from "./components/CatalogList.vue";
import MailHeader from "./components/MailHeader.vue";
import CaseStatusSummary from "./components/CaseStatusSummary.vue";

export default {
	extends: DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		app.component("CatalogList", CatalogList);
		app.component("MailHeader", MailHeader);
		app.component("CaseStatusSummary", CaseStatusSummary);
	}
} satisfies Theme;
