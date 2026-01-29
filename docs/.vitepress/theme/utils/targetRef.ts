export type ParsedTargetRef = {
	ref: string;
	id: string;
	hash: string;
};

export function parseTargetRef(targetRef: string): ParsedTargetRef {
	const ref = String(targetRef ?? '').trim();
	if (!ref) return { ref: '', id: '', hash: '' };

	const hashIndex = ref.indexOf('#');
	if (hashIndex === -1) return { ref, id: ref, hash: '' };

	const id = ref.slice(0, hashIndex).trim();
	const rawHash = ref.slice(hashIndex + 1).trim();

	return {
		ref,
		id: id || ref,
		hash: rawHash ? `#${rawHash}` : ''
	};
}

export function appendHash(route: string, hash: string): string {
	const base = String(route ?? '');
	const h = String(hash ?? '');
	if (!base) return base;
	if (!h) return base;
	return `${base}${h}`;
}
