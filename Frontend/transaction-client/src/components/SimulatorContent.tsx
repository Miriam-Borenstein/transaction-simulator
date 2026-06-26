import './SimulatorContent.css';

export default function SimulatorContent() {
  return (
    <div className="simulator-card">
      <div className="simulator-card__header">
        <div className="simulator-card__header-inner">
          <div className="simulator-card__badge">
            <span className="simulator-card__badge-text">TRANSACTION SIMULATOR</span>
          </div>
          <h2 className="simulator-card__title">Will this transaction be approved?</h2>
        </div>
      </div>

      <div className="simulator-card__mockups">
        <div className="simulator-card__screen">
          <img src="/desctop.png" alt="Shva desktop preview" />
        </div>
        <div className="simulator-card__phone">
          <img src="/mobile.png" alt="Shva mobile preview" />
        </div>
      </div>
    </div>
  );
}
