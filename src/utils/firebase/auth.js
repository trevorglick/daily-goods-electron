import { auth, googleAuthProvider } from "./index";

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
