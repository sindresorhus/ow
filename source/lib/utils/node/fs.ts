import nodeRequire from './require';

// Re-export the Node.js `fs` module to make sure it doesn't get bundled with front-end apps
export default nodeRequire('fs');
