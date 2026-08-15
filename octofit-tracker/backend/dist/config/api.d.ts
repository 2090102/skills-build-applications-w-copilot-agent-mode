/**
 * API Configuration
 * Handles environment-specific API URL configuration for localhost and Codespaces
 */
export declare const getApiUrl: () => string;
export declare const getApiConfig: () => {
    apiUrl: string;
    port: string | number;
    environment: string;
    isCodespaces: boolean;
    codespaceName: string;
};
//# sourceMappingURL=api.d.ts.map