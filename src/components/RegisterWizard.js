import React, { useState } from "react";
import Register from "../pages/register";
import PersonalInformationRegister from "../pages/PersonalInformationsRegister";


function RegisterWizard() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        familyname: "",
        address: "",
        postal_code: "",
        city: "",
        phone: "",
        date_of_birth: null,
    });
    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [loading, setLoading] = useState(false);

    const goToNextStep = () => setStep((prev) => prev + 1);
    const goToPrevStep = () => setStep((prev) => prev - 1);

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    return (
        <>
            {step === 1 && (
                <Register
                    formData={formData}
                    setFormData={updateFormData}
                    alert={alert}
                    setAlert={setAlert}
                    loading={loading}
                    onNext={goToNextStep}
                />
            )}
            {step === 2 && (
                <PersonalInformationRegister
                    formData={formData}
                    setFormData={updateFormData}
                    alert={alert}
                    setAlert={setAlert}
                    loading={loading}
                    setLoading={setLoading}
                    onBack={goToPrevStep}
                />
            )}
        </>
    );
}

export default RegisterWizard;