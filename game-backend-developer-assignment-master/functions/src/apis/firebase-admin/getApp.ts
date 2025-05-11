import type { App } from 'firebase-admin/app';
import { initializeApp } from 'firebase-admin/app';
import { memoize } from '../../utils/memoize';

// Explicit project ID for emulator use
export const getApp = memoize((): App => {
  return initializeApp({ projectId: 'demo-project' });
});

