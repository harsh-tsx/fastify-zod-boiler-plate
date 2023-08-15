/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @param body
     * @returns any Default Response
     * @throws ApiError
     */
    public static login(
        body?: {
            phone: string;
            password: string;
        },
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data?: {
            username?: string;
            phone?: string;
            password?: string;
            bonus?: number;
            refCode?: string;
            refId?: string;
            _id?: string;
            createdAt?: string;
            updatedAt?: string;
            token: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/login',
            body: body,
        });
    }

    /**
     * @param body
     * @returns any Default Response
     * @throws ApiError
     */
    public static register(
        body?: {
            phone: string;
            password: string;
            refCode: string;
        },
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/register',
            body: body,
        });
    }

    /**
     * @param body
     * @returns any Default Response
     * @throws ApiError
     */
    public static forgot(
        body?: {
            phone: string;
        },
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data?: {
            otp: number;
            hash: string;
            phone: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/forgot-password',
            body: body,
        });
    }

    /**
     * @param body
     * @returns any Default Response
     * @throws ApiError
     */
    public static reset(
        body?: {
            phone: string;
            password: string;
            otp: number;
            hash: string;
        },
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/reset-password',
            body: body,
        });
    }

}
