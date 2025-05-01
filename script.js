const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const toggleBtn = document.getElementById('toggle-mode');

let input = '';
let memory = 0;

function updateDisplay() {
  display.value = input;
}

// Allow only these characters from keyboard
const allowedKeys = /[0-9+\-*/.%()]/;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.textContent;

    if (val === 'C') {
      input = '';
    } else if (val === '⌫') {
      input = input.slice(0, -1);
    } else if (val === '=') {
      try {
        input = eval(input).toString();
      } catch {
        input = 'Error';
      }
    } else if (/^[0-9+\-*/.%()]+$/.test(val)) {
      input += val;
    } else if (val === 'M+') {
      memory = parseFloat(input);
    } else if (val === 'MR') {
      input = memory.toString();
    }

    updateDisplay();
  });
});

// 🧼 Keyboard validation
document.addEventListener('keydown', (e) => {
  if (allowedKeys.test(e.key)) {
    input += e.key;
  } else if (e.key === 'Backspace') {
    input = input.slice(0, -1);
  } else if (e.key === 'Enter') {
    try {
      input = eval(input).toString();
    } catch {
      input = 'Error';
    }
  } else if (e.key === 'Escape') {
    input = '';
  }

  updateDisplay();
});

// 🌗 Dark Mode Toggle
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    toggleBtn.textContent = '🌞';
  } else {
    toggleBtn.textContent = '🌙';
  }
});

// 🌓 Start in dark mode
document.body.classList.add('dark-mode');
