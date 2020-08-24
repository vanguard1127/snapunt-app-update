import * as Yup from 'yup';

export const cardValidation = Yup.object().shape({
    card_number: Yup.string()
        .max(16, "Card number can be max of 16")
        .required("Card number is required"),
    cvc: Yup.string()
        .min(3, "CVC can't be less than 3")
        .max(4, "CVC can be max of 4")
        .required("CVC is required"),
    name: Yup.string()
        .required("Card owner name is required"),
    expireMonth: Yup.string()
        .min(2, "Incorrect format")
        .max(2, "Incorrect format")
        .required("Expiry month is required"),
    expireYear: Yup.string()
        .min(4, "Incorrect format")
        .max(4, "Incorrect format")
        .required("Expiry year is required"),
});