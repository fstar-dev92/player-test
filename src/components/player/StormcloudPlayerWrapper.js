import React, { useState, useEffect, useRef } from "react";

const StormcloudPlayerWrapper = (props) => {
  const [StormcloudPlayerComponent, setStormcloudPlayerComponent] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const playerInstanceRef = useRef(null);
  const hasLoadedRef = useRef(false);

  const defaultLicenseKey = typeof process !== 'undefined' && process.env
    ? process.env.REACT_APP_PLAYER_LICENSE_KEY
    : undefined;

  const handleVolumeToggle = () => {
    if (props.onVolumeToggle) {
      props.onVolumeToggle();
    }
  };

  const handleFullscreenToggle = () => {
    if (props.onFullscreenToggle) {
      props.onFullscreenToggle();
    }
  };

  const handleControlClick = () => {
    if (props.onControlClick) {
      props.onControlClick();
    }
  };

  const handleReady = (player) => {
    playerInstanceRef.current = player;
    if (props.onReady) {
      props.onReady(player);
    }
  };

  // Load player module only once
  useEffect(() => {
    if (hasLoadedRef.current) {
      return;
    }

    hasLoadedRef.current = true;

    const loadStormcloudPlayer = async () => {
      try {
        const adstormModule = await import("stormcloud-video-player");

        let PlayerComponent = null;

        if (adstormModule.StormcloudVideoPlayerComponent) {
          PlayerComponent = adstormModule.StormcloudVideoPlayerComponent;
        } else if (typeof adstormModule === "function") {
          PlayerComponent = adstormModule;
        } else if (adstormModule.StormcloudPlayer) {
          PlayerComponent = adstormModule.StormcloudPlayer;
        } else {
          PlayerComponent = adstormModule;
        }

        if (
          typeof PlayerComponent === "function" ||
          (typeof PlayerComponent === "object" && PlayerComponent !== null)
        ) {
          setStormcloudPlayerComponent(() => PlayerComponent);
          setError(null);
        } else {
          throw new Error(
            "Invalid component type received from stormcloud-video-player"
          );
        }
      } catch (err) {
        console.warn("stormcloud-video-player not found, using fallback:", err);
        setError("Stormcloud Player module not available");

        const FallbackPlayer = (props) => {
          const hasValidSrc = props.src && props.src.trim() !== "";

          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "16px",
                flexDirection: "column",
                gap: "12px",
                border: hasValidSrc ? "2px dashed #444" : "none",
                borderRadius: "8px",
                background: hasValidSrc
                  ? "#1a1a1a"
                  : "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
                ...props.style,
              }}
            >
              {hasValidSrc ? (
                <>
                  <div>🎬 Stormcloud Player (Fallback)</div>
                  <div style={{ fontSize: "14px", color: "#888" }}>
                    Source: {props.src}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Controls: {props.controls ? "Enabled" : "Disabled"} | Muted:{" "}
                    {props.muted ? "Yes" : "No"} | Autoplay:{" "}
                    {props.autoplay ? "Yes" : "No"}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(251, 146, 60, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>▶️</div>
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "8px",
                    }}
                  >
                    No Stream URL
                  </div>
                  <div style={{ fontSize: "14px", color: "#9ca3af" }}>
                    Enter a stream URL to start playback
                  </div>
                </>
              )}
            </div>
          );
        };

        setStormcloudPlayerComponent(() => FallbackPlayer);
      } finally {
        setLoading(false);
      }
    };

    loadStormcloudPlayer();

    // Cleanup function
    return () => {
      if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
        try {
          playerInstanceRef.current.destroy();
        } catch (err) {
          console.warn("Error destroying player:", err);
        }
      }
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "14px",
          ...props.style,
        }}
      >
        Loading Stormcloud Player...
      </div>
    );
  }

  if (!StormcloudPlayerComponent) {
    return (
      <div
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "14px",
          flexDirection: "column",
          gap: "8px",
          ...props.style,
        }}
      >
        <div>Stormcloud Player Unavailable</div>
        {error && (
          <div style={{ fontSize: "12px", color: "#888" }}>{error}</div>
        )}
      </div>
    );
  }

  try {
    if (!StormcloudPlayerComponent) {
      throw new Error("StormcloudPlayerComponent is null or undefined");
    }

    if (
      typeof StormcloudPlayerComponent !== "function" &&
      typeof StormcloudPlayerComponent !== "object"
    ) {
      throw new Error(
        `Invalid component type: ${typeof StormcloudPlayerComponent}`
      );
    }

    // Extract only the props that should be passed to the player
    // This prevents React warnings about unknown DOM attributes
    const {
      src,
      autoplay,
      muted,
      controls,
      allowNativeHls,
      showCustomControls,
      licenseKey,
      immediateManifestAds,
      debugAdTiming,
      vastMode,
      vastTagUrl,
      adPlayerType,
      prebid,
      style,
      className,
      // Exclude callback props - we'll use our wrapped versions
      onReady: _onReady,
      onVolumeToggle: _onVolumeToggle,
      onFullscreenToggle: _onFullscreenToggle,
      onControlClick: _onControlClick,
    } = props;

    const playerProps = {
      src,
      autoplay,
      muted,
      controls,
      allowNativeHls,
      showCustomControls,
      licenseKey: licenseKey || defaultLicenseKey,
      immediateManifestAds,
      debugAdTiming,
      vastMode,
      vastTagUrl,
      adPlayerType,
      prebid,
      style,
      className,
      onVolumeToggle: handleVolumeToggle,
      onFullscreenToggle: handleFullscreenToggle,
      onControlClick: handleControlClick,
      onReady: handleReady,
    };

    return React.createElement(StormcloudPlayerComponent, playerProps);
  } catch (renderError) {
    console.error("Error rendering Stormcloud Player:", renderError);
    console.error("Component type:", typeof StormcloudPlayerComponent);
    console.error("Component value:", StormcloudPlayerComponent);

    return (
      <div
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "14px",
          flexDirection: "column",
          gap: "8px",
          ...props.style,
        }}
      >
        <div>Stormcloud Player Error</div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          {renderError instanceof Error
            ? renderError.message
            : String(renderError)}
        </div>
      </div>
    );
  }
};

export default StormcloudPlayerWrapper;

