import React, { useState, useEffect, useRef } from 'react';
import { playCameraClickSound, playSparkleSound } from '../utils/audio';
import img4 from '../assets/Deb/img4.jpg';

const STICKERS = [
  { id: 'stetho', icon: '🩺', name: 'Stethoscope' },
  { id: 'nurse-cap', icon: '👩‍⚕️', name: 'Nurse Cap' },
  { id: 'crown', icon: '👑', name: 'Queen Crown' },
  { id: 'bow', icon: '🎀', name: 'Pink Bow' },
  { id: 'bandaid', icon: '🩹', name: 'Band-aid' },
  { id: 'teddy', icon: '🧸', name: 'Teddy' },
  { id: 'flower', icon: '🌸', name: 'Sakura' },
  { id: 'chocolate', icon: '🍫', name: 'Chocolate' },
  { id: 'sparkles', icon: '✨', name: 'Sparkles' },
  { id: 'heart', icon: '💖', name: 'Love' },
];

export default function PhotoStickerBooth({ triggerConfetti }) {
  const [photoSrc, setPhotoSrc] = useState(img4);
  const [placedStickers, setPlacedStickers] = useState([
    { id: 1, icon: '👑', x: 50, y: 15, size: 40 },
    { id: 2, icon: '🌸', x: 20, y: 25, size: 34 },
    { id: 3, icon: '💖', x: 80, y: 75, size: 36 },
  ]);
  const [snapped, setSnapped] = useState(false);
  const photoCanvasRef = useRef(null);

  // Load photo from Chapter 1 portrait if available, fallback to img4
  useEffect(() => {
    try {
      const saved = localStorage.getItem('debalina_photo_ch1_debalina_portrait');
      if (saved) setPhotoSrc(saved);
      else setPhotoSrc(img4);
    } catch {
      // ignore
    }
  }, []);

  const handleAddSticker = (sticker) => {
    playSparkleSound();
    const newSticker = {
      id: Date.now() + Math.random(),
      icon: sticker.icon,
      x: 35 + Math.random() * 30,
      y: 35 + Math.random() * 30,
      size: 38,
    };
    setPlacedStickers((prev) => [...prev, newSticker]);
  };

  const handleClearStickers = () => {
    playSparkleSound();
    setPlacedStickers([]);
  };

  const handleSnapPhoto = () => {
    playCameraClickSound();
    setSnapped(true);
    setTimeout(() => setSnapped(false), 800);

    if (triggerConfetti) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.5, 70);
    }
  };

  const handleUploadNewPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result;
      if (typeof res === 'string') {
        setPhotoSrc(res);
        playSparkleSound();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="sticker-booth-section">
      <div className="booth-header">
        <span className="booth-pill">📸 Polaroid Sticker Booth</span>
        <h3 className="booth-title">Decorate Debalina's Memories</h3>
        <p className="booth-subtitle">
          Tap any cute sticker to decorate Debalina's portrait with nurse caps, crowns, and teddy bears!
        </p>
      </div>

      <div className="booth-layout">
        {/* Photo Stage */}
        <div className={`polaroid-camera-stage ${snapped ? 'camera-flash' : ''}`} ref={photoCanvasRef}>
          <div className="booth-photo-frame">
            {photoSrc ? (
              <img src={photoSrc} alt="Debalina" className="booth-main-photo" />
            ) : (
              <label className="booth-photo-empty">
                <span className="empty-icon">📷</span>
                <span className="empty-text">Click to Upload Debalina's Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadNewPhoto}
                  style={{ display: 'none' }}
                />
              </label>
            )}

            {/* Placed Stickers on top of the photo */}
            {placedStickers.map((st) => (
              <span
                key={st.id}
                className="placed-sticker"
                style={{
                  left: `${st.x}%`,
                  top: `${st.y}%`,
                  fontSize: `${st.size}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Tap placed sticker to cycle position/remove
                  setPlacedStickers((prev) => prev.filter((s) => s.id !== st.id));
                  playSparkleSound();
                }}
                title="Tap sticker to remove"
              >
                {st.icon}
              </span>
            ))}
          </div>

          <div className="booth-caption">
            <strong>Debalina 🌸 8th November</strong>
            <small>Tap photo to add your own picture • Tap stickers to remove</small>
          </div>
        </div>

        {/* Sticker Tray */}
        <div className="sticker-palette">
          <span className="tray-heading">TAP TO STICK:</span>
          <div className="stickers-tray-grid">
            {STICKERS.map((st) => (
              <button
                key={st.id}
                className="sticker-pick-btn"
                onClick={() => handleAddSticker(st)}
                title={`Add ${st.name}`}
              >
                <span className="btn-st-icon">{st.icon}</span>
                <span className="btn-st-label">{st.name}</span>
              </button>
            ))}
          </div>

          <div className="booth-control-buttons">
            <button className="snap-btn" onClick={handleSnapPhoto}>
              <span>📸 Snap Memory Shot!</span>
            </button>
            <label className="change-pic-btn">
              <span>🖼️ Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadNewPhoto}
                style={{ display: 'none' }}
              />
            </label>
            <button className="clear-btn" onClick={handleClearStickers}>
              <span>✕ Clear</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .sticker-booth-section {
          background: linear-gradient(135deg, rgba(255, 240, 245, 0.9), rgba(254, 245, 235, 0.9));
          border: 1.5px dashed rgba(255, 101, 132, 0.35);
          border-radius: 26px;
          padding: 34px 24px;
          margin: 36px 0;
          text-align: center;
        }
        .booth-pill {
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
        .booth-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.65rem;
          color: #2d3436;
          margin-bottom: 6px;
        }
        .booth-subtitle {
          font-size: 0.95rem;
          color: #636e72;
          max-width: 580px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }
        .booth-layout {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .polaroid-camera-stage {
          background: #ffffff;
          padding: 14px 14px 20px;
          border-radius: 12px;
          box-shadow: 0 16px 36px rgba(0,0,0,0.14);
          width: 290px;
          position: relative;
          transition: transform 0.25s ease;
        }
        .polaroid-camera-stage.camera-flash {
          animation: cameraFlashAnim 0.7s ease;
        }
        @keyframes cameraFlashAnim {
          0% { filter: brightness(2.5) contrast(1.4); transform: scale(1.05); }
          100% { filter: brightness(1) contrast(1); transform: scale(1); }
        }
        .booth-photo-frame {
          width: 100%;
          height: 270px;
          background: #f1f2f6;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        .booth-main-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .booth-photo-empty {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #fff0f5;
        }
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 8px;
        }
        .empty-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: #e84364;
          text-align: center;
          padding: 0 16px;
        }
        .placed-sticker {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          user-select: none;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
          animation: popSticker 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transition: transform 0.2s ease;
        }
        .placed-sticker:hover {
          transform: translate(-50%, -50%) scale(1.25);
        }
        @keyframes popSticker {
          from { transform: translate(-50%, -50%) scale(0); }
          to { transform: translate(-50%, -50%) scale(1); }
        }
        .booth-caption {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
        }
        .booth-caption strong {
          font-family: var(--font-cursive, 'Dancing Script', cursive);
          font-size: 1.25rem;
          color: #2f3542;
        }
        .booth-caption small {
          font-size: 0.65rem;
          color: #a4b0be;
          margin-top: 2px;
        }
        /* Sticker Palette */
        .sticker-palette {
          max-width: 290px;
          text-align: left;
        }
        .tray-heading {
          font-size: 0.72rem;
          font-weight: 800;
          color: #747d8c;
          letter-spacing: 0.8px;
          display: block;
          margin-bottom: 10px;
        }
        .stickers-tray-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        .sticker-pick-btn {
          background: #ffffff;
          border: 1px solid #ffd1dc;
          border-radius: 12px;
          padding: 8px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.2s ease;
        }
        .sticker-pick-btn:hover {
          transform: translateY(-2px) scale(1.1);
          border-color: #ff6584;
          box-shadow: 0 4px 12px rgba(255,101,132,0.25);
        }
        .btn-st-icon {
          font-size: 1.4rem;
        }
        .btn-st-label {
          font-size: 0.52rem;
          color: #747d8c;
          font-weight: 700;
          margin-top: 2px;
        }
        .booth-control-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .snap-btn {
          padding: 10px 16px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ff6584, #845ec2);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.88rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255,101,132,0.3);
          transition: transform 0.2s ease;
        }
        .snap-btn:hover {
          transform: translateY(-2px);
        }
        .change-pic-btn {
          padding: 8px 16px;
          border-radius: 20px;
          background: #f1f2f6;
          color: #2f3542;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          text-align: center;
          display: block;
        }
        .clear-btn {
          padding: 6px 14px;
          border-radius: 20px;
          background: transparent;
          color: #747d8c;
          font-weight: 600;
          font-size: 0.78rem;
          border: 1px solid #dcdde1;
          cursor: pointer;
        }
        .clear-btn:hover {
          background: #f1f2f6;
        }

        @media (max-width: 500px) {
          .booth-card {
            padding: 20px 12px;
          }
          .booth-title {
            font-size: 1.35rem;
          }
          .booth-stage {
            gap: 16px;
          }
          .polaroid-frame-box {
            width: 260px;
            max-width: calc(100vw - 36px);
          }
          .sticker-palette {
            max-width: 260px;
            width: 100%;
          }
          .booth-actions {
            width: 100%;
          }
          .snap-btn, .change-pic-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

