import { IDAPP_HOSTS } from "../core";
import concordiumLogo from "../../public/concordium_logo.svg";
import appStoreLogo from "../../public/app_store.svg";
import playStoreLogo from "../../public/play_store.svg";

export class ConcordiumIDAppPoup {
  private static injectPopupStyles() {
    if (document.getElementById("sdk-popup-styles")) return;

    const style = document.createElement("style");
    style.id = "sdk-popup-styles";
    style.innerHTML = `
    .authCode {
      margin: 16px auto; 
      width: 80px;
      height: 80px;
      border: 2px solid #0047ab; /* Deep blue border */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      font-size: 20px;
      color: #0047ab;
      background: radial-gradient(circle, #f7f7f7 0%, #ffffff 100%);
    }
    .sdk-popup-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .sdk-popup-box {
      position: relative;
      background: #fff;
      border-radius: 12px;
      text-align: center;
      max-width: 330px;
      width: 100%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .app-message {
      padding: 2rem 1.5rem 0 1.5rem;
    }

    .no-app-msg{
      padding: 2rem 1.5rem;
      background: #F2F1F1;
      border-radius: 0 0 12px 12px;
     }
    /* Close button */
    .sdk-close-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      color: #555;
    }

    /* Hide both steps by default */
    .sdk-step { display: block; }
    /* Only show step 1 initially */
    .sdk-step--1 { display: block; padding: 2rem 1.5rem; }
    .sdk-step--2 { display: block; }

    /* Logo */
    .sdk-logo {
      display: block;
      margin: 0 auto 1rem;
      max-width: 120px;
    }

    /* Main copy */
    .sdk-copy {
      color: #0D121C;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 130%; 
      letter-spacing: -0.25px;
      margin-bottom: 32px;
    }

    /* Buttons */
    .sdk-btns {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 32px 0 24px 0;
    }

    .sdk-btn {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }

    .sdk-btn--primary {
      background-color: #004a93;
      color: #fff;
    }

    .sdk-btn--secondary {
      background-color: #fff;
      color: #000;
      border: 2px solid #000;
    }

    /* Install copy (only step 1) */
    .sdk-install {
      font-size: 0.85rem;
      color: #555;
      margin: 0 0 1rem;
    }

    /* Store badges */
    .sdk-store-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .sdk-store-links img {
      height: 36px;
      display: block;
    }

    .wc-session {
      max-width: 95%;
      word-wrap: break-word;
      color: grey;
      display: none
    }

    .Rtable {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
    }

    .Rtable-cell {
      box-sizing: border-box;
      flex-grow: 1;
      width: 100%;
      list-style: none;
      background: fade(green, 20%);
      text-align: center;
    }

    .dot {
      height: 16px;
      width: 16px;
      background-color: #1143A7;
      border-radius: 50%;
      display: inline-block;
      z-index: 2;
      position: relative;
    }

    .dot-no-fill {
      height: 16px;
      width: 16px;
      background-color: white;
      border: 1px solid black;
      border-radius: 50%;
      display: inline-block;
      z-index: 2;
      position: relative;
    }

    .Rtable--3cols > .Rtable-cell {
      width: 33.33%;
    }

    .Rtable {
      position: relative; 
    }

    .Rtable-cell .text {
      color: rgba(13, 18, 28, 0.70);
      text-align: center;
      font-size: 11px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%; 
    }

    .Rtable-cell .text.active {
      color: #0D121C;
      text-align: center;
      font-size: 11px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%; 
    }

    .line-no-fill {
      width: 100%;
      height: 1px;
      display: block;
      position: relative;
      background: rgba(10, 12, 30, 0.2);
      top: -15px;
      left: 50%;
      margin: 0 auto;
    }

    .hr-line{
      margin: 16px 0;
    }
  `;
    document.head.appendChild(style);
  }

  /**
   * Closes the popup and removes styles.
   */
  static closePopup() {
    const wrapper = document.getElementById("sdk-popup-wrapper");
    if (wrapper) wrapper.remove();

    const style = document.getElementById("sdk-popup-styles");
    if (style) style.remove();
  }

