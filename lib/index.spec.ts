import { smElse, smMethod } from './index';

jest.mock('./dependency.service', () => ({
    __esModule: true,
    default: jest.fn(() => 'MOCKED_somethingElseValue'),
    something: {
        method: jest.fn(() => 'MOCKED_methodValue'),
    },
}));

describe('index', () => {
    it('works', () => {
        expect(1 + 1).toBe(2);
    });

    it('smElse returns mocked value', () => {
        expect(smElse()).toMatchInlineSnapshot(`"MOCKED_somethingElseValue"`);
    });

    it('smMethod returns mocked value', () => {
        expect(smMethod()).toMatchInlineSnapshot(`"MOCKED_methodValue"`);
    });

    it('smElse returns per test mocked value', () => {
        const somethingElseMocked = require('./dependency.service').default;
        somethingElseMocked.mockReturnValueOnce('ANOTHER_MOCKED_somethingElseValue');
        expect(smElse()).toMatchInlineSnapshot(`"ANOTHER_MOCKED_somethingElseValue"`);
    });

    it('smMethod returns per test mocked value', () => {
        const something = require('./dependency.service').something;
        something.method.mockReturnValueOnce('ANOTHER_MOCKED_methodValue');
        expect(smMethod()).toMatchInlineSnapshot(`"ANOTHER_MOCKED_methodValue"`);
    });

    it('throws error when somethingElse returns specific message', () => {
        
        // ATTEMPT 1
        // const somethingElseMocked = require('./dependency.service').default;
        // somethingElseMocked.mockReturnValueOnce('throw_error');

        // ATTEMPT 2
        jest.isolateModules(() => {
            const somethingElseMocked = require('./dependency.service').default;
            somethingElseMocked.mockReturnValueOnce('throw_error');
            // const overrideSmElse = require('./index').smElse;
            // expect(overrideSmElse).toThrow("Some error");
            // expect(require('./index').smElse).toThrow("Some error");
            // expect(smElse).toThrow(`"Some error"`);

            try { 
                require('./index');
                expect('force fail test').toBe(true);
            } catch (error) {
                // console.log('>>>>>>> error:', error);
                expect(error).toBe("Some error");
            }
        });

        // ATTEMPT 3
        // jest.doMock('./dependency.service', () => ({
        //     __esModule: true,
        //     default: jest.fn(() => 'throw_error'),
        //     something: {
        //         method: jest.fn(() => 'MOCKED_methodValue'),
        //     },
        // }));

        // ATTEMPT 4
        // jest.resetModules();
        // jest.clearAllMocks();
        // const somethingElseMocked = require('./dependency.service').default;
        // somethingElseMocked.mockReturnValueOnce('throw_error');

        // const overrideSmElse = require('./index').smElse;
        // expect(overrideSmElse).toThrow(`"Some error"`);
        // expect(smElse).toThrow(`"Some error"`);
    });

    it('throws error when something.method returns specific message', () => {
        
        // ATTEMPT 1
        // const spy = jest.spyOn(require('./dependency.service').something, 'method');
        // spy.mockReturnValueOnce('throw_error');

        // ATTEMPT 2
        jest.isolateModules(() => {
            const somethingMethodMocked = require('./dependency.service').something.method;
            somethingMethodMocked.mockReturnValueOnce('throw_error');
        //     // const overrideSmElse = require('./index').smElse;
        //     // expect(overrideSmElse).toThrow("Some error");
        //     // expect(require('./index').smElse).toThrow("Some error");
        //     // expect(smElse).toThrow(`"Some error"`);

            try { 
                require('./index');
                expect('force fail test').toBe(true);
            } catch (error) {
                // console.log('>>>>>>> error:', error);
                expect(error).toBe("Some error");
            }
        });

        // ATTEMPT 3
        // jest.doMock('./dependency.service', () => ({
        //     __esModule: true,
        //     default: jest.fn(() => 'throw_error'),
        //     something: {
        //         method: jest.fn(() => 'MOCKED_methodValue'),
        //     },
        // }));

        // ATTEMPT 4
        // jest.resetModules();
        // jest.clearAllMocks();
        // const somethingElseMocked = require('./dependency.service').default;
        // somethingElseMocked.mockReturnValueOnce('throw_error');

        // const overrideSmElse = require('./index').smElse;
        // expect(overrideSmElse).toThrow(`"Some error"`);
        // expect(smElse).toThrow(`"Some error"`);
        
    });
});
