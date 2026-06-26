import './Header.css';

export default function Header() {
  return (
    <div className="header-wrapper">
      <header className="header">
        <img src="/logo.png" alt="Shva logo" className="header__logo" />
        <div className="header__auth" />
      </header>
    </div>
  );
}
