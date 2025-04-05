import { debounce } from './scripts.js';

const allInputs = document.querySelectorAll('[data-js="input"]');
const phone = document.querySelector('[name="phone"]');
const multiCheckboxFields = ['beautyServices'];
export const quizData = {
  subject: 'Купон на 1.000₽ на первое посещение салона',
  agree: false,
};

const handleInputChange = input => {
  const { name, value, type, checked } = input;

  if (type === 'checkbox') {
    if (multiCheckboxFields.includes(name)) {
      if (!quizData[name]) {
        quizData[name] = [];
      }

      if (checked) {
        if (!quizData[name].includes(value)) {
          quizData[name].push(value);
        }
      } else {
        quizData[name] = quizData[name].filter(v => v !== value);
      }
    } else {
      quizData[name] = checked;
    }
  } else if (type === 'text') {
    if (!quizData[name]) {
      quizData[name] = [];
    }

    quizData[name] = quizData[name].filter(v => !v.startsWith('__text__'));

    if (value.trim()) {
      quizData[name].push(`__text__${value.trim()}`);
    }
  } else {
    quizData[name] = value;
  }
};

const mask = IMask(phone, {
  mask: '+{7} (000) 000-00-00',
  lazy: false,
  placeholderChar: '_',
});

const validateInput = input => {
  const { name, value, type } = input;
  const parent = input.closest('.inputs');
  const agreeInput = parent.querySelector('[name="agree"]');
  const button = parent.querySelector('.button');

  if (type === 'tel') {
    const phoneRegEx = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const isValidPhone = phoneRegEx.test(value);

    if (!isValidPhone || value === '+7 (___) ___-__-__' || value === '') {
      input.classList.add('invalid');
      button.setAttribute('disabled', 'disabled');
      return;
    }

    input.classList.remove('invalid');
  }

  // === Общее поведение ===
  if (!quizData[name] || quizData[name].length === 0) {
    button.setAttribute('disabled', 'disabled');
    return;
  }

  if (agreeInput && !agreeInput.checked) {
    button.setAttribute('disabled', 'disabled');
    return;
  }

  button.removeAttribute('disabled');
};

const onInputEvent = e => {
  const input = e.currentTarget;
  debouncedInputHandler(input);
};

const debouncedInputHandler = debounce(input => {
  handleInputChange(input);
  validateInput(input);
}, 100);

phone.addEventListener('blur', () => {
  if (mask.unmaskedValue.trim() === '') {
    mask.value = '';
  }
});

allInputs.forEach(input => input.addEventListener('input', onInputEvent));
phone.addEventListener('blur', e => e.currentTarget.classList.remove('invalid'));