  static openIdapp = ({
    wallectConnectMobileUrl,
    walletConnectDesktopUrl,
  }: {
    wallectConnectMobileUrl: string;
    walletConnectDesktopUrl?: string;
  }) => {
    // On mobile, hand off to the native app:
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      console.log("Opening Idapp on mobile...");
      window.location.href = wallectConnectMobileUrl;
    } else {
      // Desktop fallback: show instructions or open a popup for testing
      if (walletConnectDesktopUrl) {
        const width = 400;
        const height = 700;
        const top = 0;
        const left = window.screen.availWidth - width;
        window.open(
          walletConnectDesktopUrl,
          "Idapp",
          `width=${width},height=${height},top=${top},left=${left}`
        );
      }
    }
  };

  /**
   * Injects the popup HTML and styles, then invokes the ID App deep link.
   * This function creates a popup that prompts the user to open the ID App for account activation.
   * @param param0
   */
  static async invokeIdAppDeepLinkPopup({
    walletConnectUri,
  }: {
    walletConnectUri: string;
  }) {
    if (!navigator && !window) {
      throw new Error(
        "ConcordiumIDAppPoup.invokeIdAppDeepLinkPopup() requires a browser environment"
      );
    }

    if (!walletConnectUri) {
      throw new Error(
        "ConcordiumIDAppPoup.invokeIdAppDeepLinkPopup() requires a valid walletConnectUri"
      );
    }

    ConcordiumIDAppPoup.injectPopupStyles();

    const wallectConnectMobileUrl = `${IDAPP_HOSTS.mobile}wallet-connect?encodedUri=${walletConnectUri}`;
    // const walletConnectDesktopUrl = `${IDAPP_HOSTS.web}wallet-connect?encodedUri=${walletConnectUri}`;

    console.log("Inside invokeOpenIDappPopup");
    const wrapper = document.createElement("div");

    wrapper.id = "sdk-popup-wrapper";
    wrapper.innerHTML = `
    <div class="sdk-popup-overlay">
      <div class="sdk-popup-box">
       <div class="app-message">
       <!-- close icon -->
        <button class="sdk-close-btn" aria-label="Close">&times;</button>
          <!-- STEP 2 -->
        <div class="sdk-step sdk-step--2">
          <img src="${concordiumLogo}" class="sdk-logo" alt="Concordium Logo">

          <div class="Rtable Rtable--3cols mb-5 w-100">
            <div class="Rtable-cell" style="order: 0;">
              <span class="dot"></span
              ><span class="line-no-fill"></span>
            </div>
            <div class="Rtable-cell" style="order: 1;">
              <div class="text active">
               Connect / <br> Pair Apps 
              </div>
            </div>
            <div class="Rtable-cell" style="order: 0;">
              <span class="dot-no-fill"></span
              ><span class="line-no-fill"></span>
            </div>
            <div class="Rtable-cell" style="order: 1;">
              <div class="text">
                Complete ID <br>Verification
              </div>
            </div>
            <div class="Rtable-cell" style="order: 0;">
              <span class="dot-no-fill"></span>
            </div>
            <div class="Rtable-cell" style="order: 1;">
              <div class="text">
               Create / Recover<br> Account
              </div>
            </div>
          </div>

          <div class="hr-line"> <hr></div>
          <p class="sdk-copy">
            Please follow and complete the <br> account setup in [ID App].
          </p>
          <div id="sdk-qr-code"></div>
          <div class="sdk-btns">
            <button id="open-idapp-btn" class="sdk-btn sdk-btn--primary">
              Open {IDApp}
            </button>
          </div>
        </div>
        </div>
        <div class="no-app-msg">
       <p class="sdk-install">
            If you don’t have ID App, install it then return here to continue.
          </p>
          <div class="sdk-store-links">
            <a href="#">
              <img src="${appStoreLogo}" alt="Download on the App Store">
            </a>
            <a href="#">
              <img src="${playStoreLogo}" alt="Get it on Google Play">
            </a>
          </div>
       </div>
      </div>
       
    </div>
  `;

    if (!document.getElementById("qrcode-lib")) {
      const script = document.createElement("script");
      script.id = "qrcode-lib";
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      document.head.appendChild(script);
    }

    const renderQRCode = () => {
      const qrContainer = document.getElementById("sdk-qr-code");
      if (qrContainer && (window as any).QRCode) {
        qrContainer.style =
          "display: flex;justify-content: center;margin: 1.0rem 0;";
        new (window as any).QRCode(qrContainer, {
          text: wallectConnectMobileUrl,
          width: 160,
          height: 160,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: (window as any).QRCode.CorrectLevel.H,
        });
      } else {
        setTimeout(renderQRCode, 100); // wait for script to load
      }
    };

    const openAppBtn =
      wrapper.querySelector<HTMLButtonElement>("#open-idapp-btn")!;
    const closeBtn =
      wrapper.querySelector<HTMLButtonElement>(".sdk-close-btn")!;
    document.body.appendChild(wrapper);
    renderQRCode();

    closeBtn.addEventListener("click", () => ConcordiumIDAppPoup.closePopup());

    openAppBtn?.addEventListener("click", async () => {
      console.log("Create ID Clicked");
      try {
        // window.location.href = wallectConnectMobileUrl;
        ConcordiumIDAppPoup.openIdapp({ wallectConnectMobileUrl });
      } catch (e) {
        // emit error event
        console.log(e);
      }
    });
  }

  /**
   * Injects the styles for the popup into the document.
   * This method is called to ensure that the popup has the necessary styles applied.
   * @param param0
   */
  static async invokeIdAppActionsPopup({
    onCreateAccount,
    onRecoverAccount,
    walletConnectSessionTopic,
  }: {
    onCreateAccount?: () => Promise<any>;
    onRecoverAccount?: () => Promise<any>;
    walletConnectSessionTopic: string;
  }) {
    console.log(onCreateAccount, onRecoverAccount, walletConnectSessionTopic);
    // Check if atleast one of the handlers is provided
    if (!onCreateAccount && !onRecoverAccount) {
      throw new Error("Atleast one of the handlers must be provided");
    }

    if (onCreateAccount && !walletConnectSessionTopic) {
      throw new Error("Wallet Connect's session.topic is required");
    }

    ConcordiumIDAppPoup.injectPopupStyles();
    // Build the wrapper
    const wrapper = document.createElement("div");
    wrapper.id = "sdk-popup-wrapper";
    wrapper.innerHTML = `
    <div class="sdk-popup-overlay">
      <div class="sdk-popup-box">

        <!-- close icon -->
        <button class="sdk-close-btn" aria-label="Close">&times;</button>

        <!-- STEP 1 -->
        <div class="sdk-step sdk-step--1">
         <img src="${concordiumLogo}" class="sdk-logo" alt="Concordium Logo">
          
          <div class="create__wrap">
            <div class="Rtable Rtable--3cols mb-5 w-100">
              <div class="Rtable-cell" style="order: 0;">
                <span class="dot"></span
                ><span class="line-no-fill"></span>
              </div>
              <div class="Rtable-cell" style="order: 1;">
                <div class="text active">
                 Connect / <br> Pair Apps 
                </div>
              </div>
              <div class="Rtable-cell" style="order: 0;">
                <span class="dot"></span
                ><span class="line-no-fill"></span>
              </div>
              <div class="Rtable-cell" style="order: 1;">
                <div class="text active">
                  Complete ID <br>Verification
                </div>
              </div>
              <div class="Rtable-cell" style="order: 0;">
                <span class="dot-no-fill"></span>
              </div>
              <div class="Rtable-cell" style="order: 1;">
                <div class="text">
                 Create / Recover<br> Account
                </div>
              </div>
            </div>
            <div class="hr-line"> <hr></div>
          </div>
          ${walletConnectSessionTopic
            ? `<div class="authCode" id="wallet-connect-session-topic">
                ${walletConnectSessionTopic.substr(0, 4).toUpperCase()}
              </div>`
            : ""
          }
          <p class="sdk-copy">
            Only once you have completed the ID verification in [ID App], Choose your next step.
          </p>
          <div class="sdk-btns">
            <button id="create-id-btn" class="sdk-btn sdk-btn--primary">
              Create New Account
            </button>
            <button id="recover-id-btn" class="sdk-btn sdk-btn--secondary">
              Recover Account
            </button>
          </div>

          <div class="wc-session">
            <div class="Rtable Rtable--3cols mb-5 w-100">
            <div class="Rtable-cell" style="order: 0;">
              <span class="dot"></span
              ><span class="line-no-fill"></span>
            </div>
            <div class="Rtable-cell" style="order: 1;">
              <div class="text active">
               Connect / <br> Pair Apps 
              </div>
            </div>
            <div class="Rtable-cell" style="order: 0;">
              <span class="dot"></span
              ><span class="line-no-fill"></span>
            </div>
            <div class="Rtable-cell" style="order: 1;">
              <div class="text active">
                Complete ID <br>Verification
              </div>
            </div>
            <div class="Rtable-cell" style="order: 0;">
              <span class="dot-no-fill"></span>
            </div>
            <div class="Rtable-cell" style="order: 1;">
              <div class="text">
               Create / Recover<br> Account
              </div>
            </div>
          </div>

          <div class="hr-line"> <hr></div>
              <p class="sdk-copy">Open the ID App and complete the verification by matching the number below</p>
              <div class="authCode" id="wallet-connect-session-topic"></div>
          </div>
        </div>
      </div>
    </div>
  `;
    document.body.appendChild(wrapper);
    // Element refs
    const closeBtn =
      wrapper.querySelector<HTMLButtonElement>(".sdk-close-btn")!;
    closeBtn.addEventListener("click", () => ConcordiumIDAppPoup.closePopup());

    // Step switch: Create New Account → Step 2
    const createBtn =
      wrapper.querySelector<HTMLButtonElement>("#create-id-btn")!;
      if (onCreateAccount) {
      createBtn.addEventListener("click", async () => {
        console.log("OnCreateeAccout:  ⏳ Please wait");
        createBtn.textContent = "⏳ Please wait";
        try {
          await onCreateAccount();
          // ConcordiumIDAppPoup.closePopup()
        } catch (err) {
          console.error(err);
          createBtn.textContent = "Create New Account";
        }
      });
    } else {
      createBtn.style.display = "none";
    }

    // Recover flow
    const recoverBtn =
      wrapper.querySelector<HTMLButtonElement>("#recover-id-btn")!;
    if (onRecoverAccount) {
      recoverBtn.addEventListener("click", async () => {
        console.log("OnRecoverAccout:  ⏳ Please wait");
        recoverBtn.textContent = "⏳ Please wait";
        await onRecoverAccount();
        // ConcordiumIDAppPoup.closePopup()
      });
    } else {
      recoverBtn.style.display = "none";
    }
  }
}
