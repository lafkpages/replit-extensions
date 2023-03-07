import React from "react";
import * as replit from "../index";

export default function useWatchTextFile({
  connected,
  filePath,
}: {
  connected: boolean;
  filePath: string | null | undefined;
}) {
  const [content, setContent] = React.useState(null);
  const [watching, setWatching] = React.useState(false);
  const [watchError, setWatchError] = React.useState(null);

  React.useEffect(() => {
    if (!connected || !filePath) {
      return;
    }

    let watchFileDispose;
    let dispose = () => {
      if (watchFileDispose) {
        watchFileDispose();
        watchFileDispose = null;
      }
      setWatching(false);
      setContent(null);
      setWatchError(null);
    };

    (async () => {
      if (!connected || !filePath) {
        return;
      }

      try {
        watchFileDispose = await replit.fs.watchTextFile(filePath, {
          onReady: async (args) => {
            setContent(await args.initialContent);
            setWatching(true);
          },
          onError(err) {
            setWatchError(err);
            setWatching(false);
            dispose();
          },
          onChange: (args) => {
            setContent(args.latestContent);
          },
          onMoveOrDelete: () => {
            setWatching(false);
          },
        });
      } catch (e) {
        setWatchError(e);
        setWatching(false);
      }
    })();

    return dispose;
  }, [connected, filePath]);

  return React.useMemo(
    () => ({
      content,
      watching,
      watchError,
    }),
    [content, watching, watchError]
  );
}