const CHART_COLORS = ['#7b61ff', '#00a4bd', '#f29d41', '#2f6846', '#d02b20', '#6c7781'];

function getPercent(value, max) {
  if (!max) {
    return 0;
  }

  return Math.max(5, Math.round((value / max) * 100));
}

function polarToCartesian(center, radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  };
}

function describeArc(center, radius, startAngle, endAngle) {
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export { CHART_COLORS, describeArc, getPercent };
