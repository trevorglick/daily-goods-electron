import { app, auth, googleAuthProvider } from "./index";

export function getCurrentUser() {
  return auth.currentUser;
}

export function doCreateUserWithEmailAndPassword(email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(getCurrentUser => {
      getCurrentUser.user
        .sendEmailVerification()
        .then(() => {
          console.log("sending verification email");
          // Email sent.
        })
        .catch(function(error) {
          // An error happened.
          console.log("failure sending verification email");
        });
    })
    .catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function doSignInWithEmailAndPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`${errorCode}: ${errorMessage}`);
  });
}

export function doSignOut() {
  const user = getCurrentUser();
  console.log(`attempting to sign out: ${user}`);

  return auth.signOut();
}

export function doSignInWithGoogle() {
  console.log("attempting sign in from redirect");
  console.log(googleAuthProvider);
  auth.signInWithRedirect(googleAuthProvider);
}

export function getRedirectResult() {
  auth
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
        console.log("got a token and it is:");
        console.log(token);
      }
      // The signed-in user info.
      console.log("got a result and it is:");
      console.log(result);
      var user = result.user;
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log("theres an error!");
      console.log(error);
    });
}
