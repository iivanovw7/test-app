import type { CreateRequestData, QueryRequest } from "#/api";

import { makeApiRequest } from "@/shared/utils";
import { $, createContextId, useStore } from "@builder.io/qwik";

import { createRequest, deleteRequest, getRequestCount, getRequests } from "../api";

export type ProfileRequestFormFields = CreateRequestData;
export type ProfileRequestFormValidation = Record<keyof ProfileRequestFormFields, Nullable<string>>;

export type ProfileRequestsFormState = {
    create: (values: ProfileRequestFormFields) => Promise<Voidable<Nullable<QueryRequest>>>;
    deleteRequest: (id: string) => Promise<Voidable<boolean>>;
    errorMessage: string;
    form: ProfileRequestFormFields;
    getRequestCount: () => Promise<number>;
    getRequests: (id: string) => Promise<void>;
    initialForm: ProfileRequestFormFields;
    isLoading: boolean;
    myRequests: QueryRequest[];
    resetValidation: () => void;
    setFormField: <Key extends keyof ProfileRequestFormFields>(
        field: Key,
        value: ProfileRequestFormFields[Key],
    ) => void;
    setValidation: (validation: ProfileRequestFormValidation) => void;
    setValidationEnabled: (isEnabled: boolean) => void;
    setValidationVield: <Key extends keyof ProfileRequestFormValidation>(
        field: Key,
        value: ProfileRequestFormValidation[Key],
    ) => void;
    successMessage: string;
    validation: ProfileRequestFormValidation;
    validationEnabled: boolean;
};

export const PROFILE_INITIAL_REQUEST_FORM: ProfileRequestFormFields = {
    avatarUrl: "",
    description: "",
    endsAt: "",
    isHidden: false,
    startsAt: "",
    title: "",
};

export const PROFILE_REQUEST_FORM_INITIAL_VALIDATION: ProfileRequestFormValidation = {
    avatarUrl: null,
    description: null,
    endsAt: null,
    isHidden: null,
    startsAt: null,
    title: null,
};

export const ProfileRequestsFormContext = createContextId<ProfileRequestsFormState>("profile-form-requests-context");

export const useProfileRequestsFormState = () => {
    return useStore<ProfileRequestsFormState>({
        create: $(async function (this: ProfileRequestsFormState, values: ProfileRequestFormFields) {
            let result = await makeApiRequest({
                onError: () => {
                    this.errorMessage = "Unknown error";
                },
                request: async () => {
                    let response = await createRequest(values);

                    if (response.success) {
                        return response.data;
                    }

                    this.errorMessage = response.message;

                    return null;
                },
                setLoading: (isLoading: boolean) => {
                    this.isLoading = isLoading;
                },
            });

            return result?.id ? result : null;
        }),
        deleteRequest: $(async function (this: ProfileRequestsFormState, requestId: string) {
            return makeApiRequest({
                request: async () => {
                    let result = await deleteRequest(requestId);

                    if (result.success) {
                        this.myRequests = this.myRequests.filter(({ id }) => requestId !== id);
                    }
                },
            });
        }),
        errorMessage: "",
        form: { ...PROFILE_INITIAL_REQUEST_FORM },
        getRequestCount: $(async () => {
            let result = await makeApiRequest({
                request: async () => {
                    return await getRequestCount();
                },
            });

            if (result?.success) {
                return result.data || 0;
            }

            return 0;
        }),
        getRequests: $(async function (this: ProfileRequestsFormState, id: string) {
            let result = await makeApiRequest({
                request: async () => {
                    return await getRequests(id);
                },
            });

            if (result?.success) {
                this.myRequests = result.data?.data || [];
            }
        }),
        initialForm: { ...PROFILE_INITIAL_REQUEST_FORM },
        isLoading: false,
        myRequests: [],
        resetValidation: $(function (this: ProfileRequestsFormState) {
            this.validation = { ...PROFILE_REQUEST_FORM_INITIAL_VALIDATION };
        }),
        setFormField: $(function <Key extends keyof ProfileRequestFormFields>(
            this: ProfileRequestsFormState,
            field: Key,
            value: ProfileRequestFormFields[Key],
        ) {
            this.form[field] = value;
        }),
        setValidation: $(function (this: ProfileRequestsFormState, validation: ProfileRequestFormValidation) {
            this.validation = validation;
        }),
        setValidationEnabled: $(function (this: ProfileRequestsFormState, isEnabled: boolean) {
            this.validationEnabled = isEnabled;
        }),
        setValidationVield: $(function <Key extends keyof ProfileRequestFormValidation>(
            this: ProfileRequestsFormState,
            field: Key,
            value: ProfileRequestFormValidation[Key],
        ) {
            this.validation[field] = value;
        }),
        successMessage: "",
        validation: { ...PROFILE_REQUEST_FORM_INITIAL_VALIDATION },
        validationEnabled: false,
    });
};
