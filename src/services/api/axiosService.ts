import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HTTPInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
}

class AxiosService {
  public http: HTTPInstance;
  private instance: AxiosInstance;

  constructor(path = '', base = process.env.NEXT_PUBLIC_BASE_URL) {
    this.instance = axios.create({
      baseURL: `${base}${path}`,
      headers: {
        'Content-Type': 'application/json',
        csrf: 'token',
      },
      withCredentials: true, // 쿠키 인증 포함
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        //401 처리
        if (error.response?.status === 401) {
          console.warn('Unauthorized');
        }
        return Promise.reject(error);
      }
    );

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
    };
  }

  private async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res: AxiosResponse<T> = await this.instance.get(url, config);
    return res.data;
  }

  private async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res: AxiosResponse<T> = await this.instance.delete(url, config);
    return res.data;
  }

  private async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res: AxiosResponse<T> = await this.instance.post(url, data, config);
    return res.data;
  }

  private async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const res: AxiosResponse<T> = await this.instance.patch(url, data, config);
    return res.data;
  }
}

export default AxiosService;
