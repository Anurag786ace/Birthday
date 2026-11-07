import React, { useState } from 'react';
import { playBottlePopSound, playSparkleSound } from '../utils/audio';

const REMEDIES = [
  {
    id: 1,
    icon: '☕',
    bottleColor: '#e17055',
    name: 'Concentrated Caffeine Serum',
    dosage: '100% Warm Brew • 250ml',
    tag: 'Night Shift Lifesaver',
    desc: 'Formulated specifically for 12-hour hospital shifts when eyelids turn to lead. Infused with rich roasted coffee and sweet vanilla.',
    effect: 'Instantly grants +200 alertness, warm hands, and a sharp mind to care for patients!',
  },
  {
    id: 2,
    icon: '🧸',
    bottleColor: '#fd79a8',
    name: 'Emergency Hug Capsule',
    dosage: 'Extra Tight • 1000mg',
    tag: 'Stress Dissolver',
    desc: 'For weary shoulders that have carried too much clinical responsibility today. Take immediately when feeling overwhelmed.',
    effect: 'Deep relaxing exhale, muscles unclench, and Debalina feels completely protected and safe.',
  },
  {
    id: 3,
    icon: '🍫',
    bottleColor: '#6c5ce7',
    name: 'Sweetness Overdose Elixir',
    dosage: 'Belgian Cocoa • Unlimited Refills',
    tag: 'Instant Joy Infusion',
    desc: 'A rich mixture of silky chocolates, hazelnut truffles, and creamy scoops of ice cream.',
    effect: 'Cures grumpy pouts in 0.2 seconds flat! Calorie counting is strictly prohibited by order of the heart.',
  },
  {
    id: 4,
    icon: '🛌',
    bottleColor: '#00cec9',
    name: 'Shift-Cancel Injection',
    dosage: 'Fluffy Blanket Burrito • 12 Hours',
    tag: 'Official Bed Permission',
    desc: 'A magical doctor’s note excusing her from all alarms, hospital pagers, chores, and adult responsibilities.',
    effect: 'Debalina wraps into a soft duvet burrito with a plush teddy and sleeps soundly without interruptions.',
  },
  {
    id: 5,
    icon: '💖',
    bottleColor: '#ff7675',
    name: 'Pure Love & Gratitude Salve',
    dosage: 'Infinite Warmth • Continuous',
    tag: 'Soul Restorer',
    desc: 'Made from every smile she ever gave a lonely patient, every whispered comfort, and every ounce of love she gives to the world.',
    effect: 'Reminds her that she is deeply cherished, irreplaceable, and the sweetest girl in the universe.',
  },
];

