# Expense Tracker

A simple web-based Expense Tracker that helps users manage their transactions by tracking income, expenses, and total balance. It also saves transactions in **Local Storage** to maintain data across page reloads.

## Features

- ✅ **Add Transactions**: Enter details like name, category, amount, and date.
- ✅ **Delete Transactions**: Remove transactions from history.
- ✅ **Dynamic Balance Update**: Automatically calculates total balance, income, and expenses.
- ✅ **Local Storage Support**: Transactions persist even after refreshing the page.

## Technologies Used

- **HTML, CSS, JavaScript** (Frontend Development)
- **Local Storage** (Data Persistence)

## How It Works

1. **Adding a Transaction**
   - Users input the transaction details.
   - Data is stored in an array and saved to Local Storage.
   - The transaction list and balance stats update dynamically.

2. **Deleting a Transaction**
   - Clicking the delete button removes the transaction from the list.
   - The data updates in Local Storage.
   - The balance statistics adjust accordingly.

3. **Local Storage Integration**
   - Transactions are stored in the browser’s Local Storage.
   - When the page loads, stored transactions are fetched and displayed automatically.

## Code Overview

### 1. **Storing Transactions in Local Storage**
```js
localStorage.setItem("transactions", JSON.stringify(transactionData));
```

### 2. **Retrieving Transactions on Page Load**
```js
let storedData = localStorage.getItem("transactions");
if (storedData) {
    transactionData = JSON.parse(storedData);
    updateTransList();
    updateBalStats();
}
```

### 3. **Calculating Balance, Income & Expenses**
```js
let income = transactionData.filter(tr => tr.trAmt > 0).reduce((sum, tr) => sum + tr.trAmt, 0);
let expense = transactionData.filter(tr => tr.trAmt < 0).reduce((sum, tr) => sum + Math.abs(tr.trAmt), 0);
let totalBalance = income - expense;
```

## How to Use

1. Clone the repository:
   ```sh
   git clone https://github.com/dev-sharma16/expense-tracker.git
   ```
2. Open the `index.html` file in a browser.
3. Start adding transactions!

## Future Enhancements

- 📌 **Category-wise Expense Summary**
- 📌 **Charts & Graphs for better visualization**
- 📌 **Export transactions as CSV**

## License

This project is open-source and free to use. Feel free to contribute!

---
🔗 Developed by Dev Sharma

