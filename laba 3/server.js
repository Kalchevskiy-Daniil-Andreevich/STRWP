let currentState = 'norm';

function getCurrentState() {
    return currentState;
}

function updateState(newState) {
    console.log(reg = `${currentState}--> ${newState}`);
    currentState = newState;
}

module.exports = { getCurrentState, updateState };
