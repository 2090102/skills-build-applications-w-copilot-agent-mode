"use strict";
/**
 * API Configuration
 * Handles environment-specific API URL configuration for localhost and Codespaces
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiConfig = exports.getApiUrl = void 0;
const getApiUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    const port = process.env.PORT || 8000;
    if (codespaceName) {
        return `https://${codespaceName}-${port}.app.github.dev`;
    }
    return `http://localhost:${port}`;
};
exports.getApiUrl = getApiUrl;
const getApiConfig = () => {
    return {
        apiUrl: (0, exports.getApiUrl)(),
        port: process.env.PORT || 8000,
        environment: process.env.NODE_ENV || 'development',
        isCodespaces: !!process.env.CODESPACE_NAME,
        codespaceName: process.env.CODESPACE_NAME || 'local',
    };
};
exports.getApiConfig = getApiConfig;
//# sourceMappingURL=api.js.map