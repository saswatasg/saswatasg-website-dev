import React, { useState } from "react";

// All blog diagrams are authored on an 1000 × 600 canvas; intrinsic width/height
// only reserve aspect-ratio space (CSS keeps width:100%; height:auto), which
// prevents layout shift while the image loads.
const Figure = ({ src, alt, caption, max, width = 1000, height = 600 }) => {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="my-8">
      {failed ? (
        <div
          className="blog-figure-fallback"
          role="img"
          aria-label={alt || caption || "Figure unavailable"}
        >
          {alt || caption || "Figure unavailable"}
        </div>
      ) : (
        <img
          src={src}
          alt={alt || caption || ""}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="blog-figure-img"
          style={max ? { maxWidth: max } : undefined}
          onError={() => setFailed(true)}
        />
      )}
      {caption && (
        <figcaption className="blog-figcaption">{caption}</figcaption>
      )}
    </figure>
  );
};

export default Figure;
