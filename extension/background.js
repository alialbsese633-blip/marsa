/* يفتح اللوحة الجانبية عند الضغط على أيقونة الإضافة؛ وإن لم يدعمها المتصفح تُفتح نافذة جانبية */
chrome.runtime.onInstalled.addListener(() => {
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
  }
});
chrome.action.onClicked.addListener(async () => {
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) return;
  chrome.windows.create({ url: 'panel.html', type: 'popup', width: 560, height: 900, left: 0, top: 0 });
});
