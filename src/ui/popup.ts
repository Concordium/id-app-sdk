// import "./popup.css";
function injectPopupStyles() {
  if (document.getElementById("sdk-popup-styles")) return;

  const style = document.createElement("style");
  style.id = "sdk-popup-styles";
  style.innerHTML = `
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
      padding: 2rem 1.5rem;
      border-radius: 12px;
      text-align: center;
      max-width: 320px;
      width: 100%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
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
    .sdk-step { display: none; }
    /* Only show step 1 initially */
    .sdk-step--1 { display: block; }

    /* Logo */
    .sdk-logo {
      display: block;
      margin: 0 auto 1rem;
      max-width: 120px;
    }

    /* Main copy */
    .sdk-copy {
      font-size: 1rem;
      line-height: 1.4;
      color: #000;
      margin: 0 0 1.5rem;
    }

    /* Buttons */
    .sdk-btns {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
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
  `;
  document.head.appendChild(style);
}

export function closePopup() {
  const wrapper = document.getElementById("sdk-popup-wrapper");
  if (wrapper) wrapper.remove();

  const style = document.getElementById("sdk-popup-styles");
  if (style) style.remove();
}

export async function invokePopup({
  onCreateAccount,
  onRecoverAccount,
}: {
  onCreateAccount: () => Promise<any>;
  onRecoverAccount: () => Promise<any>;
}) {
  injectPopupStyles();

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
          <img src="images/concordium.svg" alt="Concordium" class="sdk-logo" />
          <p class="sdk-copy">
            To activate a Concordium account<br/>
            please complete ID verification.
          </p>
          <div class="sdk-btns">
            <button id="create-id-btn" class="sdk-btn sdk-btn--primary">
              Create New Account
            </button>
            <button id="recover-id-btn" class="sdk-btn sdk-btn--secondary">
              Recover Account
            </button>
          </div>
          <p class="sdk-install">
            If you don’t have ID App, install it then return here to continue.
          </p>
          <div class="sdk-store-links">
            <a href="#">
              <img src="images/app-store-badge.svg" alt="App Store"/>
            </a>
            <a href="#">
              <img src="images/google-play-badge.png" alt="Google Play"/>
            </a>
          </div>
        </div>

        <!-- STEP 2 -->
        <div class="sdk-step sdk-step--2">
          <img src="images/concordium.svg" alt="Concordium" class="sdk-logo" />
          <p class="sdk-copy">
            To activate a Concordium account<br/>
            please complete ID verification.
          </p>
          <div class="sdk-btns">
            <button id="open-idapp-btn" class="sdk-btn sdk-btn--primary">
              Open {IDApp}
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  // Element refs
  const closeBtn = wrapper.querySelector<HTMLButtonElement>(".sdk-close-btn")!;
  const step1 = wrapper.querySelector<HTMLDivElement>(".sdk-step--1")!;
  const step2 = wrapper.querySelector<HTMLDivElement>(".sdk-step--2")!;
  const createBtn = wrapper.querySelector<HTMLButtonElement>("#create-id-btn")!;
  const recoverBtn =
    wrapper.querySelector<HTMLButtonElement>("#recover-id-btn")!;
  const openAppBtn =
    wrapper.querySelector<HTMLButtonElement>("#open-idapp-btn")!;
  const openOtherBtn =
    wrapper.querySelector<HTMLButtonElement>("#open-other-btn")!;

  // Close handler
  closeBtn.addEventListener("click", () => closePopup());

  // Step switch: Create New Account → Step 2
  createBtn.addEventListener("click", async () => {
    createBtn.textContent = "Loading...";
    try {
      await onCreateAccount();
      // on success, show Step 2
      step1.style.display = "none";
      step2.style.display = "block";
    } catch (err) {
      console.error(err);
      createBtn.textContent = "Create New Account";
    }
  });

  // Recover flow
  recoverBtn.addEventListener("click", async () => {
    await onRecoverAccount();
    // optionally closePopup() here if you want
  });

  // These two can fire events, or you can hook them up to more SDK logic:
  openAppBtn.addEventListener("click", () => {
    console.log("Open IDApp clicked");
  });
  openOtherBtn.addEventListener("click", () => {
    console.log("Open on another device clicked");
  });
}
