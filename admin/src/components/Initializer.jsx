import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';

const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  const { formatMessage } = useIntl();

  useEffect(() => {
    ref.current('strapi-plugin-insights');
  }, []);

  return formatMessage({
    id: getTranslation('plugin.name'),
    defaultMessage: 'Insights',
  });
};

export { Initializer };
