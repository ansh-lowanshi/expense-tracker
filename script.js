document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('budget')) {
        document.getElementById('budget-display').innerText = localStorage.getItem('budget');
        calculateBalance();
    }
    if(localStorage.getItem('expenses')) {
        document.getElementById('expense-list').innerHTML = localStorage.getItem('expenses');
        updateExpensesTotal();
    }
});

function setBudget() {
    const budget = document.getElementById('budget').value;
    if (budget) {
        localStorage.setItem('budget', budget);
        document.getElementById('budget-display').innerText = budget;
        calculateBalance();
    }
}

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const datetime = document.getElementById('expense-date').value;
    const category = document.getElementById('expense-category').value;
    const id = new Date().getTime(); // Unique ID
    if (name && amount && datetime && category) {
        const expenseDate = new Date(datetime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const newExpense = `
            <div class="expense-item" id="expense-${id}">
                ${name} - ₹${amount} - ${category} - ${expenseDate}
                <button onclick="deleteExpense(${id})" class="delete-btn">Delete</button>
            </div>`;
        const currentExpenses = document.getElementById('expense-list').innerHTML;
        document.getElementById('expense-list').innerHTML = currentExpenses + newExpense;
        updateLocalStorage();
        clearInputs();
    }
}

function deleteExpense(id) {
    const expenseElement = document.getElementById(`expense-${id}`);
    if(expenseElement) {
        expenseElement.remove();
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    localStorage.setItem('expenses', document.getElementById('expense-list').innerHTML);
    updateExpensesTotal();
}

function clearInputs() {
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').value = '';
}

function updateExpensesTotal() {
    const expenses = document.querySelectorAll('.expense-item');
    let total = 0;
    expenses.forEach(expense => {
        const parts = expense.innerText.split('- ₹');
        const amount = parts[1].split(' -')[0];
        total += parseFloat(amount);
    });
    document.getElementById('expenses-total').innerText = total;
    calculateBalance();
}

function calculateBalance() {
    const budget = parseFloat(localStorage.getItem('budget')) || 0;
    const expensesTotal = parseFloat(document.getElementById('expenses-total').innerText) || 0;
    const balance = budget - expensesTotal;
    document.getElementById('balance').innerText = balance;
}
