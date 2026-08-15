/**
 * API Configuration
 * Handles environment-specific API URL configuration for localhost and Codespaces
 */

export const getApiUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || 8000;

  if (codespaceName) {
    return `https://${codespaceName}-${port}.app.github.dev`;
  }

  return `http://localhost:${port}`;
};

export const getApiConfig = () => {
  return {
    apiUrl: getApiUrl(),
    port: process.env.PORT || 8000,
    environment: process.env.NODE_ENV || 'development',
    isCodespaces: !!process.env.CODESPACE_NAME,
    codespaceName: process.env.CODESPACE_NAME || 'local',
  };
};
