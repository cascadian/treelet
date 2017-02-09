import React from 'react';
import {Tile} from './Tile';

function unscaleXBy(x, tileSize) {
  return Math.floor(x / tileSize);
}

function unscaleYBy(y, tileSize) {
  return Math.ceil(y / tileSize) - 1;
}

function centerOfBoundingBox([minX, minY, maxX, maxY]) {
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  return [centerX, centerY];
}

export const TileLayer = ({
  tileSize = 256,
  bbox,
  urlTemplate,
  viewport: {zoom},
  crs,
  style
}) => {
  const tileRange = [
    unscaleXBy(bbox[0], tileSize),
    unscaleYBy(bbox[1], tileSize),
    unscaleXBy(bbox[2], tileSize),
    unscaleYBy(bbox[3], tileSize)
  ];

  const tileCenter = centerOfBoundingBox(tileRange);

  function createTiles() {
    const tiles = [];
    const [minX, minY, maxX, maxY] = tileRange;
    for (const y = minY; y <= maxY; y++) {
      for (const x = minX; x <= maxX; x++) {
        tiles.push(
          <Tile key={x + " " + y}
                size={tileSize}
                x={x}
                y={y}
                pixelOrigin={bbox}
                z={zoom}
                urlTemplate={urlTemplate}/>);
      }
    }
    return tiles;
  }

  return (
    <div style={{...style, zIndex: 1}}>
      {createTiles()}
    </div>
  );
}
