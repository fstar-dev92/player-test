import { useState, useRef } from "react";
import StormcloudPlayer from "./components/player/StormcloudPlayerWrapper";
import "./App.css";

const PREBID_INMOBI_CONFIG = {
  enabled: true,
  debug: true,
  ortbRequest: {
    id: "multi-bidder-request",
    site: {
      page: "https://adstorm.co",
      domain: "adstorm.co",
    },
    device: {
      devicetype: 1,
    },
    imp: [
      {
        id: "imp-interstitial",
        instl: 1,
        video: {
          w: 640,
          h: 480,
          mimes: ["video/mp4"],
          placement: 3,
          protocols: [2, 3, 5, 6],
        },
        ext: {
          prebid: {
            bidder: {
              inmobi: {
                plc: "10000614036",
              },
            },
          },
        },
      },
    ],
    tmax: 3000,
    ext: {
      prebid: {
        debug: true,
        server: {
          externalurl: "https://sspproxy.adstorm.co",
          gvlid: 15,
          datacenter: "us-east",
        },
      },
    },
  },
};

const AD_PLAYER_PRESETS = [
  { label: "HLS (default)", value: "hls", prebid: null },
  { label: "Google IMA", value: "ima", prebid: null },
  { label: "Prebid - InMobi", value: "prebid", prebid: PREBID_INMOBI_CONFIG },
];

function App() {
  const [config, setConfig] = useState({
    src: "https://hls.showfer.com/live/WRHqv/Pac12_Sample/pac12-sample.m3u8",
    autoplay: false,
    muted: false,
    controls: true,
    allowNativeHls: false,
    showCustomControls: true,
    licenseKey: "TRAFFIQ-20C74492F39A4F7A883C97743FC94F81",
    immediateManifestAds: false,
    debugAdTiming: true,
    adPlayerType: "prebid",
    prebid: PREBID_INMOBI_CONFIG,
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

    const criticalProps = ["src", "licenseKey", "allowNativeHls", "adPlayerType"];
    if (criticalProps.includes(key)) {
      setPlayerReady(false);
    }
  };

  const handleAdPlayerPreset = (preset) => {
    setConfig((prev) => ({
      ...prev,
      adPlayerType: preset.value,
      prebid: preset.prebid || undefined,
    }));
    setPlayerReady(false);
  };

  const activePreset = AD_PLAYER_PRESETS.find((p) => p.value === config.adPlayerType);

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
              key={`player-${config.src}-${config.licenseKey}-${config.adPlayerType}`}
              src={config.src}
              autoplay={config.autoplay}
              muted={config.muted}
              controls={config.controls}
              allowNativeHls={config.allowNativeHls}
              showCustomControls={config.showCustomControls}
              licenseKey={config.licenseKey}
              immediateManifestAds={config.immediateManifestAds}
              debugAdTiming={config.debugAdTiming}
              adPlayerType={config.adPlayerType}
              prebid={config.prebid}
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

            <div className="control-card">
              <label className="control-label">Ad Player Type</label>
              <div className="preset-buttons">
                {AD_PLAYER_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    className={`btn-preset ${config.adPlayerType === preset.value ? "active" : ""}`}
                    onClick={() => handleAdPlayerPreset(preset)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              {config.adPlayerType === "prebid" && (
                <div className="prebid-info">
                  <span className="prebid-badge">Prebid Server</span>
                  <span className="prebid-detail">
                    InMobi (plc: 10000620785) via sspproxy.adstorm.co
                  </span>
                </div>
              )}
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
