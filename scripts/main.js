const STATUS_ATTUNED = 2;
const STATUS_ATTUNEMENT_REQUIRED = 1;

const ATTUNEMENT_REQUIRED_ICON = `fas fa-sun not-attuned`;
const ATTUNED_ICON = `fas fa-sun attuned`;

Hooks.on("renderActorSheet5eCharacter", (sheet, html, character) => {
  addQuickAttunementButton(html, sheet.actor);
});

function addQuickAttunementButton(html, actor) {
  actor.items.map((item) => {
    addAttunementButtonIfAttunementAvailable(item, html, actor);
  });
}

function attunementToggleHandle(e) {
  console.log("QuickAttunement | Attunement toggle start");
  const currentActor = this;

  e.preventDefault();

  const currentItemId = e.currentTarget.closest(".item").dataset.itemId;
  const currentItem = currentActor.items.find(
    (item) => item.id === currentItemId
  );

  const currentAttunementStatus = currentItem?.data?.data?.attunement;

  if (currentAttunementStatus === STATUS_ATTUNEMENT_REQUIRED) {
    console.log("QuickAttunement | Attunement required -> attuned");
    currentItem.data.data.attunement = STATUS_ATTUNED;
  } else if (currentAttunementStatus === STATUS_ATTUNED) {
    console.log("QuickAttunement | Attuned -> attunement required");
    currentItem.data.data.attunement = STATUS_ATTUNEMENT_REQUIRED;
  }
}

function addAttunementButtonIfAttunementAvailable(item, html, actor) {
  const itemAttunementStatus = item.data?.data?.attunement || 0;

  if (itemAttunementStatus === 0) {
    return;
  }
  if (
    itemAttunementStatus === STATUS_ATTUNED ||
    itemAttunementStatus === STATUS_ATTUNEMENT_REQUIRED
  ) {
    html
      .find(`.item[data-item-id="${item.id}"] .item-detail.attunement`)
      .on("click", attunementToggleHandle.bind(actor));
  }
}
