import React from 'react';

export const lazyImport= (file:string) => React.lazy(() => import(`@/${file}`));