'use strict';

const contactForm = document.getElementById("formCont");
contactForm.addEventListener('submit', formSend);

console.log(contactForm);

async function formSend (event) {
  event.preventDefault();
  console.log(event);


  // let formData = new FormData(contactForm);
  // formData.append('email', 'ring.maks@gmail.com');
  // let response = await fetch('http://localhost:8000/message/send',{
  //   method: 'POST',
  //   body: formData
  // })
  //
  // console.log(response);
}
