// interface IDAppSDKConfig {
//   projectId: string;
//   metadata: {
//     name: string;
//     description: string;
//     url: string;
//     icons: string[];
//   };
//   relayUrl?: string;
// }

// interface IDAppCrypto {
//   derivation_path: string
// }

export interface CCDBalance {
  amount: string;
  denom: string;
  token: string;
}

export interface CCDAccount {
  public_key: string;
  account_address: string;
  transaction_sequence_number: number;
  balances: CCDBalance[];
}

export interface RecoverAccountCreationResponse {
  status: string;
  account?: CCDAccount;
}

export interface CreateAccountCreationResponse {
  status: string;
  account?: CCDAccount;
  createAccountCredentialTx: string;
}

export interface CreateAccountCreationRequestMessage {
  public_key: string;
  reason: string;
}

export interface CCDTxResponse {
  status: string;
  transactionHash: string;
}

export interface RecoverAccountCreationRequestMessage {
  public_key: string;
}

export const IDAppSDKMethods = {
  CREATE_ACCOUNT: 'create_account',
  RECOVER_ACCOUNT: 'recover_account',
} as const;
export type IDAppSDKMethods =
  (typeof IDAppSDKMethods)[keyof typeof IDAppSDKMethods];

export class IDAppSDK {
  public static chainId: string = 'concordium:919';
  public static getCreateAccountCreationRequest(
    public_key: string,
    reason: string = 'Create account'
  ): CreateAccountCreationRequestMessage {
    return {
      public_key: public_key,
      reason,
    };
  }

  public static getRecoverAccountRecoveryRequest(
    public_key: string
  ): RecoverAccountCreationRequestMessage {
    return {
      public_key: public_key,
    };
  }

  public static getAccountByAccountAddress(
    account_address: string
  ): CCDAccount {
    return {
      public_key: '',
      account_address: account_address,
      transaction_sequence_number: 0,
      balances: [],
    };
  }

  public static submitCCDTransaction(
    signedTransaction: string
  ): Promise<CCDTxResponse> {
    console.log('Submitting transaction:', signedTransaction);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'success', transactionHash: '0x1234567890abcdef' });
      }, 1000);
    });
  }
}
