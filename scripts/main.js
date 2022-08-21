const STATUS_ATTUNED = 2;
const STATUS_ATTUNEMENT_REQUIRED = 1;

const ATTUNEMENT_REQUIRED_ICON = `fas fa-sun not-attuned`;
const ATTUNED_ICON = `fas fa-sun attuned`;

Hooks.on("renderActorSheet5eCharacter", (sheet, html, character) => {
  addQuickAttunementButton(html, sheet.actor);
});

function addQuickAttunementButton(html, actor) {
  console.log("actor");
  console.log(actor);
  actor.items.map((item) => {
    addAttunementButtonIfAttunementAvailable(item, html, actor);
  });

  //   $(`
  //       <a class="item-control item-give-module" title="Toggle attunement">
  //         <i class="fas fa-sun attuned"></i>
  //       </a>
  //     `).insertAfter(
  //     html.find(".inventory ol:not(.currency-list)  .item-control.item-edit")
  //   );
  //   html
  //     .find(".item-control.item-give-module")
  //     .on("click", attunementToggleHandle.bind(actor));
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

  if (currentAttunementStatus === STATUS_ATTUNEMENT_REQUIRED) {
    console.log("QuickAttunement | Attunement required -> attuned");
    currentItem.data.data.attunement = STATUS_ATTUNED;
  } else if (currentAttunementStatus === STATUS_ATTUNED) {
    console.log("QuickAttunement | Attuned -> attunement required");
    currentItem.data.data.attunement = STATUS_ATTUNEMENT_REQUIRED;
  }
}

function addAttunementButtonIfAttunementAvailable(item, html, actor) {
  //   console.log(item);
  const itemAttunementStatus = item.data?.data?.attunement || 0;
  //   if (!itemAttunementStatus || itemAttunementStatus <= 0) {
  //     return;
  //   }
  console.log(item.id);
  console.log(item.data.data.name);
  console.log(itemAttunementStatus);
  console.log("-------------");
  if (itemAttunementStatus === STATUS_ATTUNED) {
    $(`
    <a class="item-control item-give-module" title="Toggle attunement">
      <i class="fas fa-sun attuned"></i>
    </a>
  `).insertAfter(
      html.find(
        `.inventory .item [data-item-id='${item.key}'] .item-control.item-edit`
      )
    );
    html
      .find(".item-control.item-give-module")
      .on("click", attunementToggleHandle.bind(actor));
  } else if (itemAttunementStatus === STATUS_ATTUNEMENT_REQUIRED) {
    $(`
    <a class="item-control item-give-module" title="Toggle attunement">
      <i class="fas fa-sun not-attuned"></i>
    </a>
  `).insertAfter(
      html.find(
        `.inventory [data-item-id='${item.data.id}']  .item-control.item-edit`
      )
    );
    html
      .find(".inventory .item-control.item-give-module")
      .on("click", attunementToggleHandle.bind(actor));
  }
}
