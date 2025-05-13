import "./popup.css";

export function showPopup() {
  alert("This popup is triggedered by the SDK");
  // if (document.getElementById('sdk-popup-wrapper')) return; // prevent duplicates

  // const wrapper = document.createElement('div');
  // wrapper.id = 'sdk-popup-wrapper';
  // wrapper.innerHTML = `
  //   <div class="sdk-popup-overlay">
  //     <div class="sdk-popup-box">
  //       <h3>Welcome</h3>
  //       <button id="create-id-btn">Create ID</button>
  //       <button id="recover-id-btn">Recover ID</button>
  //       <button id="close-btn">Close</button>
  //     </div>
  //   </div>
  // `;
  // document.body.appendChild(wrapper);

  // document.getElementById('create-id-btn')?.addEventListener('click', () => {
  //   alert('Create ID Clicked');
  //   closePopup();
  // });
  // document.getElementById('recover-id-btn')?.addEventListener('click', () => {
  //   alert('Recover ID Clicked');
  //   closePopup();
  // });
  // document.getElementById('close-btn')?.addEventListener('click', closePopup);
}
