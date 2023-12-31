import { getErrorResponse } from '../common/http-request/responses.mock';

import PaymentStrategySelector, {
    createPaymentStrategySelectorFactory,
    PaymentStrategySelectorFactory,
} from './payment-strategy-selector';
import { DEFAULT_STATE } from './payment-strategy-state';

describe('PaymentStrategySelector', () => {
    let createPaymentStrategySelector: PaymentStrategySelectorFactory;
    let selector: PaymentStrategySelector;
    let state: any;

    beforeEach(() => {
        createPaymentStrategySelector = createPaymentStrategySelectorFactory();
        state = {
            paymentStrategy: DEFAULT_STATE,
        };
    });

    describe('#getExecuteError()', () => {
        it('returns error if unable to execute', () => {
            const executeError = getErrorResponse();

            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                errors: { executeError },
            });

            expect(selector.getExecuteError()).toEqual(executeError);
        });

        it('does not returns error if able to execute', () => {
            selector = createPaymentStrategySelector(state.paymentStrategy);

            expect(selector.getExecuteError()).toBeUndefined();
        });
    });

    describe('#getFinalizeError()', () => {
        it('returns error if unable to finalize', () => {
            const finalizeError = getErrorResponse();

            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                errors: { finalizeError },
            });

            expect(selector.getFinalizeError()).toEqual(finalizeError);
        });

        it('does not returns error if able to finalize', () => {
            selector = createPaymentStrategySelector(state.paymentStrategy);

            expect(selector.getFinalizeError()).toBeUndefined();
        });
    });

    describe('#getInitializeError()', () => {
        it('returns error if unable to initialize any method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                errors: { initializeError: getErrorResponse(), initializeMethodId: 'foobar' },
            });

            expect(selector.getInitializeError()).toEqual(getErrorResponse());
        });

        it('returns error if unable to initialize specific method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                errors: { initializeError: getErrorResponse(), initializeMethodId: 'foobar' },
            });

            expect(selector.getInitializeError('foobar')).toEqual(getErrorResponse());
            expect(selector.getInitializeError('bar')).toBeUndefined();
        });

        it('does not return error if able to initialize', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                errors: {},
            });

            expect(selector.getInitializeError()).toBeUndefined();
        });
    });

    describe('#getWidgetInteractingError()', () => {
        it('returns error if widget interaction failed', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                errors: {
                    widgetInteractionError: getErrorResponse(),
                    widgetInteractionMethodId: 'foobar',
                },
            });

            expect(selector.getWidgetInteractingError()).toEqual(getErrorResponse());
        });

        it('returns error if unable to initialize specific method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                errors: { initializeError: getErrorResponse(), initializeMethodId: 'foobar' },
            });

            expect(selector.getInitializeError('foobar')).toEqual(getErrorResponse());
            expect(selector.getInitializeError('bar')).toBeUndefined();
        });

        it('does not return error if able to initialize', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                errors: {},
            });

            expect(selector.getInitializeError()).toBeUndefined();
        });
    });

    describe('#isExecuting()', () => {
        it('returns true if updating address', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                statuses: { isExecuting: true },
            });

            expect(selector.isExecuting()).toBe(true);
        });

        it('returns false if not updating address', () => {
            selector = createPaymentStrategySelector(state.paymentStrategy);

            expect(selector.isExecuting()).toBe(false);
        });
    });

    describe('#isFinalizing()', () => {
        it('returns true if selecting option', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                statuses: { isFinalizing: true },
            });

            expect(selector.isFinalizing()).toBe(true);
        });

        it('returns false if not selecting option', () => {
            selector = createPaymentStrategySelector(state.paymentStrategy);

            expect(selector.isFinalizing()).toBe(false);
        });
    });

    describe('#isInitializing()', () => {
        it('returns true if initializing any method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                statuses: { initializeMethodId: 'foobar', isInitializing: true },
            });

            expect(selector.isInitializing()).toBe(true);
        });

        it('returns true if initializing specific method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                statuses: { initializeMethodId: 'foobar', isInitializing: true },
            });

            expect(selector.isInitializing('foobar')).toBe(true);
            expect(selector.isInitializing('bar')).toBe(false);
        });

        it('returns false if not initializing method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                statuses: { initializeMethodId: undefined, isInitializing: false },
            });

            expect(selector.isInitializing()).toBe(false);
        });
    });

    describe('#isWidgetInteracting()', () => {
        it('returns true if widget interacting in any method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                statuses: { initializeMethodId: 'foobar', isWidgetInteracting: true },
            });

            expect(selector.isWidgetInteracting()).toBe(true);
        });

        it('returns true if widget interacting for a specific method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                statuses: { widgetInteractionMethodId: 'foobar', isWidgetInteracting: true },
            });

            expect(selector.isWidgetInteracting('foobar')).toBe(true);
            expect(selector.isWidgetInteracting('bar')).toBe(false);
        });

        it('returns false if widget not interacting for a specific method', () => {
            selector = createPaymentStrategySelector({
                ...state.paymentStrategy,
                statuses: { widgetInteractionMethodId: undefined, isWidgetInteracting: false },
            });

            expect(selector.isWidgetInteracting()).toBe(false);
        });
    });
});
