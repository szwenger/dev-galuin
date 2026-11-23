import { links } from './profile';

export const ADDRESS_SENTINEL = 'TODO-ADDRESS';

/** Impressum details. Replace the placeholder address (one string per line) once it is decided; until then the Impressum says it is being added and is noindex. */
export const legal = {
  name: 'Simon Zwenger',
  address: [ADDRESS_SENTINEL] as string[],
  email: links.email,
};

export const hasAddress = !legal.address.includes(ADDRESS_SENTINEL);

if (!hasAddress) console.warn('legal.ts: the Impressum address is still the placeholder');
