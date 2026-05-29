function formatNumber(value) {
  return new Intl.NumberFormat().format(value || 0);
}

function formatStorage(sizeInKb) {
  const bytes = Number(sizeInKb || 0) * 1000;

  if (bytes < 1000) {
    return `${Math.round(bytes)} B`;
  }

  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1000;
  let unitIndex = 0;

  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex += 1;
  }

  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}

function formatMimeLabel(value = 'other') {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export { formatDate, formatMimeLabel, formatNumber, formatStorage };
