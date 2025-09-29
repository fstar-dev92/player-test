import React, { useState, useRef } from "react";
import StormcloudPlayer from "stormcloud-video-player";
import "./App.css";

function App() {
  const [config, setConfig] = useState({
    src: "https://stream.adstorm.co/test/playlist.m3u8",
    autoplay: false,
    muted: false,
    controls: true,
    allowNativeHls: false,
    showCustomControls: true,
    licenseKey: "ADSTORM-11D6D99FBF3F48B597F92099C5AA1EC9",
  });

  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    setPlayerReady(true);
  };

  const handlePlay = () => {
    if (playerRef.current && playerRef.current.videoElement) {
      // Use the video element's play method from the StormcloudVideoPlayer instance
      playerRef.current.videoElement.play().catch((error) => {
        console.error("Failed to play video:", error);
      });
    }
  };

  const updateConfig = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Reset player ready state for critical props that require recreation
    const criticalProps = ["src", "licenseKey", "allowNativeHls"];
    if (criticalProps.includes(key)) {
      setPlayerReady(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>🌩️ Stormcloud Video Player Test Environment</h1>
        </div>

        <div className="main-content">
          <div className="player-section">
            <div className="player-container">
              <h2>Video Player</h2>
              <div className="video-wrapper">
                <StormcloudPlayer
                  src={config.src}
                  autoplay={config.autoplay}
                  muted={config.muted}
                  controls={config.controls}
                  allowNativeHls={config.allowNativeHls}
                  showCustomControls={config.showCustomControls}
                  licenseKey={config.licenseKey}
                  onReady={handlePlayerReady}
                  onError={(error) => {
                    console.error("Player error:", error);
                  }}
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "16/9",
                    backgroundColor: "#000",
                  }}
                />
              </div>
              <div className="player-status">
                <span
                  className={`status-indicator ${
                    playerReady ? "ready" : "loading"
                  }`}
                >
                  {playerReady ? "● Ready" : "○ Loading..."}
                </span>
              </div>
            </div>
          </div>

          <div className="controls-section">
            <div className="controls-container">
              <h2>Configuration Controls</h2>
              <div className="config-form">
                <div className="form-group">
                  <label htmlFor="src">Stream URL:</label>
                  <input
                    type="text"
                    id="src"
                    value={config.src}
                    onChange={(e) => updateConfig("src", e.target.value)}
                    placeholder="Enter stream URL"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="licenseKey">License Key:</label>
                  <input
                    type="text"
                    id="licenseKey"
                    value={config.licenseKey}
                    onChange={(e) => updateConfig("licenseKey", e.target.value)}
                    placeholder="Enter license key"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={config.autoplay}
                      onChange={(e) =>
                        updateConfig("autoplay", e.target.checked)
                      }
                    />
                    <span className="checkbox-label">Autoplay</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={config.muted}
                      onChange={(e) => updateConfig("muted", e.target.checked)}
                    />
                    <span className="checkbox-label">Muted</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={config.controls}
                      onChange={(e) =>
                        updateConfig("controls", e.target.checked)
                      }
                    />
                    <span className="checkbox-label">Show Controls</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={config.allowNativeHls}
                      onChange={(e) =>
                        updateConfig("allowNativeHls", e.target.checked)
                      }
                    />
                    <span className="checkbox-label">Allow Native HLS</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={config.showCustomControls}
                      onChange={(e) =>
                        updateConfig("showCustomControls", e.target.checked)
                      }
                    />
                    <span className="checkbox-label">Show Custom Controls</span>
                  </label>
                </div>

                <div className="form-group">
                  <button
                    className="play-button"
                    onClick={handlePlay}
                    disabled={!playerReady}
                  >
                    ▶️ Play
                  </button>
                </div>

                <div className="config-summary">
                  <h3>Current Configuration:</h3>
                  <div className="summary-grid">
                    <div>
                      <strong>Autoplay:</strong>{" "}
                      {config.autoplay ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Muted:</strong> {config.muted ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Controls:</strong>{" "}
                      {config.controls ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Native HLS:</strong>{" "}
                      {config.allowNativeHls ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Custom Controls:</strong>{" "}
                      {config.showCustomControls ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>License:</strong>{" "}
                      {config.licenseKey ? "Set" : "Not set"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
