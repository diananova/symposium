import { Kylix } from './Kylix';

export function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-kylix">
        <Kylix size={88} fraction={0.69} strokeWidth={2.5} label="Symposium" />
      </div>
      <div className="splash-wordmark">Symposium</div>
      <div className="splash-tagline">Studia Humanitatis</div>
      <div className="splash-loading">Preparing your seat at the table…</div>
    </div>
  );
}
