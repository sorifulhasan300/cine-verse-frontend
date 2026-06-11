"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;
interface MoviePlayerProps {
  url: string;
}

export function MoviePlayer({ url }: MoviePlayerProps) {
  const [error, setError] = useState(false);
  console.log("MoviePlayer URL:", url);

  if (!url || error) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 shadow-2xl flex items-center justify-center text-slate-400">
        Video load করা যায়নি
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 shadow-2xl">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        stopOnUnmount={true}
        style={{ position: "absolute", top: 0, left: 0 }}
        onError={() => setError(true)}
      />
    </div>
  );
}
