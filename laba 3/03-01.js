const http = require('http');
const readline = require('readline');

let currentState = 'norm';

const server = http.createServer((req, res) => {
  let currentState = getCurrentState();
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<h1>${currentState}</h1>`);
});

function getCurrentState() {
  return currentState;
}

function updateState(newState) {
    console.log(reg = `${currentState}--> ${newState}`);
    currentState = newState;
    rl.setPrompt(`${currentState}->`);
  }

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.on('line', (input) => {
  input = input.trim();
  if (input === 'exit') {
    console.log(``);
    rl.close();
    server.close();
    return;
  }
  if (['norm', 'stop', 'test', 'idle'].includes(input)) {
    updateState(input);
  } else {
    console.log(`Invalid state: ${input}`);
  }
  rl.prompt();
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  rl.setPrompt(`${currentState}->`);
  rl.prompt();
});