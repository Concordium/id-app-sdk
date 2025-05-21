// import "./popup.css";
function injectPopupStyles() {
  if (document.getElementById('sdk-popup-styles')) return; // prevent duplicate injection

  const style = document.createElement('style');
  style.id = 'sdk-popup-styles';
  style.innerHTML = `
    .sdk-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .sdk-popup-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      color: black;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }
    .sdk-popup-box button {
      margin: 0.5rem;
    }
    #create-id-btn{
      background-image: none;
    }
    #recover-id-btn{
      background-image: none;
    }
  `;
  document.head.appendChild(style);
}
export function closePopup() {
  const wrapper = document.getElementById('sdk-popup-wrapper');
  if (wrapper) {
    wrapper.remove(); // remove popup HTML
  }

  const style = document.getElementById('sdk-popup-styles');
  if (style) {
    style.remove(); // optionally remove the injected CSS
  }
}

export async function invokePopup({ onCreateAccount, onRecoverAccount }: { onCreateAccount: Function, onRecoverAccount: Function }) {
  alert("This popup is triggedered by the SDK"); // test
  injectPopupStyles();
  
  const wrapper = document.createElement('div');
  wrapper.id = 'sdk-popup-wrapper';
  wrapper.innerHTML = `
    <div class="sdk-popup-overlay">
      <div class="sdk-popup-box">
        <h3>Welcome</h3>
        <button id="create-id-btn">Create ID</button>
        <button id="recover-id-btn">Recover ID</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(wrapper);
  
  
  const createAccountBtn = document.getElementById('create-id-btn')
  createAccountBtn?.addEventListener('click', async () => {
    console.log('Create ID Clicked');
    try{
      // start loader 
      createAccountBtn.innerText = "Loading...."
      const create_acc_resp = await onCreateAccount();
      console.log(create_acc_resp)
      createAccountBtn.innerText = "Create ID"
      closePopup()
      // finish loader
      // emit event that this process is finisshed
    }catch(e){
      // emit error event 
      console.log(e)
    }
  });
  document.getElementById('recover-id-btn')?.addEventListener('click', async () => {
    console.log('Recover ID Clicked');
    await onRecoverAccount();
    // emit event that this process is finisshed
  });

}
