import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import Layout from "./Layout.vue";
import CatalogList from "./components/CatalogList.vue";
import MailHeader from "./components/MailHeader.vue";
import CaseStatusSummary from "./components/CaseStatusSummary.vue";
import MailSendButton from "./components/MailSendButton.vue";
import DocStatusBadge from "./components/DocStatusBadge.vue";

export default {
	extends: DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		app.component("CatalogList", CatalogList);
		app.component("MailHeader", MailHeader);
		app.component("CaseStatusSummary", CaseStatusSummary);
		app.component("MailSendButton", MailSendButton);
		app.component("DocStatusBadge", DocStatusBadge);
	}
} satisfies Theme;
