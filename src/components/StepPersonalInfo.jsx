export default function StepPersonalInfo({ register, errors }) {
  return (
    <fieldset className="step-fieldset">
      <legend>Personal info</legend>

      <label className="field">
        <span>First name</span>
        <input
          type="text"
          placeholder="Ada"
          {...register('firstName')}
          aria-invalid={!!errors.firstName}
        />
        {errors.firstName && <p className="field-error">{errors.firstName.message}</p>}
      </label>

      <label className="field">
        <span>Last name</span>
        <input
          type="text"
          placeholder="Lovelace"
          {...register('lastName')}
          aria-invalid={!!errors.lastName}
        />
        {errors.lastName && <p className="field-error">{errors.lastName.message}</p>}
      </label>

      <label className="field">
        <span>Date of birth</span>
        <input type="date" {...register('dob')} aria-invalid={!!errors.dob} />
        {errors.dob && <p className="field-error">{errors.dob.message}</p>}
      </label>
    </fieldset>
  );
}
