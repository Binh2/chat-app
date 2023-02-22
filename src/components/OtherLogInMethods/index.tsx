import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GithubAuthProvider, getAuth } from "firebase/auth";

import { StyledFirebaseAuth } from "@/components/StyledFirebaseAuth";
import { firebaseApp } from "@/firebase";

// Configure FirebaseUI.
const uiConfig = {
  signInSuccessUrl: "/chat",
  signInOptions: [GithubAuthProvider.PROVIDER_ID],
  signInFlow: "popup",
};

export default function OtherLogInMethods() {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(firebaseApp)} />
  );
}