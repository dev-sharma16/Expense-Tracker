let transactionData = [];
window.onLoad = onLoad();

// 7.function to load stored data in localstorage
function onLoad(){
    let storedData = localStorage.getItem("transactions");
    if(storedData){
        transactionData = JSON.parse(storedData);
        updateTransList();
        updateBalStats();
    }
}

// 1.accessing form and storing the data in the array
let trForm = document.getElementById("addTransaction");
trForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let trName = document.getElementById("trDesc").value;
  let trCategory = document.getElementById("trCat").value;
  let trAmount =  parseFloat(document.getElementById('trAmt').value);
  let trDate = document.getElementById("trDt").value;

  let arrObj = {
    trId: generateId(),
    trDesc: trName,
    trCat: trCategory,
    trAmt: trAmount,
    trDt: trDate,
  };

  transactionData.push(arrObj);
  localStorage.setItem("transactions",JSON.stringify(transactionData));
  updateTransList();
  updateBalStats();
  trForm.reset();
  console.log(transactionData);
});

// 2.function to display the transaction list
function updateTransList() {
  let trans = document.getElementById("transactionList");
  if (transactionData.length === 0) {
    trans.innerHTML = `<h4>Transactions History</h3>
                       <p id="noTr">No Transaction..!</p>`;
  } else {
    trans.innerHTML = `<h4>Transaction History</h3>`;
  }
  transactionData.forEach((transaction) => {
    const sign = transaction.trAmt < 0 ? "-" : "+";
    trans.innerHTML += `
        <div class="transaction flex" id="trans">   
            <div class="trNmCat flex">
                <p id="trNm">${transaction.trDesc} |</p>
                <p id="trCat">| ${transaction.trCat}</p>
            </div>
            <div class="trAmt flex">
                <p id="trAmt">${sign} ₹${Math.abs(transaction.trAmt)}</p>
                <button id="deleteTr" onclick ="deleteTrans(${
                  transaction.trId
                })"><i class="fa-solid fa-xmark" style="color: #ffffff;"></i></button>
            </div>
        </div>    
    `;
  });
}

// 4.function to generate randow to id to each transaction for deleting a transaction
function generateId() {
  return Math.floor(Math.random() * 10000000);
}

// 5.function to delete the transaction
function deleteTrans(id) {
  transactionData = transactionData.filter(
    (transaction) => transaction.trId !== id
  );
  localStorage.setItem("transactions",JSON.stringify(transactionData));
  updateTransList();
  updateBalStats();
}

// 6.function to update the Balance Stats
function updateBalStats() {
  let income = transactionData
    .filter((transaction) => transaction.trAmt > 0)
    .reduce((sum, transaction) => sum + transaction.trAmt, 0);

  let expense = transactionData
    .filter((transaction) => transaction.trAmt < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.trAmt), 0);

  let totalBalance = income - expense;

  document.getElementById("totalBalance").innerText =totalBalance < 0 ? `-₹${Math.abs(totalBalance).toFixed(2)}` : `₹${totalBalance.toFixed(2)}`;;
  document.getElementById("income").innerText = `+ ₹${income.toFixed(2)}`;
  document.getElementById("expense").innerText = `- ₹${expense.toFixed(2)}`;
}
