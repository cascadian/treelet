import React from 'react';
import {toPoint} from "../leaflet/src/geometry/Point";

export function Tile({urlTemplate, x, y, z, size, pixelOrigin}) {
  const position = toPoint([x, y])
                    .scaleBy(toPoint([256, 256]))
                    .subtract(pixelOrigin);
  const left = position.x;
  const top = position.y;
  return (
    <div key={x + " " + y}
         style={{
           height: size,
           width: size,
           pointerEvents: "none",
           position: "absolute",
           left,
           top
         }}>
      <img src={urlTemplate.replace("{x}", x)
                           .replace("{y}", y)
                           .replace("{z}", z)} />
    </div>
  );
}
