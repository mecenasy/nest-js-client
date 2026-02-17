const defaultProtocol =
  typeof window !== 'undefined' && window.location && window.location.protocol
    ? window.location.protocol.replace(':', '')
    : 'http';
const protocol = API_HOST_PROTOCOL || defaultProtocol;
const host = API_HOST_URL || 'localhost';
const port = API_HOST_PORT;
const basePath = `${protocol}://${host}${port ? `:${port}` : ''}`;

const authorizationHeaders = {
  'Content-Type': 'application/json',
};

export { basePath, authorizationHeaders };
