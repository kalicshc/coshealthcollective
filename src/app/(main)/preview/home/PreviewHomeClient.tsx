"use client";

/**
 * Cinematic homepage — DRAFT preview only.
 *
 * The whole page is the photographic aurora flythrough (PhotoFlythrough),
 * which now includes the closing "Our Journey" finale scene. The real site
 * footer (from the (main) layout) closes the page beneath it.
 */

import { preload } from "react-dom";
import { getImageProps } from "next/image";
import PhotoFlythrough, { STORY_IMG_SIZES, STORY_PRELOAD } from "./PhotoFlythrough";

export default function PreviewHomeClient({ images, masks, label = "Preview · Sunset" }: { images?: string[]; masks?: string[]; label?: string }) {
  // Warm the very first scene (hero photo + its aurora mask) so it paints
  // immediately instead of waiting on a cold fetch as the page mounts.
  if (images?.[0]) preload(images[0], { as: "image" });
  if (masks?.[0]) preload(masks[0], { as: "image" });
  // Warm the first Our Story carousel photo too (this used to be a <link
  // rel=preload> in the (main) layout, firing on EVERY page). getImageProps
  // mirrors the carousel's <Image> exactly, so the preloaded URL matches the
  // optimized one next/image will actually request — no double download.
  const { props: storyImg } = getImageProps({ ...STORY_PRELOAD, alt: "", sizes: STORY_IMG_SIZES });
  preload(storyImg.src, { as: "image", imageSrcSet: storyImg.srcSet, imageSizes: storyImg.sizes });
  return (
    <div className="pv-fly">
      {label ? (
        <div
          style={{
            position: "fixed", bottom: 14, left: 14, zIndex: 70, fontSize: 11, letterSpacing: "0.14em",
            textTransform: "uppercase", padding: "6px 12px", borderRadius: 999, pointerEvents: "none",
            color: "hsl(0,0%,90%)", background: "hsla(210,30%,8%,.7)", border: "1px solid hsla(177,70%,59%,.35)",
            backdropFilter: "blur(6px)",
          }}
          aria-hidden
        >
          {label}
        </div>
      ) : null}

      <PhotoFlythrough images={images} masks={masks} />
    </div>
  );
}
