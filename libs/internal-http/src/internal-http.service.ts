import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { retryBackoff, RetryBackoffConfig } from 'backoff-rxjs'

const defaultRetryConfig: RetryBackoffConfig = {
    initialInterval: 100, // 100 ms
    maxInterval: 60 * 60 * 1000, // 1 hour
    maxRetries: 5,
    shouldRetry: error => error?.response?.status >= 500
}

@Injectable()
export class InternalHttpService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    async get<T = any>(
        url: string,
        config?: AxiosRequestConfig,
        retryConfig: RetryBackoffConfig = defaultRetryConfig
    ): Promise<AxiosResponse<T> | undefined> {
        return this.httpService.get<T>(url, config)
            .pipe(retryBackoff(retryConfig))
            .toPromise()
    }

    async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
        retryConfig: RetryBackoffConfig = defaultRetryConfig
    ): Promise<AxiosResponse<T> | undefined> {
        return this.httpService.post<T>(url, data, config)
            .pipe(retryBackoff(retryConfig))
            .toPromise()
    }

    async put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
        retryConfig: RetryBackoffConfig = defaultRetryConfig
    ): Promise<AxiosResponse<T> | undefined> {
        return this.httpService.put<T>(url, data, config)
            .pipe(retryBackoff(retryConfig))
            .toPromise()
    }

    async patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
        retryConfig: RetryBackoffConfig = defaultRetryConfig
    ): Promise<AxiosResponse<T> | undefined> {
        return this.httpService.patch<T>(url, data, config)
            .pipe(retryBackoff(retryConfig))
            .toPromise()
    }

    async delete<T = any>(
        url: string,
        config?: AxiosRequestConfig,
        retryConfig: RetryBackoffConfig = defaultRetryConfig
    ): Promise<AxiosResponse<T> | undefined> {
        return this.httpService.delete<T>(url, config)
            .pipe(retryBackoff(retryConfig))
            .toPromise()
    }
}
