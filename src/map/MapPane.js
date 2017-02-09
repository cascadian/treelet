import React, {PropTypes} from 'react';
import Hammer from 'react-hammerjs';
import {Point} from "../leaflet/src/geometry/Point";
import {LatLng, toLatLng} from "../leaflet/src/geo/LatLng";
import {getBoundingBox, pointToLatLng} from "./utils";

export const MapPane = (props) => {
  const {renderLayers, onChangeViewport, onPanning, panningState, viewport, crs, style} = props;
  const {zoom, center} = viewport;
  const centerLatLng = toLatLng(center);
  const pixelCenter = crs.latLngToPoint(centerLatLng, zoom).floor();
  const {startX, startY, endX, endY} = panningState;

  return (
    <Hammer
      onDoubleTap={(e) => {
        e.preventDefault();
        var pointer = e.pointers[0];
        var x = pointer.clientX;
        var y = pointer.clientY;
        var newZoom = zoom + 1;
        const bbox = getBoundingBox(props, newZoom);
        const newCenter = pointToLatLng(crs, [x + bbox[0], y + bbox[1], newZoom]);
        onChangeViewport({
          center: newCenter,
          zoom: newZoom
        });
      }}
      onPanStart={(e) => {
        if (onPanning) {
          onPanning({
            isPanning: true,
            startX: e.pointers[0].screenX,
            startY: e.pointers[0].screenY
          });
        }
      }}
      onPanEnd={(e) => {
        if (onPanning) {
          onPanning({
            isPanning: false,
            endX: e.pointers[0].screenX,
            endY: e.pointers[0].screenY
          })
        }
      }}
      onPan={(e) => {
        const {screenX, screenY} = e.pointers[0];
        console.log("onPanning startX:" + startX + " startY:" + startY);
        const offsetX = screenX - startX;
        const offsetY = screenY - startY;

        const offsetPixels = Math.abs(offsetX) + Math.abs(offsetY);

        if (offsetPixels > 3) {
          onPanning({
            startX: screenX,
            startY: screenY
          });

          const {clientWidth, clientHeight} = props.layout;
          const [centerX, centerY] = [clientWidth / 2, clientHeight / 2];
          const bbox = getBoundingBox(props);
          const pannedCenter = pointToLatLng(crs, [(centerX - offsetX) + bbox[0], (centerY - offsetY) + bbox[1], zoom]);
          onChangeViewport({
            center: pannedCenter
          });
        }
      }}>
        <div style={{...style, position: "absolute"}}></div>
      </Hammer>
  );
};
