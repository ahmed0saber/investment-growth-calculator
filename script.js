document.getElementById('calculate').addEventListener('click', calculateInvestment);

function calculateInvestment() {
    // Get input values
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    const monthlyRate = parseFloat(document.getElementById('monthlyRate').value);
    const monthlyAmount = parseFloat(document.getElementById('monthlyAmount').value);
    const periodMonths = parseInt(document.getElementById('periodMonths').value);
    const currency = document.getElementById('currency').value;

    const resultDiv = document.getElementById('result');

    // Validate inputs
    if (isNaN(initialAmount) || isNaN(monthlyRate) || isNaN(monthlyAmount) || isNaN(periodMonths) || periodMonths < 1) {
        resultDiv.innerHTML = '<p>Please enter valid numbers for all fields.</p>';
        resultDiv.style.display = 'block';
        return;
    }

    // Calculate investment growth
    const monthlyDecimal = monthlyRate / 100;
    let currentAmount = initialAmount;

    // Month-by-month calculation
    for (let month = 1; month <= periodMonths; month++) {
        // Apply monthly growth rate
        currentAmount += currentAmount * monthlyDecimal;

        // Add or withdraw money
        currentAmount += monthlyAmount;
    }

    // Calculate returns
    const totalInvested = initialAmount + (monthlyAmount * periodMonths);
    const totalProfit = currentAmount - totalInvested;
    const totalReturnPercent = ((currentAmount / totalInvested) - 1) * 100;

    // Determine if profit or loss
    const isProfitable = totalProfit > 0;
    const profitClass = isProfitable ? 'positive' : 'negative';
    const arrow = isProfitable ? '↑' : '↓';

    // Format results
    resultDiv.innerHTML = `
        <div class="result-item">
            <span>Initial Investment:</span>
            <span>${formatCurrency(initialAmount, currency)}</span>
        </div>
        <div class="result-item">
            <span>Total Contributed:</span>
            <span>${formatCurrency(totalInvested - initialAmount, currency)}</span>
        </div>
        <div class="result-item">
            <span>Total Invested:</span>
            <span>${formatCurrency(totalInvested, currency)}</span>
        </div>
        <div class="result-item">
            <span>Final Amount:</span>
            <span>${formatCurrency(currentAmount, currency)}</span>
        </div>
        <div class="result-item">
            <span>Total Profit:</span>
            <span class="${profitClass}"><span class="arrow">${arrow}</span>${formatCurrency(Math.abs(totalProfit), currency)}</span>
        </div>
        <div class="result-item">
            <span>Total Return:</span>
            <span class="${profitClass}"><span class="arrow">${arrow}</span>${totalReturnPercent.toFixed(2)} %</span>
        </div>
        <div class="result-summary ${profitClass}">
            <span class="arrow">${arrow}</span>You ${isProfitable ? 'earned' : 'lost'} ${formatCurrency(Math.abs(totalProfit), currency)} over ${periodMonths} months
        </div>
    `;

    resultDiv.style.display = 'block';
}

function formatCurrency(amount, currency) {
    return `${amount.toFixed(2)} ${currency}`;
}
