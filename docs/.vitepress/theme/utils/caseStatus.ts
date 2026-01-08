export type CaseStatusKey = 'open' | 'answered' | 'followup' | 'unknown';

function normalizeStatus(status: unknown): string {
  if (!status) return '';
  return String(status).trim().toLowerCase();
}

const CASE_STATUS_MATCHERS: Array<{ key: CaseStatusKey; values: string[] }> = [
  { key: 'open', values: ['nyitott', 'open'] },
  {
    key: 'answered',
    values: ['megválaszolt', 'megvalaszolt', 'answered', 'reply_only', 'closed'],
  },
  {
    key: 'followup',
    values: [
      'további kérdéseket felvető',
      'tovabbi kerdeseket felveto',
      'followup',
      'follow_up',
      'pending',
      'in_progress',
    ],
  },
];

const CASE_STATUS_LABELS: Record<CaseStatusKey, string> = {
  open: 'nyitott',
  answered: 'megválaszolt',
  followup: 'további kérdéseket felvető',
  unknown: 'ismeretlen',
};

export function caseStatusKey(status: unknown): CaseStatusKey {
  const raw = normalizeStatus(status);
  if (!raw) return 'unknown';
  return CASE_STATUS_MATCHERS.find((m) => m.values.includes(raw))?.key ?? 'unknown';
}

export function caseStatusLabel(status: unknown): string {
  const key = caseStatusKey(status);
  if (key !== 'unknown') return CASE_STATUS_LABELS[key];
  return typeof status === 'string' && status.trim() ? status : CASE_STATUS_LABELS.unknown;
}
