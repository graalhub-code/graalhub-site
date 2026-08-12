"use client";

import { useState, useRef, useEffect, type ImgHTMLAttributes } from "react";

/**
 * Shimmering skeleton placeholder shown until the asset finishes loading.
 * Uses a plain <img> (rather than next/image) so it can take either a
 * public/ path or an inline base64 data: URI as src without triggering
 * Next's image-loader src validation.
 *
 * Data-URI and cached images often finish decoding before React hydrates —
 * the browser fires `load` against the server-rendered <img> tag while the
 * page is still downloading the JS bundle, so the onLoad handler (only
 * wired up after hydration) never sees it and the skeleton gets stuck on
 * top of an already-loaded image forever. The mount-time `complete` check
 * below catches that case.
 */
export default function SkeletonImage({
  className,
  wrapperClassName,
  onLoad,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { wrapperClassName?: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName ?? ""}`}>
      {!loaded && (
        <span className="skeleton absolute inset-0 rounded-[3px]" aria-hidden="true" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        ref={imgRef}
        className={`${className ?? ""} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </span>
  );
}
