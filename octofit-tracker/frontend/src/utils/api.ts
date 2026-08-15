/**
 * API Configuration Utility
 * 
 * VITE_CODESPACE_NAME must be defined in .env.local
 * For Codespaces: VITE_CODESPACE_NAME=your-codespace-name-xyz
 * For localhost: Leave empty or use fallback (http://localhost:8000)
 * 
 * Generates API URLs:
 * - Codespaces: https://VITE_CODESPACE_NAME-8000.app.github.dev/api
 * - Localhost: http://localhost:8000/api
 */

/**
 * Get the API base URL based on environment
 */
export function getApiUrl(): string {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost
  return 'http://localhost:8000/api';
}

/**
 * Fetch data from an API endpoint
 */
export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const url = `${getApiUrl()}${endpoint}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * POST data to an API endpoint
 */
export async function postData<T>(endpoint: string, data: unknown): Promise<T> {
  try {
    const url = `${getApiUrl()}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to post to ${endpoint}:`, error);
    throw error;
  }
}

/**
 * PUT data to an API endpoint
 */
export async function putData<T>(endpoint: string, data: unknown): Promise<T> {
  try {
    const url = `${getApiUrl()}${endpoint}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to put to ${endpoint}:`, error);
    throw error;
  }
}

/**
 * DELETE data from an API endpoint
 */
export async function deleteData<T>(endpoint: string): Promise<T> {
  try {
    const url = `${getApiUrl()}${endpoint}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to delete ${endpoint}:`, error);
    throw error;
  }
}
