/*
This file is Exports hooks for OpenAPI endpoints using the api client.
It is most certain that this file is not bugged.
Do not edit this file manually.
*/

import { api } from './openapi';
import { components } from './schema';

// Auth hooks

// POST /auth/verify
export function useLogin(): {
  data: components['schemas']['TokenVerificationResponse'] | undefined,
  isLoading: boolean,
  error: string | null,
  refetch: () => void
} {
  const result = api.useQuery("post", "/auth/verify", {});
  
  return {
    data: result.data,
    isLoading: result.isLoading,
    error: result.error ? (result.error.message || 'Login failed') : null,
    refetch: result.refetch
  };
}

// POST /auth/signup
export function useSignup(): {
  mutate: (variables: { body: components['schemas']['SignUpBody'] }) => void,
  mutateAsync: (variables: { body: components['schemas']['SignUpBody'] }) => Promise<components['schemas']['SignUpResponse']>,
  data: components['schemas']['SignUpResponse'] | undefined,
  error: string | null,
  isPending: boolean,
  isSuccess: boolean,
  isError: boolean,
  isIdle: boolean,
  reset: () => void,
  status: 'idle' | 'pending' | 'success' | 'error'
} {
  const result = api.useMutation("post", "/auth/signup");
  return {
    ...result,
    error: result.error ? (result.error.message || 'Signup failed') : null
  };
}

// POST /auth/signup/verify
export function useVerifySignUpProvider(): {
  mutate: (variables: { body: components['schemas']['VerifySignUpProviderBody'] }) => void,
  mutateAsync: (variables: { body: components['schemas']['VerifySignUpProviderBody'] }) => Promise<components['schemas']['SignUpResponse']>,
  data: components['schemas']['SignUpResponse'] | undefined,
  error: string | null,
  isPending: boolean,
  isSuccess: boolean,
  isError: boolean,
  isIdle: boolean,
  reset: () => void,
  status: 'idle' | 'pending' | 'success' | 'error'
} {
  const result = api.useMutation("post", "/auth/signup/verify");
  return {
    ...result,
    error: result.error ? (result.error.message || 'Verification failed') : null
  };
}

// PATCH /auth/change-password
export function useChangePassword(): {
  mutate: (variables: { body: components['schemas']['ChangePasswordBody'] }) => void,
  mutateAsync: (variables: { body: components['schemas']['ChangePasswordBody'] }) => Promise<components['schemas']['ChangePasswordResponse']>,
  data: components['schemas']['ChangePasswordResponse'] | undefined,
  error: string | null,
  isPending: boolean,
  isSuccess: boolean,
  isError: boolean,
  isIdle: boolean,
  reset: () => void,
  status: 'idle' | 'pending' | 'success' | 'error'
} {
  const result = api.useMutation("patch", "/auth/change-password");
  return {
    ...result,
    error: result.error ? (result.error.message || 'Password change failed') : null
  };
}

// User hooks

export function useUserByFirebaseUID(firebaseUID: string): {
  data: components['schemas']['UserByFirebaseUIDResponse'] | undefined,
  isLoading: boolean,
  error: string | null,
  refetch: () => void
} {
  const result = api.useQuery("get", "/users/firebase/{firebaseUID}", {
    params: { path: { firebaseUID } }
  });

  return {
    data: result.data,
    isLoading: result.isLoading,
    error: result.error ? (result.error.message || 'Failed to fetch user by Firebase UID') : null,
    refetch: result.refetch
  };
}

// Types for quiz questions
export interface BufferId {
  buffer: {
    type: "Buffer";
    data: number[];
  };
}

export interface LotItem {
  text: string; 
  _id: BufferId;
}

export interface BaseQuestionRenderView {
  _id: BufferId;
  type: string;
  isParameterized: boolean;
  text: string;
  hint: string;
  points: number;
  timeLimitSeconds: number;
  parameterMap: Record<string, unknown>;
}

export interface DescriptiveQuestionRenderView extends BaseQuestionRenderView {
  type: "DESCRIPTIVE";
}

export interface SelectManyInLotQuestionRenderView extends BaseQuestionRenderView {
  type: "SELECT_MANY_IN_LOT";
  lotItems: LotItem[];
}

export interface OrderTheLotsQuestionRenderView extends BaseQuestionRenderView {
  type: "ORDER_THE_LOTS";
  lotItems: LotItem[];
}

export interface NumericAnswerQuestionRenderView extends BaseQuestionRenderView {
  type: "NUMERIC_ANSWER_TYPE";
  decimalPrecision: number;
  expression: string;
}

export interface SelectOneInLotQuestionRenderView extends BaseQuestionRenderView {
  type: "SELECT_ONE_IN_LOT";
  lotItems: LotItem[];
}

export type QuestionRenderView = 
  | DescriptiveQuestionRenderView
  | SelectManyInLotQuestionRenderView
  | OrderTheLotsQuestionRenderView
  | NumericAnswerQuestionRenderView
  | SelectOneInLotQuestionRenderView;
