export default function ProgressBar({ currentStep, totalSteps, stepLabels }) {
  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="progress-label">
        Step {currentStep} of {totalSteps} — {stepLabels[currentStep - 1]}
      </p>
    </div>
  );
}
