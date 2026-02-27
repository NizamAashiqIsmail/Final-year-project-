import { state } from './uiState.js';

export const initSettings = (shadow) => {
  const card = shadow.getElementById('settings-card');
  const avatarList = shadow.getElementById('avatar-inputs-list');
  
  // Build avatar inputs
  avatarList.innerHTML = Object.keys(state.stateSettings).map(s => `
    <div class="setting-row">
        <span>${s.replace('_',' ')}:</span>
        <input type="file" class="avatar-up" data-state="${s}">
    </div>
  `).join('');

  shadow.getElementById('set-back').onclick = () => card.style.display = 'none';

  // Add block
  shadow.getElementById('add-block-btn').onclick = async () => {
    const input = shadow.getElementById('block-url');
    const url = input.value.trim().toLowerCase();
    if (url && !state.blockList.includes(url)) {
      state.blockList.push(url);
      await chrome.storage.local.set({ blockList: state.blockList });
      renderBlockList(shadow);
      input.value = '';
    }
  };

  // Avatar file handlers
  shadow.querySelectorAll('.avatar-up').forEach(input => {
    input.onchange = (e) => {
      const mood = e.target.dataset.state;
      const reader = new FileReader();
      reader.onload = async (ev) => {
        state.stateSettings[mood].avatar = ev.target.result;
        await chrome.storage.local.set({ stateSettings: state.stateSettings });
      };
      reader.readAsDataURL(e.target.files[0]);
    };
  });
};

export const renderBlockList = (shadow) => {
  const display = shadow.getElementById('block-list-display');
  display.innerHTML = state.blockList.map((site, i) => `
    <div class="block-item" style="display:flex; justify-content:space-between; padding:5px; border-bottom:1px solid #eee;">
      <span>${site}</span>
      <span class="remove-btn" data-index="${i}" style="color:red; cursor:pointer;">✖</span>
    </div>
  `).join('');

  display.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = async () => {
      state.blockList.splice(btn.dataset.index, 1);
      await chrome.storage.local.set({ blockList: state.blockList });
      renderBlockList(shadow);
    };
  });
};