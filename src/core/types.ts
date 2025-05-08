import type {
  AccountAddress,
  CredentialDeploymentDetails,
  CredentialDeploymentTransaction,
  HexString,
} from "@concordium/web-sdk";

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



export interface CreateAccountResponseMsgType {
  credentialDeploymentTransaction: CredentialDeploymentTransaction;
  accountAddress: AccountAddress.Type;
}

enum Status {
  SUCCESS = "success",
  ERROR = "error",
}
export interface Error{
  code: number; 
  details: string;
}

interface RecoverAccountMsgType{
  accountAddress: AccountAddress.Type;
}


export interface RecoverAccountResponse {
  status: Status;
  message: RecoverAccountMsgType | Error;
}
export interface CreateAccountResponse {
  status: Status;
  message: CreateAccountResponseMsgType | Error;
}

export interface CreateAccountRequestMessage {
  publicKey: string;
  description: string;
}

export interface RecoverAccountRequestMessage {
  publicKey: string;
  description: string;
}

export const IDAppSdkWallectConnectMethods = {
  CREATE_ACCOUNT: "create_account",
  RECOVER_ACCOUNT: "recover_account",
} as const;

export type IDAppSdkWallectConnectMethods =
  (typeof IDAppSdkWallectConnectMethods)[keyof typeof IDAppSdkWallectConnectMethods];

export interface CCDAccountKeyPair {
  publicKey: string;
  signingKey: string;
}

export type SignedCredentialDeploymentTransaction = {
  credentialDeploymentTransaction: CredentialDeploymentDetails;
  signature: HexString;
  accountAddress: AccountAddress.Type;
};

export interface NetworkConfiguration {
  grpcUrl: string;
  grpcPort: number;
  genesisHash: string;
  name: string;
  explorerUrl: string;
  ccdScanUrl: string;
}