export default function FirstAidKit() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRemedy, setSelectedRemedy] = useState(null);

  const handleToggleKit = () => {
    playBottlePopSound();
    setIsOpen((prev) => !prev);
    setSelectedRemedy(null);
  };

  const handleSelectRemedy = (item) => {
    playBottlePopSound();
    setSelectedRemedy(item);
  };

  return (
    <div className="first-aid-section">
      <div className="kit-header">
        <span className="kit-badge">🧰 Emergency Care</span>
        <h3 className="kit-title">First-Aid Kit for Nurse Debalina</h3>
        <p className="kit-subtitle">
          She takes care of hundreds of patients every week. Today, this emergency kit is reserved solely to take care of <strong>her</strong>.
        </p>
      </div>

      {/* Main Medical Kit Box */}
      <div className={`first-aid-box ${isOpen ? 'box-opened' : ''}`}>
        <div className="box-handle"></div>

        <div className="box-exterior" onClick={handleToggleKit}>
          <div className="box-cross">✚</div>
          <div className="box-label">
            <strong>NURSE DEBALINA'S EMERGENCY KIT</strong>
            <small>FOR TIRED SOULS & SWEET KIDDOS • 8TH NOV</small>
          </div>
          <button className="box-toggle-btn">
            {isOpen ? 'Close First-Aid Kit' : 'Tap to Open Kit 🧰'}
          </button>
        </div>

        {/* Interior Tray with Medicine Vials */}
        {isOpen && (
          <div className="box-interior">
            <span className="tray-label">PRESCRIPTION REMEDIES — SELECT A BOTTLE:</span>
            <div className="vials-grid">
              {REMEDIES.map((item) => (
                <div
                  key={item.id}
                  className={`vial-item ${selectedRemedy?.id === item.id ? 'active' : ''}`}
                  onClick={() => handleSelectRemedy(item)}
                  style={{ '--vial-color': item.bottleColor }}
                >
                  <div className="vial-bottle">
                    <div className="vial-cap"></div>
                    <div className="vial-glass">
                      <span className="vial-icon">{item.icon}</span>
                      <div className="vial-liquid"></div>
                    </div>
                  </div>
                  <span className="vial-name">{item.name}</span>
                  <span className="vial-dosage">{item.dosage}</span>
                </div>
              ))}
            </div>

            {/* Selected Remedy Details Card */}
            {selectedRemedy && (
              <div className="remedy-card-popup" style={{ '--accent-color': selectedRemedy.bottleColor }}>
                <div className="popup-top">
                  <span className="popup-icon">{selectedRemedy.icon}</span>
                  <div>
                    <span className="popup-tag">{selectedRemedy.tag}</span>
                    <h4 className="popup-title">{selectedRemedy.name}</h4>
                  </div>
                </div>
                <p className="popup-desc">{selectedRemedy.desc}</p>
                <div className="popup-effect">
                  <strong>Expected Clinical Effect:</strong>
                  <span>{selectedRemedy.effect}</span>
                </div>
                <div className="popup-footer">
                  <span className="prescribed-by">Prescribed with infinite tenderness by your biggest admirer 💖</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .first-aid-section {
          background: linear-gradient(135deg, rgba(255, 240, 245, 0.8), rgba(254, 249, 235, 0.8));
          border: 1.5px dashed rgba(255, 101, 132, 0.35);
          border-radius: 26px;
          padding: 32px 24px;
          margin: 36px 0;
          text-align: center;
        }
        .kit-badge {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 20px;
          background: rgba(255, 101, 132, 0.15);
          color: #e84364;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .kit-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.65rem;
          color: #2d3436;
          margin-bottom: 6px;
        }
        .kit-subtitle {
          font-size: 0.95rem;
          color: #636e72;
          max-width: 580px;
          margin: 0 auto 20px;
          line-height: 1.6;
        }
        .first-aid-box {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
          border: 2px solid #ffccd5;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .box-handle {
          width: 80px;
          height: 16px;
          border: 3px solid #ff758c;
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          margin: 12px auto -2px;
        }
        .box-exterior {
          padding: 20px 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .box-cross {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff4757, #ff6b81);
          color: #ffffff;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          box-shadow: 0 6px 16px rgba(255,71,87,0.35);
        }
        .box-label {
          display: flex;
          flex-direction: column;
          text-align: left;
          flex: 1;
        }
        .box-label strong {
          font-size: 0.98rem;
          color: #2f3542;
          letter-spacing: 0.5px;
        }
        .box-label small {
          font-size: 0.72rem;
          color: #747d8c;
          font-weight: 700;
          margin-top: 2px;
        }
        .box-toggle-btn {
          padding: 10px 20px;
          border-radius: 25px;
          background: linear-gradient(135deg, #ff6584, #845ec2);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.88rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255,101,132,0.3);
          transition: transform 0.2s ease;
        }
        .box-toggle-btn:hover {
          transform: translateY(-2px);
        }
        .box-interior {
          padding: 24px 20px;
          background: #fbf9f8;
          border-top: 2px dashed #ffccd5;
          animation: trayOpen 0.4s ease-out;
        }
        @keyframes trayOpen {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tray-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: #747d8c;
          letter-spacing: 0.8px;
          display: block;
          margin-bottom: 16px;
        }
        .vials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }
        .vial-item {
          background: #ffffff;
          border-radius: 14px;
          padding: 12px 6px;
          border: 1.5px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .vial-item:hover {
          transform: translateY(-4px) scale(1.05);
          border-color: var(--vial-color, #ff6584);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .vial-item.active {
          border-color: var(--vial-color, #ff6584);
          background: #fffafa;
          box-shadow: 0 8px 24px rgba(255,101,132,0.25);
          transform: translateY(-4px) scale(1.04);
        }
        .vial-bottle {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 8px;
        }
        .vial-cap {
          width: 20px;
          height: 6px;
          background: #dcdde1;
          border-radius: 3px 3px 0 0;
          border: 1px solid #b2bec3;
        }
        .vial-glass {
          width: 38px;
          height: 48px;
          border: 1.5px solid #bdc3c7;
          border-radius: 4px 4px 10px 10px;
          background: rgba(255,255,255,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }
        .vial-icon {
          font-size: 1.3rem;
          position: relative;
          z-index: 2;
        }
        .vial-liquid {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: var(--vial-color, #ff6584);
          opacity: 0.25;
        }
        .vial-name {
          font-size: 0.72rem;
          font-weight: 700;
          color: #2f3542;
          line-height: 1.2;
          margin-bottom: 3px;
        }
        .vial-dosage {
          font-size: 0.6rem;
          color: #a4b0be;
          font-weight: 600;
        }
        .remedy-card-popup {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px 24px;
          text-align: left;
          border-left: 5px solid var(--accent-color, #ff6584);
          box-shadow: 0 10px 28px rgba(0,0,0,0.08);
          animation: popupFade 0.35s ease-out;
        }
        @keyframes popupFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .popup-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .popup-icon {
          font-size: 2rem;
        }
        .popup-tag {
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          background: rgba(0,0,0,0.05);
          color: var(--accent-color, #ff6584);
          padding: 2px 8px;
          border-radius: 8px;
          display: inline-block;
          margin-bottom: 4px;
        }
        .popup-title {
          font-size: 1.15rem;
          color: #2f3542;
          margin: 0;
        }
        .popup-desc {
          font-size: 0.88rem;
          color: #57606f;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .popup-effect {
          background: #f8f9fa;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.85rem;
          margin-bottom: 12px;
        }
        .popup-effect strong {
          display: block;
          color: #2f3542;
          margin-bottom: 2px;
        }
        .popup-effect span {
          color: #00a896;
          font-weight: 600;
        }
        .popup-footer {
          font-size: 0.75rem;
          color: #a4b0be;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

