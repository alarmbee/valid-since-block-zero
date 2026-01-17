export type QuestionStatusKey = 'validation' | 'operations' | 'interpretation' | 'certainty' | 'unknown';

function normalizeStatus(status: unknown): string {
  if (!status) return '';
  return String(status).trim().toLowerCase();
}

const QUESTION_STATUS_MATCHERS: Array<{ key: QuestionStatusKey; values: string[] }> = [
  {
    key: 'validation',
    values: [
      'validation',
      'validálással kapcsolatos gyakorlati kérdés',
      'validalassal kapcsolatos gyakorlati kerdes',
      'practical',
      'gyakorlati'
    ]
  },
  {
    key: 'operations',
    values: [
      'operations',
      'szolgáltató működési gyakorlatát érintő kérdés',
      'szolgaltato mukodesi gyakorlatat erinto kerdes',
      'operational',
      'mukodesi'
    ]
  },
  {
    key: 'interpretation',
    values: ['interpretation', 'jogértelmezési kérdés', 'jogertelmezesi kerdes', 'legal_interpretation', 'jogertelmezes']
  },
  {
    key: 'certainty',
    values: ['certainty', 'jogbiztonságot érintő kérdés', 'jogbiztonsagot erinto kerdes', 'legal_certainty', 'jogbiztonsag']
  }
];

const QUESTION_STATUS_LABELS: Record<QuestionStatusKey, string> = {
  validation: 'validálással kapcsolatos gyakorlati kérdés',
  operations: 'szolgáltató működési gyakorlatát érintő kérdés',
  interpretation: 'jogértelmezési kérdés',
  certainty: 'jogbiztonságot érintő kérdés',
  unknown: 'ismeretlen'
};

export function questionStatusKey(status: unknown): QuestionStatusKey {
  const raw = normalizeStatus(status);
  if (!raw) return 'unknown';
  return QUESTION_STATUS_MATCHERS.find((m) => m.values.includes(raw))?.key ?? 'unknown';
}

export function questionStatusLabel(status: unknown): string {
  const key = questionStatusKey(status);
  if (key !== 'unknown') return QUESTION_STATUS_LABELS[key];
  return typeof status === 'string' && status.trim() ? status : QUESTION_STATUS_LABELS.unknown;
}
