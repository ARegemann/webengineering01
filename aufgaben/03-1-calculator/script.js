let currentResult = '';

function updateResult() {
    document.getElementById('result').value = currentResult;
}

function appendNumber(number) {
    currentResult += number;
    updateResult();
}

function appendOperator(operator) {
    currentResult += operator;
    updateResult();
}

function calculate() {
    try {
        currentResult = eval(currentResult);
    } catch (error) {
        currentResult = 'Error';
    }
    updateResult();
}

function clearResult() {
    currentResult = '';
    updateResult();
}
