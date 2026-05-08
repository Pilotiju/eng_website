let implementedAds = [];
let ammountOfAdRolls = 2;

function getNotUsedAdIndex() {
  let adIndex = Math.floor(Math.random() * 3);
  console.log(`ammountOfAdRolls: ${ammountOfAdRolls}`);
  ammountOfAdRolls--;
  if (implementedAds.includes(adIndex)) {
    return getNotUsedAdIndex();
  }
  return adIndex;
}

document.addEventListener('DOMContentLoaded', () => {
  const adCollumn = document.querySelector('.js_ads_collumm');

  let html = '';
  for (let i = 0; i <= 2; i++) {
    if (ammountOfAdRolls < 0) {
      break;
    }
    const adIndex = getNotUsedAdIndex();
    implementedAds.push(adIndex);
    const { img, link } = ads[adIndex];
    const adHtml = /*html*/`
      <a href="${link}" target="_blank" class="js_ad_wrapper ad_wrapper">
        <img src="${img}" alt="Ad img" class="ad_img">
      </a>
    `;
    html += adHtml;
  }
  adCollumn.innerHTML = html;
});