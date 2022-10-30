const swiper = new Swiper('.swiper', {
  // Optional parameters
  slidesPerView: 2,
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  spaceBetween: 20,

  // Navigation arrows
  navigation: {
    nextEl: '.arrow-button-next',
    prevEl: '.arrow-button-prev',
  },

});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: FormData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('Сталась помилка спробуйте ще раз.');
        form.classList.remove('_sending');
      }
    } else {
      alert('Будь ласка, заповніть всі необхідні поля у формі зворотнього зв\'язку.');
    }
  }

  function formValidate() {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.value === '') {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  const formAddError = (input) => {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  };
  const formRemoveError = (input) => {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  };

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});