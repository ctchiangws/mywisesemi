import { BpmInboxItem, BpmRequestItem, BpmSummary } from '@/types';

// Use the same hostname the portal is being browsed with (e.g. "mywisesemi" or
// "172.16.0.209") so the BPM session cookie — which is scoped to the hostname the
// user logged in on — is shared with the portal's /bpm-api requests.
export const BPM_BASE_URL = `http://${window.location.hostname}:8888`;
export const BPM_LOGIN_URL = `${BPM_BASE_URL}/login/`;

// Same-origin prefix proxied to the BPM server by nginx (prod) / vite (dev),
// so the browser never makes a cross-origin request.
const BPM_API_PREFIX = '/bpm-api';

async function fetchBpmSummary<T>(path: string): Promise<BpmSummary<T>> {
  const response = await fetch(`${BPM_API_PREFIX}${path}`, {
    credentials: 'include',
  });
  if (response.status === 401) {
    return { authenticated: false };
  }
  if (!response.ok) {
    throw new Error(`BPM request failed: ${response.status}`);
  }
  return response.json();
}

export const bpmApi = {
  getInboxSummary: (): Promise<BpmSummary<BpmInboxItem>> =>
    fetchBpmSummary<BpmInboxItem>('/inbox/'),

  getMyRequestsSummary: (): Promise<BpmSummary<BpmRequestItem>> =>
    fetchBpmSummary<BpmRequestItem>('/my-requests/'),
};
