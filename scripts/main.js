const STATUS_ATTUNED = 2;
const STATUS_ATTUNEMENT_REQUIRED = 1;

const ATTUNED_CLASSNAME = "attuned";
const NOT_ATTUNED_CLASSNAME = "not-attuned";

Hooks.on("renderActorSheet5eCharacter", (sheet, html) => {
  addQuickAttunementButton(html, sheet.actor);
});

function addQuickAttunementButton(html, actor) {
  actor.items.map((item) => {
    addAttunementButtonIfAttunementAvailable(item, html, actor);
  });
}

function addAttunementButtonIfAttunementAvailable(item, html, actor) {
  const itemAttunementStatus = item.system?.attunement || 0;

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

    // TODO for Version 2: Find a more elegant way to handle this than toggling the classes in a separate onClick
    html
      .find(`.item[data-item-id="${item.id}"] .item-detail.attunement`)
      .on("click", () => {
        toggleAttunementIconClasses(item.id);
      });
  }
}

function attunementToggleHandle(e) {
  console.log("QuickAttunement | Attunement toggle start");
  const currentActor = this;

  e.preventDefault();

  const currentItemId = e.currentTarget.closest(".item").dataset.itemId;
  const currentItem = currentActor.items.find(
    (item) => item.id === currentItemId
  );

  const currentAttunementStatus = currentItem?.system?.attunement;

  // TODO for Version 2: Update this through hooks instead of directly modifying the object.
  if (currentAttunementStatus === STATUS_ATTUNEMENT_REQUIRED) {
    console.log("QuickAttunement | Attunement required -> attuned");
    currentItem.system.attunement = STATUS_ATTUNED;
  } else if (currentAttunementStatus === STATUS_ATTUNED) {
    console.log("QuickAttunement | Attuned -> attunement required");
    currentItem.system.attunement = STATUS_ATTUNEMENT_REQUIRED;
  }
}

function toggleAttunementIconClasses(id) {
  $(
    `.item[data-item-id="${id}"] .item-detail.attunement .fas`)
  .toggleClass(ATTUNED_CLASSNAME);
  $(
    `.item[data-item-id="${id}"] .item-detail.attunement .fas`)
  .toggleClass(NOT_ATTUNED_CLASSNAME);
}
