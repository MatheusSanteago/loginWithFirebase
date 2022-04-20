firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var inputData = document.querySelectorAll("input");
var btnSubmit = document.querySelectorAll("button");
let bText = document.querySelectorAll("a");
let email, password;

let form = document.querySelector("form");
let text = document.querySelectorAll("h2");
var icons = document.querySelectorAll("i");

btnSubmit[0].addEventListener("click", getInputData);
var errorSpan = document.getElementById("sb");
var teste = document.getElementById("teste");
//console.log(navigator.language);

function getInputData(evt) {
  email = inputData[0].value;
  password = inputData[1].value;
  evt.preventDefault();
  if (email.length <= 0 || password.length <= 0) {
    alert("Insira um email/senha válido");
  } else {
    login(email, password);
  }
}

function login(email, password) {
  text[0].innerHTML = "Realizando Login";
  hideInput();
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          text[0].innerHTML =
            "Parabéns seu login foi realizado! <span></span><br> Você será redirecionado para a página inicial";
          console.log(user);
          console.log(firebase.auth().currentUser);
        })
        .catch((err) => {
          errVerify(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then((obj) => console.log(obj))
    .catch((err) => console.log(err));
}

function errVerify(err) {
  switch (err.code) {
    case "auth/too-many-requests":
      text[0].innerHTML =
        "Você já realizou muitas tentativas, tente mais tarde!";
      reShow();
      break;
    case "auth/wrong-password":
      text[0].innerHTML = "Você errou a senha, tente novamente";
      reShow();
      break;
    case "auth/user-not-found":
      text[0].innerHTML = "Usuário incorrecto ou inexistente.";
      reShow();
    default:
      break;
  }
}

function hideInput() {
  btnSubmit[0].style.display = "none";
  form.style.display = "none";
  text[0].classList.add("aflip");
  bText[0].style.display = "none";
  animationLoading();
}
function reShow() {
  icons[1].style.visibility = "hidden";
  btnSubmit[0].style.display = "block";
  form.style.display = "flex";
  text[0].classList.remove("aflip");
  bText[0].style.display = "block";
}
function animationLoading() {
  icons[1].style.visibility = "visible";
  icons[1].classList.add("faflip");
  setTimeout(() => {
    icons[1].style.visibility = "hidden";
    icons[1].classList.remove("faflip");
    //window.location.assign("https://www.youtube.com/watch?v=VwDDL06g604&ab_channel=DjStarSunglasses");
  }, 2000);
}

var today = new Date();
var date =
  today.getDate() + " - " + today.getMonth() + " - " + today.getFullYear();
var todayDate = new Date();
var time =
  todayDate.getHours() +
  ":" +
  todayDate.getMinutes() +
  ":" +
  todayDate.getSeconds();
