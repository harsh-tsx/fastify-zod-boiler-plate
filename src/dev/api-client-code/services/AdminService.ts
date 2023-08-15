/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminService {

    /**
     * @param body
     * @returns any Default Response
     * @throws ApiError
     */
    public static adminLogin(
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
            url: '/v1/admin/login',
            body: body,
        });
    }

    /**
     * @param page
     * @param size
     * @param search
     * @returns any Default Response
     * @throws ApiError
     */
    public static userList(
        page: string,
        size: string,
        search?: string,
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data?: {
            list?: Array<{
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
            }>;
            total: number;
            page: number;
            size: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/admin/user-list',
            query: {
                'page': page,
                'size': size,
                'search': search,
            },
        });
    }

    /**
     * @param id
     * @returns any Default Response
     * @throws ApiError
     */
    public static userDetail(
        id: string,
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
            method: 'GET',
            url: '/v1/admin/user-detail',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @param search
     * @returns any Default Response
     * @throws ApiError
     */
    public static sessionList(
        page: string,
        size: string,
        search?: string,
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data?: {
            list?: Array<any>;
            total: number;
            page: number;
            size: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/admin/session-list',
            query: {
                'page': page,
                'size': size,
                'search': search,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @param status
     * @param type
     * @returns any Default Response
     * @throws ApiError
     */
    public static paymentList(
        page: string,
        size: string,
        status?: string,
        type?: string,
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data?: {
            list?: Array<any>;
            total: number;
            page: number;
            size: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/admin/payment-list',
            query: {
                'page': page,
                'size': size,
                'status': status,
                'type': type,
            },
        });
    }

}
