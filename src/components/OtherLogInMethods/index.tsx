import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GithubAuthProvider, getAuth } from "firebase/auth";

import { StyledFirebaseAuth } from "@/components/StyledFirebaseAuth";
import { initAuthEmulator } from "@/firebase/auth";
import { firebaseApp } from "@/firebase";
initAuthEmulator();

// Configure FirebaseUI.
const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [GithubAuthProvider.PROVIDER_ID],
  signInFlow: "popup",
};

export default function OtherLogInMethods() {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(firebaseApp)} />
  );
}

// import Head from 'next/head';

// import firebase from 'firebase/compat/app'
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'

// export default function OtherLogInMethods() {
//   // FirebaseUI config.
//   var uiConfig = {
//     signInSuccessUrl: '@/pages/Chat',
//     signInOptions: [
//       // Leave the lines as is for the providers you want to offer your users.
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//       firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
//     ],
//     // tosUrl and privacyPolicyUrl accept either url string or a callback
//     // function.
//     // Terms of service url/callback.
//     tosUrl: '@/pages/404.tsx',
//     // Privacy policy url/callback.
//     // privacyPolicyUrl: function() {
//     //   window.location.assign('@/pages/404.tsx');
//     // }
//   };

//   // Initialize the FirebaseUI Widget using Firebase.
//   var ui = new firebaseui.auth.AuthUI(firebase.auth());
//   // The start method will wait until the DOM is loaded.
//   ui.start('#firebaseui-auth-container', uiConfig);

//   return (
//     <>
//       {/* <Head>
//         <meta charset="UTF-8" />
//         <title>Sample FirebaseUI App</title>

//       </Head> */}
//       <div>
//         <h1>Welcome to My Awesome App</h1>
//         <div id="firebaseui-auth-container"></div>
//       </div>
//     </>
//   )
// }