import * as Utils from '@rsksmart/rsk3-utils';
import {formatters} from 'web3-core-helpers';
import {GetPastLogsMethod} from 'web3-core-method';
import AllEventsLogDecoder from '../../src/decoders/allEventsLogDecoder';
import AllEventsOptionsMapper from '../../src/mappers/allEventsOptionsMapper';
import AbiModel from '../../src/models/abiModel';
import AbstractContract from '../../src/abstractContract';
import AllPastEventLogsMethod from '../../src/methods/allPastEventLogsMethod';

// Mocks
jest.mock('@rsksmart/rsk3-utils');
jest.mock('web3-core-helpers');
jest.mock('../../src/decoders/allEventsLogDecoder');
jest.mock('../../src/models/abiModel');
jest.mock('../../src/mappers/allEventsOptionsMapper');
jest.mock('../../src/abstractContract');

/**
 * AllPastEventLogsMethod test
 */
describe('AllPastEventLogsMethodTest', () => {
    let allPastEventLogsMethod, allEventsLogDecoderMock, abiModelMock, allEventsOptionsMapperMock;

    beforeEach(() => {
        new AllEventsLogDecoder();
        allEventsLogDecoderMock = AllEventsLogDecoder.mock.instances[0];

        new AbiModel();
        abiModelMock = AbiModel.mock.instances[0];

        new AllEventsOptionsMapper();
        allEventsOptionsMapperMock = AllEventsOptionsMapper.mock.instances[0];

        allPastEventLogsMethod = new AllPastEventLogsMethod(
            Utils,
            formatters,
            {},
            allEventsLogDecoderMock,
            abiModelMock,
            allEventsOptionsMapperMock
        );
    });

    it('constructor check', () => {
        expect(allPastEventLogsMethod.allEventsLogDecoder).toEqual(allEventsLogDecoderMock);

        expect(allPastEventLogsMethod.abiModel).toEqual(abiModelMock);

        expect(allPastEventLogsMethod).toBeInstanceOf(GetPastLogsMethod);
    });

    it('calls beforeExecution and executes the expected methods', () => {
        new AbstractContract();
        const contractMock = AbstractContract.mock.instances[0];

        allEventsOptionsMapperMock.map.mockReturnValueOnce({mapped: true});

        formatters.inputLogFormatter.mockReturnValueOnce({options: true});

        allPastEventLogsMethod.parameters = [{}];
        allPastEventLogsMethod.beforeExecution(contractMock);

        expect(allEventsOptionsMapperMock.map).toHaveBeenCalledWith(abiModelMock, contractMock, {options: true});

        expect(formatters.inputLogFormatter).toHaveBeenCalledWith({});
    });

    it('calls afterExecution and returns the expected result', () => {
        const response = [false, false, false];

        formatters.outputLogFormatter.mockReturnValue(true);

        allEventsLogDecoderMock.decode.mockReturnValue('decoded');

        const mappedResponse = allPastEventLogsMethod.afterExecution(response);

        expect(mappedResponse).toEqual(['decoded', 'decoded', 'decoded']);

        expect(formatters.outputLogFormatter).toHaveBeenCalledTimes(3);

        expect(allEventsLogDecoderMock.decode).toHaveBeenCalledTimes(3);

        expect(allEventsLogDecoderMock.decode).toHaveBeenCalledWith(abiModelMock, true);
    });
});
