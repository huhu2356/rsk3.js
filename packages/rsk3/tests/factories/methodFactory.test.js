import {
    CallMethod,
    ChainIdMethod,
    EstimateGasMethod,
    EthSendTransactionMethod,
    GetBalanceMethod,
    GetBlockNumberMethod,
    GetCodeMethod,
    GetCoinbaseMethod,
    GetGasPriceMethod,
    GetHashrateMethod,
    GetNodeInfoMethod,
    GetPastLogsMethod,
    GetProtocolVersionMethod,
    GetStorageAtMethod,
    GetTransactionCountMethod,
    GetTransactionMethod,
    GetPendingTransactionsMethod,
    GetTransactionReceiptMethod,
    GetWorkMethod,
    IsMiningMethod,
    IsSyncingMethod,
    RequestAccountsMethod,
    SendRawTransactionMethod,
    SubmitWorkMethod,
    VersionMethod,
    GetProofMethod
} from 'web3-core-method';
import * as Utils from '@rsksmart/rsk3-utils';
import {formatters} from 'web3-core-helpers';
import MethodFactory from '../../src/factories/methodFactory';
import GetBlockMethod from '../../src/methods/getBlockMethod';
import GetUncleMethod from '../../src/methods/getUncleMethod';
import GetBlockTransactionCountMethod from '../../src/methods/getBlockTransactionCountMethod';
import GetBlockUncleCountMethod from '../../src/methods/getBlockUncleCountMethod';
import GetTransactionFromBlockMethod from '../../src/methods/getTransactionFromBlockMethod';
import RskSignTransactionMethod from '../../src/methods/rskSignTransactionMethod';
import RskSignMethod from '../../src/methods/rskSignMethod';
import RskGetAccountsMethod from '../../src/methods/rskGetAccountsMethod';

jest.mock('rsk3-utils');
jest.mock('web3-core-helpers');

/**
 * MethodFactory test
 */
describe('MethodFactoryTest', () => {
    let methodFactory;

    beforeEach(() => {
        methodFactory = new MethodFactory(Utils, formatters);
    });

    it('constructor check', () => {
        expect(methodFactory.utils).toEqual(Utils);

        expect(methodFactory.formatters).toEqual(formatters);
    });

    it('JSON-RPC methods check', () => {
        expect(methodFactory.methods).toEqual({
            getNodeInfo: GetNodeInfoMethod,
            getProtocolVersion: GetProtocolVersionMethod,
            getCoinbase: GetCoinbaseMethod,
            isMining: IsMiningMethod,
            getHashrate: GetHashrateMethod,
            isSyncing: IsSyncingMethod,
            getGasPrice: GetGasPriceMethod,
            getAccounts: RskGetAccountsMethod,
            getBlockNumber: GetBlockNumberMethod,
            getBalance: GetBalanceMethod,
            getStorageAt: GetStorageAtMethod,
            getCode: GetCodeMethod,
            getBlock: GetBlockMethod,
            getUncle: GetUncleMethod,
            getBlockTransactionCount: GetBlockTransactionCountMethod,
            getBlockUncleCount: GetBlockUncleCountMethod,
            getTransaction: GetTransactionMethod,
            getPendingTransactions: GetPendingTransactionsMethod,
            getTransactionFromBlock: GetTransactionFromBlockMethod,
            getTransactionReceipt: GetTransactionReceiptMethod,
            getTransactionCount: GetTransactionCountMethod,
            sendSignedTransaction: SendRawTransactionMethod,
            signTransaction: RskSignTransactionMethod,
            sendTransaction: EthSendTransactionMethod,
            sign: RskSignMethod,
            call: CallMethod,
            estimateGas: EstimateGasMethod,
            submitWork: SubmitWorkMethod,
            getWork: GetWorkMethod,
            getPastLogs: GetPastLogsMethod,
            requestAccounts: RequestAccountsMethod,
            getChainId: ChainIdMethod,
            getId: VersionMethod,
            getProof: GetProofMethod
        });
    });
});
