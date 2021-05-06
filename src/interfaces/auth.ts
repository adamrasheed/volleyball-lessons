import firebase from "firebase";
import { IUser } from "./user";

type GoogleUser = {
  uid: firebase.User["uid"];
  email: firebase.User["email"];
  token: firebase.User["refreshToken"];
  displayName: firebase.User["displayName"];
  photoUrl?: firebase.User["photoURL"];
  stsTokenManager: {
    accessToken: string;
  };
};

export interface IAuth extends GoogleUser {}
