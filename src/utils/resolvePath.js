// JSON payloads and endpoints store paths relative to the deployed app root.
// Resolve them against the Vite base so they keep working no matter which route
// the user is currently on (e.g. "/resumeEvgenii" without a trailing slash).
const ABSOLUTE_PATH = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

export default function resolvePath(path) {
  if (!path || ABSOLUTE_PATH.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
