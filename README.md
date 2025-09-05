# Showfer Player Tester

A testing application for the `showfer-player` npm module. This project provides a simple interface to test various configurations and features of the video player component.

## Features

- **Interactive Configuration**: Test different player settings through a user-friendly interface
- **Multiple Video Formats**: Support for HLS, MP4, YouTube, and Twitch streams
- **Real-time Controls**: Adjust volume, toggle fullscreen, enable/disable controls
- **Subtitle Support**: Test subtitle functionality with custom .vtt files
- **Example URLs**: Quick-select buttons for testing different video types
- **Event Logging**: Console output for player events and debugging

## Setup

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start Development Server**:

   ```bash
   npm start
   ```

   This will start the development server at `http://localhost:3000` and automatically open your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Usage

### Testing the Player

1. **Quick Start**: Click on one of the example URL buttons (HLS, MP4, YouTube, Twitch) to load a test video
2. **Custom Video**: Enter your own video URL in the "Video URL" field
3. **Configure Settings**: Adjust player type, dimensions, volume, and other settings
4. **Add Subtitles**: Enter a subtitle URL (.vtt file) to test subtitle functionality
5. **Monitor Events**: Check the browser console for player events and debugging information

### Available Player Types

- **HLS**: HTTP Live Streaming (.m3u8 files)
- **MP4**: Standard MP4 video files
- **YouTube**: YouTube video URLs
- **Twitch**: Twitch stream URLs

### Player Features

The tester allows you to test all showfer-player features:

- **Controls**: Toggle player controls on/off
- **Volume**: Adjust volume from 0-100%
- **Mute**: Test mute/unmute functionality
- **Fullscreen**: Test fullscreen mode
- **Subtitles**: Test subtitle display (for supported formats)
- **Dimensions**: Customize player width and height
- **Ad Integration**: Built-in ad support (automatic when available)

### Event Callbacks

The following player events are logged to the console:

- `onReady`: Fired when the player is ready
- `onStart`: Fired when playback starts
- `onPlay`: Fired when the player begins playing
- `fullscreenFunc`: Custom fullscreen handler
- `volumeFunc`: Custom volume handler
- `controlFunc`: Custom control handler

## Development

### Project Structure

```
showfer-player-tester/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── index.js           # React entry point
│   └── App.js             # Main testing application
├── package.json           # Dependencies and scripts
├── webpack.config.js      # Webpack configuration
├── .babelrc              # Babel configuration
└── README.md             # This file
```

### Dependencies

- **React 18**: Latest React for the testing interface
- **showfer-player**: The video player component being tested (linked locally)
- **Webpack**: Build tool and development server
- **Babel**: JavaScript transpiler for React/ES6+

### Scripts

- `npm start` / `npm run dev`: Start development server
- `npm run build`: Build for production

## Troubleshooting

### Common Issues

1. **Player not loading**: Check that the video URL is valid and accessible
2. **CORS errors**: Some video URLs may have CORS restrictions
3. **HLS not working**: Ensure the browser supports HLS or that hls.js is available
4. **Subtitles not showing**: Verify the subtitle URL points to a valid .vtt file

### Browser Console

Always check the browser console for:

- Player events and status updates
- Error messages
- Network issues
- CORS warnings

## Testing Recommendations

1. **Start with HLS**: Use the default HLS example URL first
2. **Test Different Formats**: Try MP4, YouTube, and Twitch URLs
3. **Verify Controls**: Test all control buttons (play/pause, volume, fullscreen)
4. **Check Responsiveness**: Test different player dimensions
5. **Test Edge Cases**: Try invalid URLs, network timeouts, etc.
6. **Monitor Performance**: Check for memory leaks during long testing sessions

## Contributing

This is a testing utility for the showfer-player module. To contribute:

1. Test new features or configurations
2. Report any issues with the player
3. Add new test cases or example URLs
4. Improve the testing interface

## License

MIT - Same as the showfer-player module
