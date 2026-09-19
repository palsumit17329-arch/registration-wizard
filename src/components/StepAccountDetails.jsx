import { useState } from 'react';

export default function StepAccountDetails({ register, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <fieldset className="step-fieldset">
      <legend>Account details</legend>

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          placeholder="ada@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="field-error">{errors.email.message}</p>}
      </label>

      <label className="field">
        <span>Password</span>
        <div className="password-row">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            {...register('password')}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <p className="field-error">{errors.password.message}</p>}
      </label>

      <label className="field">
        <span>Confirm password</span>
        <div className="password-row">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter password"
            {...register('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowConfirm((prev) => !prev)}
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="field-error">{errors.confirmPassword.message}</p>
        )}
      </label>
    </fieldset>
  );
}
