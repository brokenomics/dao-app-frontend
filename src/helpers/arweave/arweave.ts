import Arweave from 'arweave';

// Since v1.5.1 you're now able to call the init function for the web version without options. The current URL path will be used by default. This is recommended when running from a gateway.
export const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});
