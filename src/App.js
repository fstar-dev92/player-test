import { useState, useRef } from "react";
import StormcloudPlayer from "./components/player/StormcloudPlayerWrapper";
import "./App.css";

function App() {
  const [config, setConfig] = useState({
    src: "https://stream.adstorm.co/test/playlist.m3u8",
    autoplay: false,
    muted: false,
    controls: true,
    allowNativeHls: false,
    showCustomControls: true,
    licenseKey: "SONIFI-TEST-KEY-8A7B6BE006E748049FD96BE532479BE0",
    immediateManifestAds: false,
    debugAdTiming: true,
  });

  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    console.log("Player ready:", player);
    playerRef.current = player;
    setPlayerReady(true);
  };

  const handlePlay = () => {
    if (playerRef.current && playerRef.current.videoElement) {
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

    const criticalProps = ["src", "licenseKey", "allowNativeHls"];
    if (criticalProps.includes(key)) {
      setPlayerReady(false);
    }
  };

  return (
    <div className="app">
      <div className="main">
        <header className="topbar">
          <h1 className="page-title">VIDEO PLAYER TESTER</h1>
          <div className="status-badge">
            <span className={`status-dot ${playerReady ? "ready" : "loading"}`}></span>
            {playerReady ? "Ready" : "Loading"}
          </div>
        </header>

        <div className="content">
          <div className="player-wrapper">
            <StormcloudPlayer
              key={`player-${config.src}-${config.licenseKey}`}
              src={config.src}
              autoplay={config.autoplay}
              muted={config.muted}
              controls={config.controls}
              allowNativeHls={config.allowNativeHls}
              showCustomControls={config.showCustomControls}
              licenseKey={config.licenseKey}
              immediateManifestAds={config.immediateManifestAds}
              debugAdTiming={config.debugAdTiming}
              onReady={handlePlayerReady}
              onVolumeToggle={() => console.log("Volume toggled")}
              onFullscreenToggle={() => console.log("Fullscreen toggled")}
              onControlClick={() => console.log("Control clicked")}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            />
          </div>

          <div className="controls-grid">
            <div className="control-card">
              <label className="control-label">Stream URL</label>
              <div className="input-group">
                <input
                  type="text"
                  className="input"
                  value={config.src}
                  onChange={(e) => updateConfig("src", e.target.value)}
                  placeholder="Enter stream URL"
                />
                <button className="btn-secondary" onClick={() => updateConfig("src", "")}>
                  Clear
                </button>
              </div>
            </div>

            <div className="control-card">
              <label className="control-label">License Key</label>
              <input
                type="text"
                className="input"
                value={config.licenseKey}
                onChange={(e) => updateConfig("licenseKey", e.target.value)}
                placeholder="Enter license key"
              />
            </div>

            <div className="control-card toggles">
              <div className="toggle-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={config.autoplay}
                    onChange={(e) => updateConfig("autoplay", e.target.checked)}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Autoplay</span>
                </label>
              </div>

              <div className="toggle-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={config.muted}
                    onChange={(e) => updateConfig("muted", e.target.checked)}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Muted</span>
                </label>
              </div>

              <div className="toggle-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={config.controls}
                    onChange={(e) => updateConfig("controls", e.target.checked)}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Show Controls</span>
                </label>
              </div>

              <div className="toggle-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={config.allowNativeHls}
                    onChange={(e) => updateConfig("allowNativeHls", e.target.checked)}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Native HLS</span>
                </label>
              </div>

              <div className="toggle-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={config.showCustomControls}
                    onChange={(e) => updateConfig("showCustomControls", e.target.checked)}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Custom Controls</span>
                </label>
              </div>

              <div className="toggle-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={config.immediateManifestAds}
                    onChange={(e) => updateConfig("immediateManifestAds", e.target.checked)}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Immediate Ads</span>
                </label>
              </div>

              <div className="toggle-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={config.debugAdTiming}
                    onChange={(e) => updateConfig("debugAdTiming", e.target.checked)}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Debug Ad Timing</span>
                </label>
              </div>
            </div>

            <div className="control-card">
              <button
                className="btn-primary"
                onClick={handlePlay}
                disabled={!playerReady}
              >
                <span className="btn-icon">▶</span>
                Play Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
