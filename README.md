# 🌩️ Stormcloud Video Player Test Environment

A comprehensive test environment for the `stormcloud-video-player` npm package with a modern React-based UI for testing various configurations and scenarios.

## Features

### 🎯 Player Testing
- **Multiple Stream Sources**: Pre-configured HLS streams for testing
- **Custom Stream Input**: Test with your own HLS streams
- **Real-time Configuration**: Modify player settings on-the-fly
- **Ad Integration Testing**: Full VAST ad support with customizable schedules

### 🎛️ Configuration Options
- **Basic Settings**: Autoplay, mute, controls, native HLS support
- **Ad Schedule Management**: Create, modify, and test complex ad breaks
- **Late Join Policies**: Test different ad handling strategies
- **VAST Tag Testing**: Multiple sample VAST tags plus custom input

### 📊 Monitoring & Debugging
- **Event Logging**: Real-time player event monitoring
- **Configuration Display**: Live view of current player config
- **Status Indicators**: Visual feedback on player state
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with HLS support

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   The app will automatically open at `https://localhost:3000`

### Alternative Commands
- `npm run dev` - Start development server without auto-opening
- `npm run build` - Build production bundle

## Usage Guide

### 🎬 Testing Basic Playback

1. **Select a Stream**: Choose from pre-configured HLS streams or enter a custom URL
2. **Configure Player**: Toggle autoplay, mute, controls, and native HLS settings
3. **Start Testing**: The player will reload automatically with new settings

### 📺 Testing Ad Integration

1. **Choose VAST Tag**: Select from sample VAST tags or provide your own
2. **Configure Ad Schedule**:
   - Set late join policy (play remaining vs skip to content)
   - Add/remove ad breaks
   - Configure break timing and duration
3. **Advanced Settings**: Use the "Show Advanced Settings" to fine-tune ad breaks

### 🔧 Advanced Testing

#### Ad Schedule Configuration
- **Start Time**: When the ad break should begin (in seconds)
- **Duration**: How long the ad break should last
- **VAST Tag URL**: Specific ad tag for this break

#### Late Join Policies
- **Play Remaining**: Play the remaining portion of an ad if joining mid-break
- **Skip to Content**: Skip directly to content when joining during an ad

### 📋 Sample Streams

The test environment includes several pre-configured HLS streams:

1. **Big Buck Bunny**: High-quality test stream
2. **Sintel Trailer**: Alternative test content
3. **Tears of Steel**: Additional sample stream
4. **Custom Stream**: Input your own HLS URL

### 🎯 Sample VAST Tags

Pre-configured ad tags for testing:

1. **Google IMA Test Ad**: Standard IMA test advertisement
2. **VAST 4.0 Sample**: Industry-standard VAST sample
3. **Custom VAST**: Input your own VAST tag URL

## Testing Scenarios

### 🎪 Recommended Test Cases

1. **Basic Playback**
   - Test each sample stream
   - Verify autoplay and mute functionality
   - Test native vs hls.js playback

2. **Ad Integration**
   - Test pre-roll ads (0 second start time)
   - Test mid-roll ads (various start times)
   - Verify ad countdown and duration

3. **SCTE-35 Testing**
   - Use streams with embedded SCTE-35 markers
   - Test automatic ad break detection
   - Verify CUE-OUT/CUE-IN handling

4. **Late Join Scenarios**
   - Start playback during an ad break
   - Test both late join policies
   - Verify remaining ad duration calculation

5. **Error Handling**
   - Test invalid stream URLs
   - Test invalid VAST tags
   - Verify graceful fallback behavior

### 🐛 Debugging Tips

- **Event Log**: Monitor real-time player events
- **Browser Console**: Check for additional error messages
- **Network Tab**: Verify stream and ad requests
- **Configuration Display**: Review current player settings

## Configuration Reference

### Player Config Options

```javascript
{
  src: string,              // HLS stream URL
  autoplay: boolean,        // Auto-start playback
  muted: boolean,          // Start muted
  controls: boolean,       // Show video controls
  allowNativeHls: boolean, // Use native HLS when available
  immediateManifestAds: boolean, // Load ads immediately from manifest
  debugAdTiming: boolean   // Enable ad timing debug logs
}
```

### Ad Schedule Structure

```javascript
{
  lateJoinPolicy: 'play_remaining' | 'skip_to_content',
  breaks: [
    {
      id: string,           // Unique identifier
      startTimeMs: number,  // Start time in milliseconds
      durationMs: number,   // Duration in milliseconds
      vastTagUrl: string    // VAST tag URL for this break
    }
  ]
}
```

## Troubleshooting

### Common Issues

1. **HTTPS Required**: The dev server uses HTTPS for testing autoplay functionality
2. **CORS Issues**: Some streams may require CORS headers
3. **Ad Blockers**: May interfere with VAST ad loading
4. **Browser Compatibility**: Ensure modern browser with HLS support

### Browser Requirements

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Development

### Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Application styling
└── index.js        # React application entry point
```

### Customization

To add new sample streams or VAST tags, modify the arrays in `App.js`:

```javascript
const SAMPLE_STREAMS = [
  { name: 'Your Stream', url: 'https://example.com/stream.m3u8' }
];

const SAMPLE_VAST_TAGS = [
  { name: 'Your VAST', url: 'https://example.com/vast.xml' }
];
```

## License

MIT License - see the main stormcloud-video-player package for details.

## Support

For issues with the stormcloud-video-player package itself, please refer to the main package documentation and support channels.

For issues with this test environment, check the browser console for error messages and ensure all dependencies are properly installed.