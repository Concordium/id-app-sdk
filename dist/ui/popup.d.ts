export declare class ConcordiumIDAppPoup {
    private static injectPopupStyles;
    static closePopup(): void;
    static invokeIdAppDeepLinkPopup({ onIdAppPopup }: {
        onIdAppPopup: Function;
    }): Promise<void>;
    static invokeIdAppActionsPopup({ onCreateAccount, onRecoverAccount, }: {
        onCreateAccount: () => Promise<any>;
        onRecoverAccount: () => Promise<any>;
    }): Promise<void>;
}
