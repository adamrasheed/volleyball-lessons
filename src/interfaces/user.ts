import firebase from "firebase";

export interface IUser {
  id: firebase.User["uid"];
  email: firebase.User["email"];
  token: firebase.User["refreshToken"];
  displayName: firebase.User["displayName"];
  credential: firebase.auth.UserCredential["credential"];
  photoUrl?: firebase.User["photoURL"];
  isCoach?: boolean;
}
