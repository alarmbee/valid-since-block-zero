// Stable import surface for the site.
// The actual data is generated at build time into `catalog.generated.ts`.
import { catalog as generatedCatalog } from './catalog.generated';

export type CatalogKind = 'question' | 'template' | 'case' | 'conclusion';

export type CatalogLinks = {
	questions: string[];
	templates: string[];
	cases: string[];
	conclusions: string[];
};

export type CatalogItem = {
	id: string;
	title: string;
	kind: CatalogKind;
	route: string;
	tags: string[];
	links: CatalogLinks;
	status: string | null;
};

export type CatalogBacklinks = Record<string, CatalogLinks>;

export type Catalog = {
	generatedAt: string;
	items: CatalogItem[];
	byId: Record<string, CatalogItem>;
	backlinks: CatalogBacklinks;
};

export const catalog: Catalog = generatedCatalog as unknown as Catalog;
