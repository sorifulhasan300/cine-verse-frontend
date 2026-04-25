"use client";

import React from "react";
import ReactPlayer from "react-player";

interface MoviePlayerProps {
  url: string;
}

export function MoviePlayer({ url }: MoviePlayerProps) {
  const playerProps = {
    url,
    width: "100%",
    height: "100%",
    controls: true,
    stopOnUnmount: true,
    config: {
      youtube: {
        playerVars: { showinfo: 1, rel: 0 },
      },
    },
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 shadow-2xl">
      {/* @ts-expect-error ReactPlayer types */}
      <ReactPlayer {...playerProps} />
    </div>
  );
}
