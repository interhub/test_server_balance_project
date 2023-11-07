import ENV from './ENV';

export const IS_DEV = ENV?.NODE_ENV === 'dev';
