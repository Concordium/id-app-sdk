import {
  ConcordiumGRPCWebClient,
  ConcordiumHdWallet,
  serializeCredentialDeploymentPayload,
  signCredentialTransaction,
  TransactionExpiry,
  TransactionHash,
  type CredentialDeploymentTransaction,
  type HexString,
  type Network,
} from "@concordium/web-sdk";
import type {
  CCDAccountKeyPair,
  CreateAccountCreationRequestMessage,
  RecoverAccountRequestMessage,
  SerializedCredentialDeploymentDetails,
  SignedCredentialDeploymentTransaction,
} from "./types";
import { validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { getNetworkConfiguration } from "./utils";
import { GRPCTIMEOUT } from "./constants";
import JSONbig from "json-bigint";

export class ConcordiumIDAppSDK {
  public static chainId = "concordium:919"
  /**
   *
   * @param seed Seed phrase to generate the account
   * @param network Network to use for the account
   * @param accountIndex Account index to use for the account
   * @returns
   */
  public static generateAccountWithSeedPhrase(
    seed: string,
    network: Network,
    accountIndex: number = 0,
  ): CCDAccountKeyPair {
    if (!validateMnemonic(seed, wordlist)) {
      throw new Error("Invalid seed phrase");
    }
    const wallet = ConcordiumHdWallet.fromSeedPhrase(seed, network);
    // Identity Provider Index is set to 0 and Identity Index is set to 0 because identity is being manged by the Ipapp
    const publicKey = wallet
      .getAccountPublicKey(0, 0, accountIndex)
      .toString("hex");
    const signingKey = wallet
      .getAccountSigningKey(0, 0, accountIndex)
      .toString("hex");
    return {
      publicKey,
      signingKey,
    };
  }

  /**
   *
   * @param publicKey Public key to use for the account
   * @param reason Description of the use of this public key
   */
  public static getCreateAccountCreationRequest(
    publicKey: string,
    reason: string = "The account wallet is requesting and Identity to create an account",
  ): CreateAccountCreationRequestMessage {
    return {
      publicKey,
      reason,
    };
  }

  /**
   *
   * @param serializedCredentialDeploymentTransaction Serialized credential deployment transaction to deserialize
   * @returns Credential deployment transaction
   */
  private static deserializeCredentialDeploymentTransaction(
    serializedCredentialDeploymentTransaction: SerializedCredentialDeploymentDetails,
  ): CredentialDeploymentTransaction {
    const credentialDeploymentTransaction = {} as CredentialDeploymentTransaction;
    credentialDeploymentTransaction.unsignedCdi = JSONbig.parse(
      serializedCredentialDeploymentTransaction.unsignedCdiStr,
    );
    credentialDeploymentTransaction.expiry = TransactionExpiry.fromEpochSeconds(
      serializedCredentialDeploymentTransaction.expiry,
    );
    credentialDeploymentTransaction.randomness = serializedCredentialDeploymentTransaction.randomness
    return credentialDeploymentTransaction;
  }

  /**
   *
   * @param serializedCredentialDeploymentTransaction Credential deployment transaction to sign
   * @param signingKey Signing key to use for the account
   * @returns Signed credential deployment transaction
   */
  public static async signCredentialTransaction(
    serializedCredentialDeploymentTransaction: SerializedCredentialDeploymentDetails,
    signingKey: HexString,
  ): Promise<SignedCredentialDeploymentTransaction> {
    // Deserialize the credential deployment transaction

    const credentialDeploymentTransaction: CredentialDeploymentTransaction =
      ConcordiumIDAppSDK.deserializeCredentialDeploymentTransaction(
        serializedCredentialDeploymentTransaction,
      );

    const signature = await signCredentialTransaction(
      credentialDeploymentTransaction,
      signingKey,
    );

    return {
      credentialDeploymentTransaction,
      signature,
    };
  }

  /**
   *
   * @param credentialDeploymentTransaction Credential deployment transaction to submit
   * @param signature Signature to use for the account
   * @param network Network to use for the account
   * @returns Transaction hash of the submitted transaction
   */
  public static async submitCCDTransaction(
    credentialDeploymentTransaction: CredentialDeploymentTransaction,
    signature: HexString,
    network: Network,
  ): Promise<TransactionHash.Type> {
    const payload = serializeCredentialDeploymentPayload(
      [signature],
      credentialDeploymentTransaction,
    );
    const networkConfig = getNetworkConfiguration(network);
    const ccdGrpcClient = new ConcordiumGRPCWebClient(
      networkConfig.grpcUrl,
      networkConfig.grpcPort,
      {
        timeout: GRPCTIMEOUT,
      },
    );
    return await ccdGrpcClient.sendCredentialDeploymentTransaction(
      payload,
      credentialDeploymentTransaction.expiry,
    );
  }

  /**
   *
   * @param publicKey Public key to use for the account
   * @param description Description of the use of this public key
   */
  public static getRecoverAccountRecoveryRequest(
    publicKey: string,
    description: string = "Account Wallet is requesting the account address to recover",
  ): RecoverAccountRequestMessage {
    return {
      publicKey,
      description,
    };
  }
}
