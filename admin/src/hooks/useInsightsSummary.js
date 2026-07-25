import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../pluginId';

function getFilenameFromDisposition(disposition) {
  const match = disposition?.match(/filename="([^"]+)"/);

  return match?.[1] || null;
}

function useInsightsSummary(rangeKey) {
  const { get } = useFetchClient();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  async function fetchSummary(nextRange = rangeKey) {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await get(`${PLUGIN_ID}/summary`, {
        params: {
          range: nextRange,
        },
      });
      setSummary(data?.data || null);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError?.response?.data?.error?.message || 'Failed to load insights.');
    } finally {
      setIsLoading(false);
    }
  }

  async function exportSummary(nextRange = rangeKey) {
    try {
      setIsExporting(true);
      setError(null);

      const response = await get(`${PLUGIN_ID}/export`, {
        params: {
          range: nextRange,
        },
        responseType: 'blob',
      });
      const blob = response.data instanceof Blob ? response.data : new Blob([response.data], { type: 'text/csv;charset=utf-8' });
      const link = document.createElement('a');
      const downloadUrl = window.URL.createObjectURL(blob);

      link.href = downloadUrl;
      link.download =
        getFilenameFromDisposition(response.headers?.['content-disposition']) || `strapi-insights-${nextRange}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError?.response?.data?.error?.message || 'Failed to export insights.');
    } finally {
      setIsExporting(false);
    }
  }

  useEffect(() => {
    fetchSummary(rangeKey);
  }, [rangeKey]);

  return {
    error,
    exportSummary,
    fetchSummary,
    isExporting,
    isLoading,
    summary,
  };
}

export { useInsightsSummary };
