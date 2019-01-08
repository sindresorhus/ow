import nodeRequire from './require';

// Re-export Node.js fs module to make sure it doesn't get bundled with front-end applications
export default nodeRequire('fs');
