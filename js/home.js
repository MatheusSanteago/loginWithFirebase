
firebase.initializeApp(firebaseConfig);
var h1 = document.querySelector("h1");
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        h1.innerHTML = "Olá " +  user.email + ", complete seu cadastro!";
      console.log(user.email);
    } else {
      console.log("Usuário Deslogado!");
    }
  });


