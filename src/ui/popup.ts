import "./popup.css";

export function invoke({ onCreateAccount, onRecoverAccount }: { onCreateAccount: Function, onRecoverAccount: Function }) {
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

  document.getElementById('create-id-btn')?.addEventListener('click', () => {
    console.log('Create ID Clicked');
    onCreateAccount();
  });
  document.getElementById('recover-id-btn')?.addEventListener('click', () => {
    console.log('Recover ID Clicked');
    onRecoverAccount();
  });
  // document.getElementById('close-btn')?.addEventListener('click', closePopup);
}
