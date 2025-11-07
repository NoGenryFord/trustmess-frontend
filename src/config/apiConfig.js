import axios from 'axios';

// Get list of URLs drom .env
const getApiUrls = () => {
  const urls = import.meta.env.production.VITE_FASTAPI_SERVER;
  if (!urls) {
    return ['http://localhost:8000'];
  }
  return urls.split(',').map((url) => url.trim());
};

// Check API
const pingApi = async (url) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 500);

    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;

    await axios.get(cleanUrl, {
      signal: controller.signal,
      timeout: 2000,
    });

    clearTimeout(timeoutId);
    console.log(`Api avaible: ${url}`);
    return true;
  } catch (error) {
    console.log(`Api unavaible: ${url}`);
    return false;
  }
};

const findWorkingApi = async () => {
  const urls = getApiUrls();
  console.log('Search working API in:', urls);

  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const isWorking = await pingApi(url);
      if (isWorking) {
        return url;
      }

      throw new Error(`${url} is not avaible`);
    }),
  );

  // Find first avaible

  const workingUrl = results.find((result) => result.status === 'fulfilled');

  if (workingUrl) {
    const apiUrl = workingUrl.value.endsWith('/') ? workingUrl.value : workingUrl.value + '/';
    console.log('Use Api: ', apiUrl);
    return apiUrl;
  }

  console.warn('All APIs are not avaibles, return fallback', urls[0]);
  return urls[0].endsWith('/') ? urls[0] : urls[0] + '/';
};

let cachedApiUrl = null;

export const getApiUrl = async () => {
  if (cachedApiUrl) {
    return cachedApiUrl;
  }

  cachedApiUrl = await findWorkingApi();
  return cachedApiUrl;
};

export const refreshApiUrl = async () => {
  cachedApiUrl = null;
  return await getApiUrl();
};
