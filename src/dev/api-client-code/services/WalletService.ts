/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WalletService {

    /**
     * @param body
     * @returns any Default Response
     * @throws ApiError
     */
    public static initiateDeposit(
        body?: {
            amount: number;
        },
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/wallet/initiate-deposit',
            body: body,
        });
    }

    /**
     * @param page
     * @param size
     * @param status
     * @param type
     * @param search
     * @returns any Default Response
     * @throws ApiError
     */
    public static history(
        page: string,
        size: string,
        status?: 'PENDING' | 'SUCCESS' | 'FAILED',
        type?: 'FAILED' | 'BONUS' | 'DEPOSIT' | 'WITHDRAW' | 'COUPON' | 'GAMEJOINED',
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
            url: '/v1/wallet/history',
            query: {
                'status': status,
                'type': type,
                'page': page,
                'size': size,
                'search': search,
            },
        });
    }

    /**
     * @param paymentId
     * @param file
     * @returns any Default Response
     * @throws ApiError
     */
    public static postV1WalletUpdateDeposit(
        paymentId: string,
        file: Blob,
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/wallet/update-deposit',
            formData: {
                'payment_id': paymentId,
                'file': file,
            },
        });
    }

}
