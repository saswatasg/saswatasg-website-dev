import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import PageMeta from "@/components/PageMeta";
import { photographySeries } from "@/data/creativeContent";
import { FishRule } from "@/components/worlds/Motifs";
import AddaPageHeader, {
  AddaPageEnd,
} from "@/components/worlds/AddaPageHeader";
export default function Photography() {
  return (
    <div className="world-page editorial-page">
      <PageMeta
        title="Photography | Saswata S. Sengupta"
        description="A curated photography gallery in preparation. Explore the gallery prototype through clearly labeled graphic studies."
      />
      <AddaPageHeader
        label="Photography"
        variant="photography"
        title={
          <>
            A frame.
            <br />
            <em>A second look.</em>
          </>
        }
        description="Photography deserves room to breathe. Curated series will live here when the final images arrive."
      />
      <FishRule />
      {photographySeries.map((s) => (
        <article className="series-preview" key={s.slug}>
          <Link to={`/photography/${s.slug}`}>
            <img
              src={s.images[0].src}
              width={s.images[0].width}
              height={s.images[0].height}
              alt={s.images[0].alt}
            />
            <div>
              <span className="eyebrow">
                DEMO SERIES / {s.images.length} GRAPHIC STUDIES
              </span>
              <h2>{s.title} ↗</h2>
              <p>{s.introduction}</p>
            </div>
          </Link>
        </article>
      ))}
      <AddaPageEnd />
    </div>
  );
}
export function PhotographySeries() {
  const { series: slug } = useParams();
  const series = photographySeries.find((s) => s.slug === slug);
  const [index, setIndex] = useState(null);
  const trigger = useRef(null);
  useEffect(() => {
    setIndex(null);
  }, [slug]);
  if (!series)
    return (
      <div className="world-page">
        <PageMeta title="Series not found | Saswata S. Sengupta" noindex />
        <h1>Series not found.</h1>
        <Link to="/photography">Return to photography ↗</Link>
      </div>
    );
  const move = (delta) =>
    setIndex((i) => (i + delta + series.images.length) % series.images.length);
  return (
    <div className="world-page editorial-page">
      <PageMeta
        title="Gallery preview — Frame studies | Saswata S. Sengupta"
        description={series.introduction}
      />
      <Link className="text-link" to="/photography">
        ← All series
      </Link>
      <AddaPageHeader
        label={series.title}
        variant="photography"
        title={series.title}
        description={series.introduction}
      />
      <p className="eyebrow">DESIGNED PLACEHOLDERS / NOT PHOTOGRAPHS</p>
      {(series.location || series.year) && (
        <p>{[series.location, series.year].filter(Boolean).join(" / ")}</p>
      )}
      <div className="photo-sequence">
        {series.images.map((img, i) => (
          <figure
            key={img.src}
            style={{
              maxWidth: img.width < img.height ? 600 : undefined,
              width: "100%",
              margin: "0 auto",
            }}
          >
            <button
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`View image ${i + 1}: ${img.alt}`}
            >
              <img
                src={img.src}
                width={img.width}
                height={img.height}
                srcSet={img.srcSet}
                sizes="(max-width: 700px) 90vw, 80vw"
                loading={i === 0 ? "eager" : "lazy"}
                alt={img.alt}
              />
            </button>
            <figcaption>{img.caption}</figcaption>
          </figure>
        ))}
      </div>
      <Dialog.Root
        open={index !== null}
        onOpenChange={(open) => {
          if (!open) setIndex(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="photo-viewer-overlay" />
          <Dialog.Content
            className="photo-viewer"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              trigger.current?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                move(1);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                move(-1);
              }
            }}
          >
            <Dialog.Title className="sr-only">
              {series.title} — image viewer
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Use the left and right arrow keys to change images. Press Escape
              to close.
            </Dialog.Description>
            <Dialog.Close className="viewer-close">Close ×</Dialog.Close>
            {index !== null && (
              <>
                <img
                  src={series.images[index].src}
                  alt={series.images[index].alt}
                />
                <div className="viewer-controls">
                  <button onClick={() => move(-1)} aria-label="Previous image">
                    ←
                  </button>
                  <p aria-live="polite">
                    {index + 1} / {series.images.length}
                    <span>{series.images[index].caption}</span>
                  </p>
                  <button onClick={() => move(1)} aria-label="Next image">
                    →
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
