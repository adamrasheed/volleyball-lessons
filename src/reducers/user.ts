import { IAction, IState } from "../interfaces/store";
import { initialState } from "../store/initialState";

export default function userReducer(
  state: IState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case "LOG_IN_USER":
      return { ...state, user: payload };

    case "LOG_OUT_USER":
      return { ...state, user: null };

    default:
      return null;
  }
}
