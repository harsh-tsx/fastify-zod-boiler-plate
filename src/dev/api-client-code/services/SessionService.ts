/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SessionService {

    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getV1SessionCurrentSession(): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/session/current-session',
        });
    }

    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getV1SessionGameOptions(): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/session/game-options',
        });
    }

    /**
     * @param body
     * @returns any Default Response
     * @throws ApiError
     */
    public static join(
        body?: {
            amount: number;
            session_id: string;
            choice: string;
        },
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/session/join-game',
            body: body,
        });
    }

    /**
     * @param page
     * @param size
     * @param period
     * @returns any Default Response
     * @throws ApiError
     */
    public static myHistory(
        page: string,
        size: string,
        period?: 'ONE' | 'THREE' | 'FIVE' | 'TEN' | '1' | '3' | '5' | '10',
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/session/my-history',
            query: {
                'period': period,
                'page': page,
                'size': size,
            },
        });
    }

}
