firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var inputData = document.querySelectorAll("input");
var btnSubmit = document.querySelectorAll("button");
var icons = document.querySelectorAll("i");
var errorSpan = document.getElementById("sb");

let form = document.querySelector("form");
let text = document.querySelectorAll("h2");
let email, password;

btnSubmit[0].addEventListener("click", getInputData);

function getInputData(evt) {
  email = inputData[0].value;
  password = inputData[1].value;
  evt.preventDefault();
  if (email.length <= 0 || password.length <= 0) {
    alert("Insira um email/senha válido");
  } else {
    createUser(email, password);
  }
}

function createUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      hideInput();
    })
    .catch((err) => {
      console.log(err);
      errVerify(err.code);
    });
}

function hideInput() {
  text[0].innerHTML = "Parabéns sua conta foi criada! <span></span><br> Você será redirecionado para o login";
  btnSubmit[0].style.display = "none";
  form.style.display = "none";
  text[0].classList.add("aflip");
  animationLoading();
}

function animationLoading() {
    icons[1].style.visibility = "visible";
    icons[1].classList.add("faflip");
    setTimeout(() => {
        icons[1].style.visibility = "hidden";
        icons[1].classList.remove("faflip");
        window.location.assign("/ptbr/index.html");
    }, 2000);
}

function errVerify(err){
  switch (err) {
    case "auth/email-already-in-use":
      errorSpan.innerHTML = "Este email já está cadastro!";
      break;
    case "auth/weak-password":
      errorSpan.innerHTML = "Você digitou uma senha fraca, tente novamente!";
      break;
    default:
      break;
  }
}

