Hooks.on("renderActorSheet5eCharacter", (sheet, html, character) => {
  addQuickAttunementButton(html, sheet.actor);
});

function addQuickAttunementButton(html, actor) {
  $(`
      <a class="item-control item-give-module" title="Toggle attunment">
        <i class="fas fa-sun attuned"></i>
      </a>
    `).insertAfter(
    html.find(".inventory ol:not(.currency-list)  .item-control.item-edit")
  );
  html
    .find(".item-control.item-give-module")
    .on("click", attunementToggleHandle.bind(actor));
}

function attunementToggleHandle(e) {
  console.log("oh hi");
  e.preventDefault();
  const currentItemId = e.currentTarget.closest(".item").dataset.itemId;
  console.log("item data set");
  console.log(e.currentTarget.closest(".item").dataset);
  console.log(currentItemId);
}

let notAttunedIcon = `fas fa-sun not-attuned`;
