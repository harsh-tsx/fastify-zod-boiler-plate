/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param username
     * @returns any Default Response
     * @throws ApiError
     */
    public static updateNickname(
        username: string,
    ): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/update-nickname',
            query: {
                'username': username,
            },
        });
    }

    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static me(): CancelablePromise<{
        status: boolean;
        message: string;
        data: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/me',
        });
    }

}
