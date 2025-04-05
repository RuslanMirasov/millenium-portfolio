import { quizData } from './form.js';
import { goToSlide } from './slider.js';
const submitButton = document.querySelector('[data-js="submit"]');
const errorEl = document.querySelector('[data-error]');
const successEl = document.querySelector('[data-success]');

const sendToEmail = async (data, successMessage) => {
  const { subject, phone, know, city, beautyServices, agree } = data;
  const formData = new FormData();

  formData.append('message', '🎉 Новая заявка купона на 1.000₽! Проверьте данные ниже.');
  formData.append('from_name', 'Millenium Quiz');
  formData.append('access_key', '758094c6-3d5d-4ac5-8623-7c8a7fc3ba48'); // КЛИЕНТСКИЙ - bceea8ab-b617-4135-b01f-ea1e57a340c5 MOЙ 758094c6-3d5d-4ac5-8623-7c8a7fc3ba48
  formData.append('subject', subject);
  formData.append('Телефон', phone);
  formData.append('Вы проживаете в г.Долгопрудный?', city);
  formData.append('Знакомы ли с центром красоты и косметологии Millenium?', know);
  formData.append('Какие услуги красоты обычно оказываете в салонах красоты?', beautyServices.map(s => s.replace(/^__text__/, '')).join(' | '));
  formData.append('Согласны на обработку персональных данных?', agree ? 'Да' : 'Нет');

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      successEl.innerText = successMessage;
      goToSlide('success');
    } else {
      errorEl.innerText = 'При отправке запроса на E-mail что-то пошло не так...';
      goToSlide('error');
    }
  } catch {
    errorEl.innerText = 'При отправке запроса на E-mail что-то пошло не так...';
    goToSlide('error');
  }
};

const handleSubmit = async e => {
  const submitButton = e.currentTarget;

  try {
    submitButton.classList.add('loading');
    const { phone } = quizData;

    const response = await fetch('https://millenium-quiz-backend.vercel.app/api/save-phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });

    const result = await response.json();

    if (result.success) {
      sendToEmail(quizData, result.message);
    } else {
      errorEl.innerText = result.message;
      goToSlide('error');
    }
  } catch (error) {
    errorEl.innerText = 'Не удалось соедениться с сервером :(';
    goToSlide('error');
  } finally {
    submitButton.classList.remove('loading');
  }
};

submitButton.addEventListener('click', handleSubmit);
