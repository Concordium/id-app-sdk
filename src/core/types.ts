import type {
  CommitmentsRandomness,
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
  serializedCredentialDeploymentTransaction: SerializedCredentialDeploymentDetails;
  accountAddress: string;
}

export enum Status {
  SUCCESS = "success",
  ERROR = "error",
}
export interface IDAppError {
  code: IDAppErrorCode;
  details?: string;
}

export interface RecoverAccountMsgType {
  accountAddress: string;
}

export interface RecoverAccountResponse {
  status: Status;
  message: RecoverAccountMsgType | IDAppError;
}

export interface RecoverAccountCreationRequestMessage {
  publicKey: string;
}

export interface CreateAccountCreationResponse {
  status: Status;
  message: CreateAccountResponseMsgType | IDAppError;
}

export interface CreateAccountCreationRequestMessage {
  publicKey: string;
  reason: string;
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
  credentialDeploymentTransaction: CredentialDeploymentTransaction;
  signature: HexString;
};

export interface NetworkConfiguration {
  grpcUrl: string;
  grpcPort: number;
  genesisHash: string;
  name: string;
  explorerUrl: string;
  ccdScanUrl: string;
}

export interface SerializedCredentialDeploymentDetails {
  expiry: number;
  unsignedCdiStr: string;
  randomness: CommitmentsRandomness
}

export enum IDAppErrorCode {
  AccountNotFound = 1,
  AccountCreationFailed = 2,
  NetworkError = 3,
  InvalidInput = 4,
  Unauthorized = 5,
  Timeout = 6,
  DuplicateAccountCreationRequest = 7,
  RequestRejected = 8,
  UnknownError = 99
}

