import { useState, useEffect, useRef } from 'react';
import './RegionSelector.css';

const REGIONS = ["Israel", "France", "USA", "Japan"];

type Props = {
  selected: string;
  onSelect: (region: string) => void;
};

export default function RegionSelector({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (region: string) => {
    onSelect(region);
    setOpen(false);
  };

  return (
    <div className="region-selector" ref={ref}>
      <input type="text" required value={selected} onChange={() => {}} style={{ display: 'none' }} />

      <div className="region-selector__input" onClick={() => setOpen((o) => !o)}>
        <span className="region-selector__label">Label</span>
        <span className="region-selector__value">{selected || "search"}</span>
        <span className="region-selector__icon">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <>
          <span className="region-selector__supporting-text">Select a region</span>
          <div className="region-selector__menu-wrapper">
            <ul className="region-selector__menu">
              {REGIONS.map((r) => (
                <li key={r} onClick={() => handleSelect(r)}>{r}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
