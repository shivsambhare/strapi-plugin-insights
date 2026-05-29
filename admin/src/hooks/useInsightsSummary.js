import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../pluginId';

function useInsightsSummary() {
  const { get } = useFetchClient();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchSummary() {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await get(`${PLUGIN_ID}/summary`);
      setSummary(data?.data || null);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError?.response?.data?.error?.message || 'Failed to load insights.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  return {
    error,
    fetchSummary,
    isLoading,
    summary,
  };
}

export { useInsightsSummary };
