import type {
  CommitmentsRandomness,
  CredentialDeploymentTransaction,
  HexString,
} from "@concordium/web-sdk";

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

export interface CreateAccountCreationResponse {
  status: Status;
  message: CreateAccountResponseMsgType | IDAppError;
}

export interface CreateAccountCreationRequestMessage {
  publicKey: string;
  reason: string;
}

export const IDAppSdkWalletConnectMethods = {
  CREATE_ACCOUNT: "create_account",
  REQUEST_VP_V1: "request_verifiable_presentation_v1",
} as const;

export type IDAppSdkWalletConnectMethods =
  (typeof IDAppSdkWalletConnectMethods)[keyof typeof IDAppSdkWalletConnectMethods];

/**
 * @deprecated Use IDAppSdkWalletConnectMethods instead.
 */
export const IDAppSdkWallectConnectMethods = IDAppSdkWalletConnectMethods;

/**
 * @deprecated Use IDAppSdkWalletConnectMethods instead.
 */
export type IDAppSdkWallectConnectMethods = IDAppSdkWalletConnectMethods;

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
  randomness: CommitmentsRandomness;
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
  UnknownError = 99,
}

export interface KeyAccountPublicKey {
  schemeId: string;
  verifyKey: string;
}

export interface KeyAccount {
  address: string;
  credential_index: number;
  is_simple_account: boolean;
  public_key: KeyAccountPublicKey;
}
