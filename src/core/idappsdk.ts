import {
  ConcordiumGRPCWebClient,
  ConcordiumHdWallet,
  serializeCredentialDeploymentPayload,
  signCredentialTransaction,
  TransactionExpiry,
  type CredentialDeploymentTransaction,
  type HexString,
  type Network,
} from "@concordium/web-sdk";
import type {
  CCDAccountKeyPair,
  CreateAccountCreationRequestMessage,
  KeyAccount,
  SerializedCredentialDeploymentDetails,
  SignedCredentialDeploymentTransaction,
} from "./types";
import { validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { formatChainId, getNetworkConfiguration } from "./utils";
import { GRPCTIMEOUT, mainnet, testnet } from "./constants";
import JSONbig from "json-bigint";

export class ConcordiumIDAppSDK {
  // public static chainId = "concordium: ";
  public static chainId = {
    Mainnet: formatChainId(mainnet.genesisHash),
    Testnet: formatChainId(testnet.genesisHash),
  };
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
    // Identity Provider Index is set to 0 and Identity Index is set to 0 because identity is being managed by the ID App
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
    reason: string = "The account wallet is requesting an identity to create an account",
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
    const credentialDeploymentTransaction =
      {} as CredentialDeploymentTransaction;
    credentialDeploymentTransaction.unsignedCdi = JSONbig.parse(
      serializedCredentialDeploymentTransaction.unsignedCdiStr,
    );
    credentialDeploymentTransaction.expiry = TransactionExpiry.fromEpochSeconds(
      serializedCredentialDeploymentTransaction.expiry,
    );
    credentialDeploymentTransaction.randomness =
      serializedCredentialDeploymentTransaction.randomness;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    credentialDeploymentTransaction: any,
    signature: HexString,
    network: Network,
  ): Promise<string> {
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
    const tx = await ccdGrpcClient.sendCredentialDeploymentTransaction(
      payload,
      credentialDeploymentTransaction.expiry,
    );
    return tx.toString();
  }

  /**
   * Fetches all Concordium key accounts associated with a given public key
   * from the wallet-proxy service for the specified network.
   *
   * This function calls:
   *   GET <explorerUrl>/v0/keyAccounts/<publicKey>
   *
   * It automatically selects the correct explorer URL based on whether the
   * network is "Mainnet" or "Testnet", validates the API response, and returns
   * the list of matching key accounts.
   */
  public static async getKeyAccounts(
    publicKey: string,
    network: Network,
  ): Promise<KeyAccount[]> {
    if (!publicKey) {
      throw new Error("Public key is required.");
    }

    const config = network === "Mainnet" ? mainnet : testnet;

    const url = `${config.explorerUrl}/v0/keyAccounts/${encodeURIComponent(
      publicKey,
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // API error format:
      // { error: 1, errorMessage: "..." }
      if (!response.ok || data?.error === 1) {
        throw new Error(data?.errorMessage || "Unknown API error");
      }

      if (!Array.isArray(data)) {
        throw new Error("Unexpected API response format.");
      }

      return data as KeyAccount[];
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("Failed to fetch key accounts.");
    }
  }
}
