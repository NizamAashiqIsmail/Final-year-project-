// The builder who collect the materials and construct the UI. It also manages the onboarding flow and state transitions.

// async This tells the computer, "Inside this function, I’m going to be waiting for some files to download. Don't freeze while I wait."
// ()=>{}  This is a way to say, "When you finish downloading those files, then do the stuff inside these curly braces." It’s like saying, "Once you have the ingredients, then we can start cooking."


(async () => {  
  // 1. Dynamic imports
  const src = chrome.runtime.getURL('modules/');

  // await import means use the files from the 'modules' folder, but wait until they are fully loaded before moving on to the next step. It’s like saying, "Go to the store and get these ingredients, but don’t start cooking until you have everything."
  // constat {name} = get the 'name' from the module.

  const { state } = await import(src + 'uiState.js');
  const { getStyles } = await import(src + 'styles.js');
  const { initWelcome } = await import(src + 'welcome.js');
  const { initGoalSetting } = await import(src + 'goal.js');
  const { initCalibration } = await import(src + 'calibration.js');
  const { initWidget } = await import(src + 'widget.js');

  // 2. Setup Shadow DOM
  const host = document.createElement('div'); // create a empty invisible box 
  document.body.appendChild(host); //Taking that box and physically putting it onto the website
  const shadow = host.attachShadow({ mode: 'open' }); // Root that prevent website to affect the extension color or fonts.

  // 3. Inject Styles
  const styleTag = document.createElement('style'); // create a tag
  styleTag.textContent = getStyles(); // collect styles
  shadow.appendChild(styleTag); // add it to the shodow DOM

  // 4. Create Main Structure
  const setupContainer = document.createElement('div');
  setupContainer.id = 'setup-container'; // welcom , goal , callibaration occurs
  
  const widgetWrapper = document.createElement('div'); // avatar and buttons
  widgetWrapper.id = 'widget-wrapper';
  widgetWrapper.style.display = 'none';
  widgetWrapper.innerHTML = `
    <div id="note-box">...</div>
    <div id="main-circle"><div id="info"><span id="tab-timer">0s</span></div></div>
  `;

  shadow.appendChild(setupContainer);
  shadow.appendChild(widgetWrapper);

  // 5. Start Onboarding Flow
  initWelcome(shadow, () => {
    initGoalSetting(shadow, () => {
      initCalibration(shadow, () => {
        setupContainer.remove();
        initWidget(shadow);
      });
    });
  });
})();

// (()={} ...)(); runs this code imediately, without waiting for any user action. It’s like saying, "Hey computer, do this right now!"