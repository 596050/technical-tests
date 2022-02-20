export const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      'x-api-version': '2',
    },
  }).then(res => res.json());
