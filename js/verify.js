firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var inputData = document.querySelectorAll("input");
var btnSubmit = document.querySelectorAll("button")[0];
let email, password;

btnSubmit.addEventListener("click", getInputData);
var errorSpan = document.getElementById("sb");

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

function createUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => console.log(err));
}

function login(email, password) {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log(firebase.auth().currentUser);
        })
        .catch((err) => {
          errVerify(err)
          console.log(err);
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

function errVerify(err){
  switch (err.code) {
    case "auth/too-many-requests":
      errorSpan.innerHTML =
        "Você já realizou muitas tentativas, tente mais tarde!";
      break;
    case "auth/wrong-password":
      errorSpan.innerHTML = "Você errou a senha, tente novamente";
      break;
    case "auth/user-not-found":
      errorSpan.innerHTML = "Usuário incorrecto ou inexistente.";
    default:
      break;
  }
}