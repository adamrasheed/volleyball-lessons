export type IWindow = typeof window & {
  recaptchaVerifier: any;
  recaptchaWidgetId?: string;
};

export interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}
