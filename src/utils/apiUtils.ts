export function request<T>(
  url: string,
  config?: RequestInit,
): Promise<T | null> {
  return fetch(url, config)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Request to ${url} failed`);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
}
