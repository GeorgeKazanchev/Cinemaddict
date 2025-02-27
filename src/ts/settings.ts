const hash = window.location.hash.replace('#', '');

export const IS_DEBUG = hash.toLowerCase() === 'debug';
