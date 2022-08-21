const STATUS_ATTUNED = 2;
const STATUS_ATTUNMENT_REQUIRED = 1;

const ATTUNEMENT_REQUIRED_ICON = `fas fa-sun not-attuned`;
const ATTUNED_ICON = `fas fa-sun attuned`;

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
  console.log("attunement swap");
  const currentActor = this;

  e.preventDefault();

  const currentItemId = e.currentTarget.closest(".item").dataset.itemId;
  const currentItem = currentActor.items.find(
    (item) => item.id === currentItemId
  );

  const currentAttunementStatus = currentItem?.data?.data?.attunement;

  console.log();
  console.log(currentAttunementStatus);

  if (currentAttunementStatus === STATUS_ATTUNMENT_REQUIRED) {
    console.log("QA+ - Changing from attunement required to attunement");
    currentItem.data.data.attunement = STATUS_ATTUNED;
  } else if (currentAttunementStatus === STATUS_ATTUNED) {
    console.log("QA+ - Changing from attunement to attunement required");
    currentItem.data.data.attunement = STATUS_ATTUNMENT_REQUIRED;
  }
  console.log("QA+ - current item");
  console.log(currentItem);
}

let attunementPath = `Item.data.data.attunement`;
