export declare class ConcordiumIDAppPoup {
    private static injectPopupStyles;
    /**
     * Closes the popup and removes styles.
     */
    static closePopup(): void;
    /**
     * Injects the popup HTML and styles, then invokes the ID App deep link.
     * This function creates a popup that prompts the user to open the ID App for account activation.
     * @param param0
     */
    static invokeIdAppDeepLinkPopup({ walletConnectUri }: {
        walletConnectUri: string;
    }): Promise<void>;
    /**
     * Injects the styles for the popup into the document.
     * This method is called to ensure that the popup has the necessary styles applied.
     * @param param0
     */
    static invokeIdAppActionsPopup({ onCreateAccount, onRecoverAccount, }: {
        onCreateAccount?: () => Promise<any>;
        onRecoverAccount?: () => Promise<any>;
    }): Promise<void>;
}
