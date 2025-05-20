import "./popup.css";

export function invokePopup({ onCreateAccount, onRecoverAccount }: { onCreateAccount: Function, onRecoverAccount: Function }) {
  alert("This popup is triggedered by the SDK"); // test
  if (document.getElementById('sdk-popup-wrapper')) return; // prevent duplicates

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

  document.getElementById('create-id-btn')?.addEventListener('click', async () => {
    console.log('Create ID Clicked');
    try{
      // start loader 
      const create_acc_resp = await onCreateAccount();
      console.log(create_acc_resp)
      // finish loader
      // emit event that this process is finisshed
    }catch(e){
      // emit error event 
    }
  });
  document.getElementById('recover-id-btn')?.addEventListener('click', async () => {
    console.log('Recover ID Clicked');
    await onRecoverAccount();
    // emit event that this process is finisshed
  });

}
