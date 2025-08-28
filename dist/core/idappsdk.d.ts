import { HexString, Network } from '@concordium/web-sdk';
import { CCDAccountKeyPair, CreateAccountCreationRequestMessage, RecoverAccountRequestMessage, SerializedCredentialDeploymentDetails, SignedCredentialDeploymentTransaction } from './types';
export declare class ConcordiumIDAppSDK {
    static chainId: string;
    /**
     *
     * @param seed Seed phrase to generate the account
     * @param network Network to use for the account
     * @param accountIndex Account index to use for the account
     * @returns
     */
    static generateAccountWithSeedPhrase(seed: string, network: Network, accountIndex?: number): CCDAccountKeyPair;
    /**
     *
     * @param publicKey Public key to use for the account
     * @param reason Description of the use of this public key
     */
    static getCreateAccountCreationRequest(publicKey: string, reason?: string): CreateAccountCreationRequestMessage;
    /**
     *
     * @param serializedCredentialDeploymentTransaction Serialized credential deployment transaction to deserialize
     * @returns Credential deployment transaction
     */
    private static deserializeCredentialDeploymentTransaction;
    /**
     *
     * @param serializedCredentialDeploymentTransaction Credential deployment transaction to sign
     * @param signingKey Signing key to use for the account
     * @returns Signed credential deployment transaction
     */
    static signCredentialTransaction(serializedCredentialDeploymentTransaction: SerializedCredentialDeploymentDetails, signingKey: HexString): Promise<SignedCredentialDeploymentTransaction>;
    /**
     *
     * @param credentialDeploymentTransaction Credential deployment transaction to submit
     * @param signature Signature to use for the account
     * @param network Network to use for the account
     * @returns Transaction hash of the submitted transaction
     */
    static submitCCDTransaction(credentialDeploymentTransaction: any, signature: HexString, network: Network): Promise<string>;
    /**
     *
     * @param publicKey Public key to use for the account
     * @param description Description of the use of this public key
     */
    static getRecoverAccountRecoveryRequest(publicKey: string, description?: string): RecoverAccountRequestMessage;
}
