
const form = document.getElementById("partForm");
const partsList = document.getElementById("partsList");
const totalValue = document.getElementById("totalValue");

let parts = JSON.parse(localStorage.getItem("bikeParts")) || [];

function saveParts() {
  localStorage.setItem("bikeParts", JSON.stringify(parts));
}

function renderParts() {
  partsList.innerHTML = "";
  let total = 0;

  parts.forEach((part, index) => {
    total += part.qty * part.purchase;

    const item = document.createElement("div");
    item.className = "part-card";

    const name = document.createElement("h3");
    name.textContent = part.name;

    const details = document.createElement("p");
    details.textContent =
      `Quantity: ${part.qty} | Purchase: Rs. ${part.purchase} | Sale: Rs. ${part.sale}`;

    const value = document.createElement("p");
    value.textContent =
      `Stock Value: Rs. ${(part.qty * part.purchase).toLocaleString("en-PK")}`;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => {
      if (confirm("Delete this part?")) {
        parts.splice(index, 1);
        saveParts();
        renderParts();
      }
    };

    item.append(name, details, value, del);
    partsList.appendChild(item);
  });

  totalValue.textContent = "Rs. " + total.toLocaleString("en-PK");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("partName").value.trim();
  const qty = Number(document.getElementById("partQty").value);
  const purchase = Number(document.getElementById("purchasePrice").value);
  const sale = Number(document.getElementById("salePrice").value);

  if (!name || qty < 1 || purchase < 0 || sale < 0) {
    alert("Please enter valid details.");
    return;
  }

  parts.push({ name, qty, purchase, sale });
  saveParts();
  renderParts();
  form.reset();
});

renderParts();
