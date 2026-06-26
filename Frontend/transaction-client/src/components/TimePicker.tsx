import { useState, useEffect } from 'react';
import './TimePicker.css';

type Props = {
  value: Date;
  onChange: (time: Date) => void;
  onCancel: () => void;
  onOk: () => void;
};

export default function TimePicker({ value, onChange, onCancel, onOk }: Props) {
  const [active, setActive] = useState<'hour' | 'minute'>('hour');
  const [hourInput, setHourInput] = useState(value.getHours().toString().padStart(2, '0'));
  const [minuteInput, setMinuteInput] = useState(value.getMinutes().toString().padStart(2, '0'));
  const [invalidHour, setInvalidHour] = useState(false);
  const [invalidMinutes, setInvalidMinutes] = useState(false);

  useEffect(() => {
    setHourInput(value.getHours().toString().padStart(2, '0'));
    setMinuteInput(value.getMinutes().toString().padStart(2, '0'));
  }, [value]);

  const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

      if (e.key === 'Tab') return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        setHourInput(prev => ("0" + prev[0]).slice(-2));
        return;
      }

      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      const next = (hourInput + e.key).slice(-2);

      if (Number(next) > 23) {
        setInvalidHour(true);

        setTimeout(() => {
            setInvalidHour(false);
        }, 250);

        return;
      }

      setHourInput(next);

};

const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Tab') return;

  if (e.key === 'Backspace') {
    e.preventDefault();

    setMinuteInput(prev => ("0" + prev[0]).slice(-2));
    return;
  }

  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
    return;
  }

  e.preventDefault();

  const next = (minuteInput + e.key).slice(-2);

  if (Number(next) > 59) {
    setInvalidMinutes(true);

    setTimeout(() => {
        setInvalidMinutes(false);
    }, 250);

    return;
  }

  setMinuteInput(next);
};
  const handleHourBlur = () => {
  const num = Number(hourInput);

  if (num < 0 || num > 23) {
    setHourInput(value.getHours().toString().padStart(2, "0"));
    return;
  }

  const updated = new Date(value);
  updated.setHours(num);

  setHourInput(num.toString().padStart(2, "0"));
  onChange(updated);
};

const handleMinuteBlur = () => {
    const updated = new Date(value);
    updated.setMinutes(Number(minuteInput));
    onChange(updated);
};

  return (
    <div className="time-picker">
      <div className="time-picker__header">
        <p className="time-picker__title">Enter time</p>
      </div>

      <div className="time-picker__input-selection">
        <div className="time-picker__input">
          <div className="time-picker__selectors">

            <div className="time-picker__segment">
              <div
                className={`time-picker__field
                  ${active === 'hour' ? ' time-picker__field--selected' : ''}
                  ${invalidHour ? ' time-picker__field--invalid' : ''}`}
                onClick={() => setActive('hour')}
              >
                <input
                  className="time-picker__time-text"
                  type="text"
                  inputMode="numeric"
                  value={hourInput}
                  onKeyDown={handleHourKeyDown}
                  onBlur={handleHourBlur}
                />
              </div>
              <span className="time-picker__label">Hour</span>
            </div>

            <span className="time-picker__separator">:</span>

            <div className="time-picker__segment">
              <div
                className={`time-picker__field
                  ${active === 'minute' ? ' time-picker__field--selected' : ''}
                  ${invalidMinutes ? ' time-picker__field--invalid' : ''}`}
                onClick={() => setActive('minute')}
              >
                <input
                  className="time-picker__time-text"
                  type="text"
                  inputMode="numeric"
                  value={minuteInput}
                  onKeyDown={handleMinuteKeyDown}
                  onBlur={handleMinuteBlur}
                />
              </div>
              <span className="time-picker__label">Minute</span>
            </div>

          </div>
        </div>
      </div>

      <div className="time-picker__actions">
        <div className="time-picker__icon-btn">
          <div className="time-picker__icon-container">
            <div className="time-picker__state-layer">🕐</div>
          </div>
        </div>
        <div className="time-picker__action-buttons">
          <button className="time-picker__btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="time-picker__btn-ok" onClick={onOk}>OK</button>
        </div>
      </div>
    </div>
  );
}
