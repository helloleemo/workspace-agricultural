const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // 產品相關 API
  async getProducts() {
    return this.request<any[]>('/products');
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  async createProduct(data: {
    name: string;
    description: string;
    mainImage: string;
    detailImages: string[];
    productTypes: any[];
  }) {
    return this.request<any>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      mainImage: string;
      detailImages: string[];
    }>,
  ) {
    return this.request<any>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request<any>(`/products/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
