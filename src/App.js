import React, { useState } from "react";

function App() {
  // GET request state
  const [getData, setGetData] = useState(null);
  const [getLoading, setGetLoading] = useState(false);
  const [getError, setGetError] = useState("");

  // POST request state
  const [postData, setPostData] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState("");

  // Tracking parameters
  const [browserId, setBrowserId] = useState("browser-1719834567-ab3x8k2q");
  const [brand, setBrand] = useState("Samsung");
  const [os, setOs] = useState("Tizen");
  const [model, setModel] = useState("Tizen 6.0 Smart TV");
  const [deviceType, setDeviceType] = useState("tv");
  const [isSmartTV, setIsSmartTV] = useState(true);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isWebView, setIsWebView] = useState(false);
  const [isWebApp, setIsWebApp] = useState(true);
  const [domain, setDomain] = useState("myplayer.samsungtv.com");
  const [origin, setOrigin] = useState("https://myplayer.samsungtv.com");
  const [userAgent, setUserAgent] = useState(
    "Mozilla/5.0 (SMART-TV; Linux; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.108 Safari/537.36"
  );

  // Auto-detect some values
  const getDeviceInfo = () => {
    return {
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        orientation: window.screen.orientation
          ? window.screen.orientation.type
          : "landscape-primary",
      },
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      deviceMemory: navigator.deviceMemory || 3,
      network: {
        effectiveType: navigator.connection?.effectiveType || "4g",
        downlink: navigator.connection?.downlink || 10,
        rtt: navigator.connection?.rtt || 50,
      },
      timestamp: new Date().toISOString(),
    };
  };

  const fetchGetData = async () => {
    setGetLoading(true);
    setGetData(null);
    setGetError("");

    try {
      const response = await fetch(
        "https://adstorm.co/api-adstorm-dev/adstorm/ads/web",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      setGetData(json);
    } catch (err) {
      setGetError(err.message);
    } finally {
      setGetLoading(false);
    }
  };

  const sendPostData = async () => {
    setPostLoading(true);
    setPostData(null);
    setPostError("");

    try {
      const deviceInfo = getDeviceInfo();

      const postBody = {
        browserId: browserId,
        brand: brand,
        os: os,
        model: model,
        deviceType: deviceType,
        isSmartTV: isSmartTV,
        isAndroid: isAndroid,
        isWebView: isWebView,
        isWebApp: isWebApp,
        domain: domain,
        origin: origin,
        userAgent: userAgent,
        screen: deviceInfo.screen,
        hardwareConcurrency: deviceInfo.hardwareConcurrency,
        deviceMemory: deviceInfo.deviceMemory,
        network: deviceInfo.network,
        timestamp: deviceInfo.timestamp,
      };

      const response = await fetch(
        "https://adstorm.co/api-adstorm-dev/adstorm/player-tracking/track",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      setPostData(json);
    } catch (err) {
      setPostError(err.message);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "800px" }}>
      <h1>API Test App</h1>

      {/* GET Request Section */}
      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>GET Request Test</h2>
        <p>
          Testing GET request to:{" "}
          <code>https://adstorm.co/api-adstorm-dev/adstorm/ads/web</code>
        </p>

        <button
          onClick={fetchGetData}
          disabled={getLoading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: getLoading ? "not-allowed" : "pointer",
            opacity: getLoading ? 0.6 : 1,
          }}
        >
          {getLoading ? "Loading..." : "Fetch Data (GET)"}
        </button>

        {getError && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "4px",
            }}
          >
            <strong>Error:</strong> {getError}
          </div>
        )}

        {getData && (
          <div style={{ marginTop: "20px" }}>
            <h3>Success! Response Data:</h3>
            <pre
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "4px",
                overflow: "auto",
              }}
            >
              {JSON.stringify(getData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* POST Request Section */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>POST Request Test</h2>
        <p>
          Testing POST request to:{" "}
          <code>
            https://adstorm.co/api-adstorm-dev/adstorm/player-tracking/track
          </code>
        </p>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Browser ID:
              </label>
              <input
                type="text"
                value={browserId}
                onChange={(e) => setBrowserId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Brand:
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                OS:
              </label>
              <input
                type="text"
                value={os}
                onChange={(e) => setOs(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Model:
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Device Type:
              </label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              >
                <option value="tv">TV</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="desktop">Desktop</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Domain:
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Origin:
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              User Agent:
            </label>
            <textarea
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                minHeight: "60px",
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  checked={isSmartTV}
                  onChange={(e) => setIsSmartTV(e.target.checked)}
                  style={{ marginRight: "5px" }}
                />
                Smart TV
              </label>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  checked={isAndroid}
                  onChange={(e) => setIsAndroid(e.target.checked)}
                  style={{ marginRight: "5px" }}
                />
                Android
              </label>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  checked={isWebView}
                  onChange={(e) => setIsWebView(e.target.checked)}
                  style={{ marginRight: "5px" }}
                />
                WebView
              </label>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  checked={isWebApp}
                  onChange={(e) => setIsWebApp(e.target.checked)}
                  style={{ marginRight: "5px" }}
                />
                Web App
              </label>
            </div>
          </div>

          <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
            }}
          >
            <strong>Request Body Preview:</strong>
            <pre
              style={{
                margin: "10px 0 0 0",
                fontSize: "12px",
                overflow: "auto",
                maxHeight: "300px",
              }}
            >
              {JSON.stringify(
                {
                  browserId: browserId,
                  brand: brand,
                  os: os,
                  model: model,
                  deviceType: deviceType,
                  isSmartTV: isSmartTV,
                  isAndroid: isAndroid,
                  isWebView: isWebView,
                  isWebApp: isWebApp,
                  domain: domain,
                  origin: origin,
                  userAgent: userAgent,
                  screen: "(auto-detected)",
                  hardwareConcurrency: "(auto-detected)",
                  deviceMemory: "(auto-detected)",
                  network: "(auto-detected)",
                  timestamp: "(auto-generated)",
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        <button
          onClick={sendPostData}
          disabled={postLoading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: postLoading ? "not-allowed" : "pointer",
            opacity: postLoading ? 0.6 : 1,
          }}
        >
          {postLoading ? "Sending..." : "Send POST Request"}
        </button>

        {postError && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "4px",
            }}
          >
            <strong>Error:</strong> {postError}
          </div>
        )}

        {postData && (
          <div style={{ marginTop: "20px" }}>
            <h3>Success! Response Data:</h3>
            <pre
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "4px",
                overflow: "auto",
              }}
            >
              {JSON.stringify(postData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
