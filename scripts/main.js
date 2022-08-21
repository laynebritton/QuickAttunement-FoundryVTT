Hooks.on("renderActorSheet5eCharacter", (sheet, html, character) => {
  let sheetClasses = sheet.options.classes;
  if (sheetClasses[0] === "tidy5e") {
    addGiveItemButtonTidy(html, sheet.actor);
  } else {
    addGiveItemButton(html, sheet.actor);
  }
  addGiveCurrency(html, sheet.actor);
});

function addGiveItemButton(html, actor) {
  $(`
      <a class="item-control item-give-module" title="Give item pee">
        <i class="fas fa-hands-helping"></i>
      </a>
    `).insertAfter(
    html.find(".inventory ol:not(.currency-list)  .item-control.item-edit")
  );
  html
    .find(".item-control.item-give-module")
    .on("click", giveItemHandler.bind(actor));
}

function giveItemHandler(e) {
  console.log("oh hi");
  e.preventDefault();
  const currentItemId = e.currentTarget.closest(".item").dataset.itemId;
  console.log(currentItemId);
}
