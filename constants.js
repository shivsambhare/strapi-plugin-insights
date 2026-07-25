export const PLUGIN_ID = 'strapi-plugin-insights';
export const PLUGIN_DISPLAY_NAME = 'Insights';
export const PLUGIN_VERSION = '0.2.0';
export const DEFAULT_RANGE = '30d';
export const RANGE_OPTIONS = [
  { value: '7d', label: '7 days', days: 7 },
  { value: '30d', label: '30 days', days: 30 },
  { value: '90d', label: '90 days', days: 90 },
  { value: 'all', label: 'All time', days: null },
];

export function getRangeOption(value = DEFAULT_RANGE) {
  return RANGE_OPTIONS.find((option) => option.value === value) || RANGE_OPTIONS[1];
}
