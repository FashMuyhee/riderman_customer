import React from 'react';
import Svg, {Path} from 'react-native-svg';

const GalleryAddIcon = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.999 13.899v2.29c0 3.64-2.17 5.81-5.81 5.81h-8.38c-2.55 0-4.39-1.07-5.25-2.97l.11-.08 4.92-3.3c.8-.54 1.93-.48 2.64.14l.34.28c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0l1.63 1.4z"
        fill="#27AE60"
      />
      <Path
        opacity={0.4}
        d="M20.97 8h-2.94C16.76 8 16 7.24 16 5.97V3.03c0-.4.08-.74.22-1.03H7.81C4.17 2 2 4.17 2 7.81v8.38c0 1.09.19 2.04.56 2.84l.11-.08 4.92-3.3c.8-.54 1.93-.48 2.64.14l.34.28c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0L22 13.9V7.78c-.29.14-.63.22-1.03.22z"
        fill="#27AE60"
      />
      <Path
        d="M9.001 10.381a2.38 2.38 0 100-4.76 2.38 2.38 0 000 4.76zM20.971 1h-2.94C16.76 1 16 1.76 16 3.03v2.94C16 7.24 16.76 8 18.03 8h2.94C22.24 8 23 7.24 23 5.97V3.03C23 1.76 22.24 1 20.97 1zm.94 3.93c-.1.1-.25.17-.41.18h-1.41l.01 1.39c-.01.17-.07.31-.19.43-.1.1-.25.17-.41.17-.33 0-.6-.27-.6-.6V5.1l-1.4.01a.61.61 0 01-.6-.61c0-.33.27-.6.6-.6l1.4.01v-1.4c0-.33.27-.61.6-.61.33 0 .6.28.6.61l-.01 1.39h1.41c.33 0 .6.27.6.6a.68.68 0 01-.19.43z"
        fill="#27AE60"
      />
    </Svg>
  );
};

export default GalleryAddIcon;
