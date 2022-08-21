Hooks.on("renderActorSheet5eCharacter", (sheet, html, character) => {
  addQuickAttunementButton(html, sheet.actor);
});

function addQuickAttunementButton(html, actor) {
  $(`
      <a class="item-control item-give-module" title="Toggle attunement">
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
  const currentActor = this;

  e.preventDefault();

  const currentItemId = e.currentTarget.closest(".item").dataset.itemId;
  const currentItem = currentActor.items.find(
    (item) => item.id === currentItemId
  );

  console.log("QA+ - current item");
  console.log(currentItem);
  console.log(currentItemId);
}

let notAttunedIcon = `fas fa-sun not-attuned`;
