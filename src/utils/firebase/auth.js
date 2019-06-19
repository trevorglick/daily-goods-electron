import { auth, googleAuthProvider } from "./index";

export function getCurrentUser() {
  return auth.currentUser;
}

export function doCreateUserWithEmailAndPassword(email, password) {
  return auth
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
  return auth
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
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
  return auth.signInWithRedirect(googleAuthProvider);
}

export function getRedirectResult() {
  return auth
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      // var user = result.user;
      return result;
    })
    .catch(error => {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
      console.log("theres an error!");
      console.log(error);
      return error;
    });
}
