import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApplicationFormData} from '../../types/application';
import {loadStorageData, STORAGE_FORM_DATA_KEY} from '../../utils/storage';

const initialFormData: ApplicationFormData = {
    personal: {
        name: '',
        nationalId: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: ''
    },
    family: {
        maritalStatus: '',
        dependents: 0,
        employmentStatus: '',
        monthlyIncome: 0,
        housingStatus: ''
    },
    situation: {
        currentFinancialSituation: '',
        employmentCircumstances: '',
        reasonForApplying: ''
    }
};

interface FormDataState {
    formData: ApplicationFormData;
}

const initialState: FormDataState = {
    formData: loadStorageData(STORAGE_FORM_DATA_KEY, initialFormData)
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        updatePersonalInfo: (state, action: PayloadAction<Partial<ApplicationFormData['personal']>>) => {
            state.formData.personal = {...state.formData.personal, ...action.payload};
        },
        updateFamilyInfo: (state, action: PayloadAction<Partial<ApplicationFormData['family']>>) => {
            state.formData.family = {...state.formData.family, ...action.payload};
        },
        updateSituationInfo: (state, action: PayloadAction<Partial<ApplicationFormData['situation']>>) => {
            state.formData.situation = {...state.formData.situation, ...action.payload};
        },
        resetFormData: (state) => {
            state.formData = initialFormData;
        }
    }
});

export const {
    updatePersonalInfo,
    updateFamilyInfo,
    updateSituationInfo,
    resetFormData
} = formDataSlice.actions;

export default formDataSlice.reducer;
