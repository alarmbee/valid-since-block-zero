// Stable import surface for the site.
// The actual data is generated at build time into `catalog.generated.ts`.
import { catalog as generatedCatalog } from './catalog.generated';

export type CatalogKind = 'question' | 'template' | 'case' | 'conclusion' | 'faq';

export type CatalogBranchLink = {
	text: string;
	targetId: string;
};

export type CatalogBranches = Record<string, CatalogBranchLink[]>;

export type CatalogRelatedLinks = {
	questions: string[];
	templates: string[];
	cases: string[];
	conclusions: string[];
	faqs: string[];
};

export type CatalogLinks = {
	questions: string[];
	templates: string[];
	cases: string[];
	conclusions: string[];
	faqs: string[];
	branches: CatalogBranches;
};

export type CatalogThread = {
	previous: string | null;
	next: string | null;
} | null;

export type CatalogItem = {
	id: string;
	title: string;
	kind: CatalogKind;
	route: string;
	tags: string[];
	links: CatalogLinks;
	thread: CatalogThread;
	status: string | null;
};

export type CatalogBacklinks = Record<string, CatalogRelatedLinks>;

export type CatalogBranchEdges = Record<string, CatalogBranches>;

export type CatalogBranchBacklink = {
	sourceId: string;
	popupId: string;
	text: string;
};

export type CatalogBranchBacklinks = Record<string, CatalogBranchBacklink[]>;

export type Catalog = {
	generatedAt: string;
	items: CatalogItem[];
	byId: Record<string, CatalogItem>;
	backlinks: CatalogBacklinks;
	branchEdges: CatalogBranchEdges;
	branchBacklinks: CatalogBranchBacklinks;
};

export const catalog: Catalog = generatedCatalog as unknown as Catalog;
