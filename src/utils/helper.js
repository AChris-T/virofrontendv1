import { googleUserInfoUrl } from './constant';

export async function fetchGoogleUserInfo(accessToken) {
  const response = await fetch(googleUserInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMsg =
      errorBody?.error_description || 'Failed to fetch Google user info';
    throw new Error(errorMsg);
  }

  const data = await response.json();

  const { name, email, picture } = data;

  if (!name || !email) {
    throw new Error('Incomplete user info returned from Google');
  }

  return { name, email, picture };
}

export function maskEmail(email) {
  const [name, domain] = email.split('@');
  const visible = name.slice(-6);
  return `*****${visible}@${domain}`;
}
