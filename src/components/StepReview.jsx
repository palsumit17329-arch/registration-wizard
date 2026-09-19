export default function StepReview({ data }) {
  return (
    <fieldset className="step-fieldset">
      <legend>Review &amp; submit</legend>
      <p className="review-hint">Check your details before submitting.</p>

      <dl className="review-list">
        <dt>First name</dt>
        <dd>{data.firstName}</dd>

        <dt>Last name</dt>
        <dd>{data.lastName}</dd>

        <dt>Date of birth</dt>
        <dd>{data.dob}</dd>

        <dt>Email</dt>
        <dd>{data.email}</dd>

        <dt>Password</dt>
        <dd>{'•'.repeat(data.password?.length || 0)}</dd>
      </dl>
    </fieldset>
  );
}
