import * as React from "react";
import {
  useReplit,
  useWatchTextFile,
  useTheme,
} from "@replit/extensions/react";
import "./App.css";

export default function App() {
  const { connected, error, filePath, replit } = useReplit();

  const { content, watching, watchError } = useWatchTextFile({
    connected,
    filePath,
  });

  const theme = useTheme({ connected });

  React.useEffect(() => {
    if (!connected) {
      return;
    }

    console.log(replit);
    window.replit = replit;
  }, [connected, error, replit]);

  return (
    <main>
      <div className="center">
        <div>
          <div className="heading">Example extension</div>
          {error ? (
            <>
              <div className="error">error: {error.message ?? error}</div>
              {error.message === "timeout" ? (
                <div>
                  Note: Make sure to open this URL as an extension, not a
                  webview
                </div>
              ) : null}
            </>
          ) : (
            <div>
              {connected
                ? filePath
                  ? `connected to ${filePath}`
                  : "connected"
                : "connecting..."}
            </div>
          )}
        </div>
      </div>
      {theme && (
        <style global jsx>{`
          body {
            background-color: ${theme.values.global.backgroundDefault};
            color: ${theme.values.global.foregroundDefault};
          }
        `}</style>
      )}
    </main>
  );
}
