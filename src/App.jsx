import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ProgressBar from './components/ProgressBar.jsx';
import StepPersonalInfo from './components/StepPersonalInfo.jsx';
import StepAccountDetails from './components/StepAccountDetails.jsx';
import StepReview from './components/StepReview.jsx';
import { personalInfoSchema, accountDetailsSchema } from './schema/wizardSchema.js';

const STEP_LABELS = ['Personal info', 'Account details', 'Review & submit'];
const TOTAL_STEPS = STEP_LABELS.length;

const EMPTY_DATA = {
  firstName: '',
  lastName: '',
  dob: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(EMPTY_DATA); // lifted, unified payload
  const [submitted, setSubmitted] = useState(false);

  // One RHF instance per validated step. Both are always mounted (rules of
  // hooks), but only the active step's instance is rendered/used.
  const step1Form = useForm({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
    },
  });

  const step2Form = useForm({
    resolver: zodResolver(accountDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  });

  const goBack = () => {
    if (step === 2) {
      // Persist whatever is currently in step 2's fields before leaving,
      // in case the user comes back to it.
      setFormData((prev) => ({ ...prev, ...step2Form.getValues() }));
    }
    setStep((prev) => Math.max(1, prev - 1));
  };

  const onStep1Submit = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setStep(2);
  };

  const onStep2Submit = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setStep(3);
  };

  const handleFinalSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('Registration payload:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="wizard-shell">
        <div className="success-card">
          <h1>You're registered, {formData.firstName}.</h1>
          <p>Your details were captured and logged to the console.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="wizard-shell">
      <h1 className="wizard-title">Create your account</h1>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} stepLabels={STEP_LABELS} />

      {step === 1 && (
        <form onSubmit={step1Form.handleSubmit(onStep1Submit)} noValidate>
          <StepPersonalInfo register={step1Form.register} errors={step1Form.formState.errors} />
          <div className="step-actions">
            <span />
            <button type="submit" disabled={!step1Form.formState.isValid}>
              Next
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={step2Form.handleSubmit(onStep2Submit)} noValidate>
          <StepAccountDetails register={step2Form.register} errors={step2Form.formState.errors} />
          <div className="step-actions">
            <button type="button" onClick={goBack}>
              Back
            </button>
            <button type="submit" disabled={!step2Form.formState.isValid}>
              Next
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div>
          <StepReview data={formData} />
          <div className="step-actions">
            <button type="button" onClick={goBack}>
              Back
            </button>
            <button type="button" onClick={handleFinalSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
