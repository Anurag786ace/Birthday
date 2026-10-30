import { useState, useEffect, useRef } from 'react';
import { playSparkleSound } from '../utils/audio';

const PhotoFrame = ({
  id,
  title = 'Debalina 🌸',
  subtitle = '8th November',
  placeholderIcon = '🩺',
  placeholderGradient = 'linear-gradient(135deg, #ffccd5, #ffb3c1)',
  rotation = 0,
  defaultImage = null,
  size = 'medium', // 'small', 'medium', 'large'
}) => {
  const [photoSrc, setPhotoSrc] = useState(defaultImage);
  const fileInputRef = useRef(null);

  // Load saved photo from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`debalina_photo_${id}`);
      if (saved) {
        setPhotoSrc(saved);
      } else if (defaultImage) {
        setPhotoSrc(defaultImage);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, [id, defaultImage]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setPhotoSrc(result);
        try {
          localStorage.setItem(`debalina_photo_${id}`, result);
        } catch (err) {
          console.warn('LocalStorage limit reached for photo', err);
        }
        playSparkleSound();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setPhotoSrc(null);
    try {
      localStorage.removeItem(`debalina_photo_${id}`);
    } catch (err) {
      // Ignore
    }
    playSparkleSound();
  };

  return (
    <div
      className={`polaroid-frame size-${size}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={() => fileInputRef.current?.click()}
      title="Click to upload or change Debalina's photo"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Decorative Washi Tape */}
      <div className="washi-tape"></div>

      {/* Photo Container */}
      <div className="polaroid-photo-area">
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={title}
            className="uploaded-photo"
          />
        ) : (
          <div
            className="photo-placeholder-box"
            style={{ background: placeholderGradient }}
          >
            <span className="placeholder-icon">{placeholderIcon}</span>
            <span className="placeholder-hint">Click to add Debalina's photo</span>
            <span className="placeholder-subhint">📷 Upload from computer</span>
          </div>
        )}

        {/* Hover / Overlay action */}
        <div className="photo-overlay-actions">
          <button
            className="photo-action-btn upload"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            📷 {photoSrc ? 'Change Photo' : 'Upload Photo'}
          </button>
          {photoSrc && (
            <button
              className="photo-action-btn remove"
              onClick={handleRemovePhoto}
              title="Remove photo"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Polaroid Caption */}
      <div className="polaroid-caption">
        <strong className="caption-title">{title}</strong>
        <span className="caption-sub">{subtitle}</span>
      </div>
    </div>
  );
};

export default PhotoFrame;

