import React, { useState, useEffect } from 'react';
import { playBadgeFlipSound, playSparkleSound } from '../utils/audio';
import img1 from '../assets/Deb/img1.jpg';

export default function NurseIdBadge() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(img1);

  // Sync photo with Chapter 1 portrait if stored
  useEffect(() => {
    try {
      const saved = localStorage.getItem('debalina_photo_ch1_debalina_portrait');
      if (saved) setPhotoSrc(saved);
      else setPhotoSrc(img1);
    } catch {
      // ignore
    }
  }, []);

  const handleFlip = () => {
    playBadgeFlipSound();
    setIsFlipped((prev) => !prev);
  };

  const handlePhotoUpload = (e) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result;
      if (typeof res === 'string') {
        setPhotoSrc(res);
        try {
          localStorage.setItem('debalina_photo_ch1_debalina_portrait', res);
        } catch {
          // ignore
        }
        playSparkleSound();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="id-badge-container">
      {/* Hanging Lanyard Strap & Clip */}
      <div className="lanyard-strap">
        <div className="lanyard-ribbon">
          <span>🩺 NURSE DEBALINA • 8 NOV • VIP HEALTHCARE ANGEL 🌸</span>
        </div>
        <div className="lanyard-clip">
          <div className="clip-metal"></div>
          <div className="clip-ring"></div>
        </div>
      </div>

      {/* 3D Flippable Badge Card */}
      <div
        className={`id-badge-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        title="Click badge to flip between Front and Back!"
      >
        {/* FRONT SIDE */}
        <div className="badge-face badge-front">
          <div className="badge-hologram"></div>
          <div className="badge-header">
            <div className="badge-hospital-logo">
              <span className="logo-cross">✚</span>
              <span className="logo-text">WORLD HEALTHCARE OF JOY</span>
            </div>
            <span className="badge-vip-pill">VIP PASSPORT</span>
          </div>

          <div className="badge-photo-row">
            <div className="badge-photo-box" onClick={(e) => e.stopPropagation()}>
              {photoSrc ? (
                <img src={photoSrc} alt="Nurse Debalina" className="badge-img" />
              ) : (
                <label className="badge-photo-placeholder" title="Upload Debalina's ID photo">
                  <span className="placeholder-icon">👩‍⚕️</span>
                  <span className="placeholder-text">Click to Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
            </div>

            <div className="badge-info-col">
              <span className="badge-field-label">NAME</span>
              <strong className="badge-name">Debalina 🌸</strong>

              <span className="badge-field-label">DESIGNATION</span>
              <span className="badge-title">Chief Officer of Healing & Forever Kiddo</span>

              <span className="badge-field-label">SPECIALTY</span>
              <span className="badge-dept">Compassion ICU & Smile Therapy</span>
            </div>
          </div>

          <div className="badge-meta-row">
            <div className="meta-item">
              <span className="meta-label">ID NUMBER</span>
              <span className="meta-val">DEB-08NOV-999</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">VALIDITY</span>
              <span className="meta-val">LIFETIME ACCESS</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">CLEARANCE</span>
              <span className="meta-val highlight">100% LOVE</span>
            </div>
          </div>

          <div className="badge-footer">
            <div className="badge-barcode">
              <span>||| | | |||| | ||| ||||||| | ||| ||</span>
              <small>8-11-BDAY-ANGEL</small>
            </div>
            <div className="badge-flip-prompt">
              <span>↻ Click to Flip</span>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="badge-face badge-back">
          <div className="badge-magnetic-stripe"></div>

          <div className="badge-back-content">
            <h4 className="back-title">OFFICIAL EMERGENCY PROTOCOL</h4>

            <div className="protocol-box">
              <p><strong>Article 1:</strong> In the event of a long hospital shift, patient demands, or fatigue, holder is entitled to unlimited warm tea, cuddles, and rest.</p>
              <p><strong>Article 2:</strong> When subject pouts or displays cute baby behavior, all arguments are automatically won by Debalina.</p>
              <p><strong>Article 3:</strong> Authorized to administer smiles that bypass all clinical diagnoses.</p>
            </div>

            <div className="back-emergency-contact">
              <span className="contact-label">EMERGENCY PAMPERING CONTACT:</span>
              <span className="contact-val">The One Who Adores Her Endlessly 💖</span>
            </div>

            <div className="back-stamp-seal">
              <div className="back-seal-inner">
                <span>CERTIFIED</span>
                <strong>BEST NURSE</strong>
                <span>8TH NOV</span>
              </div>
            </div>

            <div className="badge-flip-prompt back">
              <span>↻ Click to Flip to Front</span>
            </div>
          </div>
        </div>
      </div>

      <div className="badge-action-bar">
        <button className="badge-flip-btn" onClick={handleFlip}>
          <span>↻ Flip Hospital ID Badge</span>
        </button>
      </div>

      <style>{`
        .id-badge-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 28px auto;
          max-width: 380px;
          perspective: 1200px;
        }
        .lanyard-strap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: -10px;
          z-index: 20;
          position: relative;
        }
        .lanyard-ribbon {
          background: linear-gradient(90deg, #ff6584, #845ec2, #ff6584);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 6px 16px;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          white-space: nowrap;
          text-transform: uppercase;
        }
        .lanyard-clip {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 2px;
        }
        .clip-metal {
          width: 22px;
          height: 12px;
          background: linear-gradient(180deg, #dfe6e9, #b2bec3);
          border-radius: 3px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .clip-ring {
          width: 14px;
          height: 14px;
          border: 3px solid #7f8c8d;
          border-radius: 50%;
          margin-top: -2px;
        }
        .id-badge-card {
          width: 350px;
          max-width: 90vw;
          height: 225px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .id-badge-card.flipped {
          transform: rotateY(180deg);
        }
        .badge-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 16px 36px rgba(0,0,0,0.18), inset 0 0 12px rgba(255,255,255,0.4);
          border: 1.5px solid rgba(255,255,255,0.6);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        .badge-front {
          background: linear-gradient(135deg, #ffffff 0%, #fef8f9 60%, #fff0f5 100%);
        }
        .badge-hologram {
          position: absolute;
          top: -30%;
          left: -30%;
          width: 160%;
          height: 160%;
          background: linear-gradient(125deg, transparent 40%, rgba(255,255,255,0.4) 48%, rgba(0,206,201,0.15) 52%, rgba(255,101,132,0.15) 56%, transparent 64%);
          pointer-events: none;
          animation: holoShimmer 5s linear infinite;
        }
        @keyframes holoShimmer {
          0% { transform: translateY(-50%) rotate(25deg); }
          100% { transform: translateY(50%) rotate(25deg); }
        }
        .badge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1.5px solid #ffccd5;
          padding-bottom: 6px;
        }
        .badge-hospital-logo {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .logo-cross {
          color: #ff4757;
          font-size: 1.1rem;
          font-weight: 900;
        }
        .logo-text {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #2f3542;
        }
        .badge-vip-pill {
          background: #ff4757;
          color: #fff;
          font-size: 0.58rem;
          font-weight: 900;
          padding: 2px 8px;
          border-radius: 10px;
          letter-spacing: 0.8px;
        }
        .badge-photo-row {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-top: 6px;
        }
        .badge-photo-box {
          width: 76px;
          height: 86px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid #ff758c;
          box-shadow: 0 4px 10px rgba(255,101,132,0.25);
          background: #f1f2f6;
          flex-shrink: 0;
        }
        .badge-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badge-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #fff0f5;
        }
        .placeholder-icon {
          font-size: 1.8rem;
        }
        .placeholder-text {
          font-size: 0.55rem;
          color: #e84364;
          font-weight: 700;
          text-align: center;
          margin-top: 2px;
        }
        .badge-info-col {
          display: flex;
          flex-direction: column;
        }
        .badge-field-label {
          font-size: 0.55rem;
          font-weight: 800;
          color: #a4b0be;
          letter-spacing: 0.5px;
        }
        .badge-name {
          font-size: 1.05rem;
          color: #2f3542;
          font-weight: 800;
          line-height: 1.2;
        }
        .badge-title {
          font-size: 0.72rem;
          color: #e84364;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 2px;
        }
        .badge-dept {
          font-size: 0.68rem;
          color: #57606f;
          font-weight: 600;
        }
        .badge-meta-row {
          display: flex;
          justify-content: space-between;
          background: rgba(255, 101, 132, 0.08);
          padding: 4px 10px;
          border-radius: 6px;
          margin-top: 4px;
        }
        .meta-item {
          display: flex;
          flex-direction: column;
        }
        .meta-label {
          font-size: 0.5rem;
          color: #747d8c;
          font-weight: 700;
        }
        .meta-val {
          font-size: 0.65rem;
          font-weight: 800;
          color: #2f3542;
        }
        .meta-val.highlight {
          color: #00a896;
        }
        .badge-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }
        .badge-barcode {
          font-family: monospace;
          font-size: 0.6rem;
          letter-spacing: -1px;
          color: #2f3542;
          display: flex;
          flex-direction: column;
        }
        .badge-barcode small {
          font-size: 0.5rem;
          letter-spacing: 0.8px;
          color: #747d8c;
        }
        .badge-flip-prompt {
          font-size: 0.68rem;
          font-weight: 700;
          color: #845ec2;
        }
        /* BACK SIDE */
        .badge-back {
          background: #fbf9f6;
          transform: rotateY(180deg);
        }
        .badge-magnetic-stripe {
          position: absolute;
          top: 14px;
          left: 0;
          width: 100%;
          height: 26px;
          background: #2d3436;
        }
        .badge-back-content {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          height: calc(100% - 32px);
          justify-content: space-between;
        }
        .back-title {
          font-size: 0.72rem;
          font-weight: 800;
          color: #2f3542;
          letter-spacing: 0.5px;
          text-align: center;
          margin-bottom: 4px;
        }
        .protocol-box {
          font-size: 0.62rem;
          color: #57606f;
          line-height: 1.35;
          background: rgba(0,0,0,0.03);
          padding: 6px 8px;
          border-radius: 6px;
        }
        .protocol-box p {
          margin-bottom: 3px;
        }
        .back-emergency-contact {
          font-size: 0.65rem;
          margin-top: 4px;
        }
        .contact-label {
          display: block;
          font-weight: 800;
          font-size: 0.52rem;
          color: #a4b0be;
        }
        .contact-val {
          font-weight: 700;
          color: #e84364;
        }
        .back-stamp-seal {
          position: absolute;
          bottom: 12px;
          right: 14px;
          width: 52px;
          height: 52px;
          border: 2px dashed #00cec9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-12deg);
        }
        .back-seal-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.45rem;
          font-weight: 900;
          color: #00a896;
          line-height: 1;
        }
        .badge-action-bar {
          margin-top: 12px;
        }
        .badge-flip-btn {
          padding: 6px 16px;
          border-radius: 20px;
          background: rgba(255, 101, 132, 0.12);
          color: #e84364;
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid rgba(255, 101, 132, 0.25);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .badge-flip-btn:hover {
          background: #e84364;
          color: #fff;
        }

        @media (max-width: 420px) {
          .id-badge-container {
            max-width: 100%;
          }
          .id-badge-card {
            width: 310px;
            max-width: calc(100vw - 36px);
            height: 215px;
          }
          .badge-face {
            padding: 12px;
          }
          .badge-photo-box {
            width: 64px;
            height: 74px;
          }
          .badge-name {
            font-size: 0.95rem;
          }
          .badge-title {
            font-size: 0.65rem;
          }
          .back-content {
            gap: 6px;
          }
          .clearance-item {
            font-size: 0.62rem;
          }
          .protocol-box {
            padding: 5px 8px;
            font-size: 0.62rem;
          }
        }
      `}</style>
    </div>
  );
}

