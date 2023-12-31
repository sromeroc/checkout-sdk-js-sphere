import { StorefrontErrorResponseBody } from '@bigcommerce/checkout-sdk/payment-integration-api';

import { RequestError } from '../common/error/errors';

export default interface StoreCreditState {
    errors: StoreCreditErrorsState;
    statuses: StoreCreditStatusesState;
}

export interface StoreCreditErrorsState {
    applyError?: RequestError<StorefrontErrorResponseBody>;
}

export interface StoreCreditStatusesState {
    isApplying?: boolean;
}

export const DEFAULT_STATE: StoreCreditState = {
    errors: {},
    statuses: {},
};
