'use strict';

const body = document.querySelector('body')

const forms = document.querySelectorAll('form');
for (let item of forms) {
  item.addEventListener('submit', formSend);
}

function formSend (event) {
  event.preventDefault();
  const form = event.target;
  let error = formValidate(form);

  if (error === 0) {

    form.classList.add('_sending');

    let formData = new FormData(form);
    formData.append('email', 'ring.maks@gmail.com');

    let response = fetch('http://localhost:8000/message/sent',{
      method: 'POST',
      body: formData
    });

    response.then(
      function (result) {
        console.log(result);
        form.classList.remove('_sending');
        form.reset();
        if (result.status === 200) {
          popupClose(popup, false);
          popupOpen(success);
        }
        else {

        }
      }
    );

  } else {
    alert('Заповніть поля!');
  }
}

function formValidate(form) {
  let error = 0;
  for (let elem of form.elements) {
    formRemoveError(elem);
    if (elem.classList.contains('_name')) {
      if (elem.value.length < 2) {
        formAddError(elem);
        error++;
      }
    } else if (elem.classList.contains('_tel')) {
      if (elem.value.length < 13) {
        formAddError(elem);
        error++;
      }
    }
  }
  return error
}

function formAddError(field) {
  field.classList.add('_error');
}

function formRemoveError(field) {
  field.classList.remove('_error');
}

const tariffs = document.getElementsByClassName('tariffs__item');
for (let item of tariffs) {
  const title = item.getElementsByClassName('tariffs__item-title')[0];
  const button = item.getElementsByClassName('button')[0];
  const list = item.getElementsByClassName('tariffs__list-item');
  item.addEventListener('mouseenter', () => {
    title.classList.add('tariffs__item-title_hover');
    button.classList.remove('button_red');
    button.classList.add('button_white')
    for (let elem of list) {
      elem.classList.remove('list_red');
      elem.classList.add('list_white');
    }
  })
  item.addEventListener('mouseleave', () => {
    title.classList.remove('tariffs__item-title_hover');
    button.classList.add('button_red');
    button.classList.remove('button_white')
    for (let elem of list) {
      elem.classList.add('list_red');
      elem.classList.remove('list_white');
    }
  })
}

// створення модального вікна

let unlock = true;

const timeout = 800;

const popup = document.querySelector('#popupForm');
const success = document.querySelector('#success');
const btns = document.querySelectorAll('button');

for (let btn of btns) {
  if(!btn.closest('form')) {
    btn.addEventListener('click', function(e) {
      popupOpen(popup);
      e.preventDefault();
    })
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');

for (let el of popupCloseIcon) {
  el.addEventListener('click', function(e) {
    popupClose(e.target.closest('.popup'));
    e.preventDefault();
  });
}

function popupOpen(pop) {
  if (pop && unlock) {
    bodyLock();
    pop.classList.add('open');
    pop.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if(unlock) {
    popupActive.classList.remove('open');
    if(doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('_lock');

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    body.style.paddingRight = '0px';
    body.classList.remove('_lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function(e) {
  if (e.which === 27) {
    popupClose(popup);
  }
});


//бургер меню
const iconBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
if (iconBurger) {
  iconBurger.addEventListener('click', function(e) {
    body.classList.toggle('_lock');
    iconBurger.classList.toggle('_active');
    headerMenu.classList.toggle('_active');
  });
}
