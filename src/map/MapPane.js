import React, {PropTypes} from 'react';
import Hammer from 'react-hammerjs';
import {Point} from "../leaflet/src/geometry/Point";
import {LatLng, toLatLng} from "../leaflet/src/geo/LatLng";
import {getBoundingBox, recenterOnPoint} from "./moveCanvas";

export const MapPane = (props) => {
  const {renderLayers, onChangeViewport, viewport, crs, style} = props;
  const {zoom, center} = viewport;
  const centerLatLng = toLatLng(center);
  const pixelCenter = crs.latLngToPoint(centerLatLng, zoom).floor();

  return (
    <Hammer
      onDoubleTap={(e) => {
        e.preventDefault();
        var pointer = e.pointers[0];
        var x = pointer.clientX;
        var y = pointer.clientY;
        var newZoom = zoom + 1;
        const bbox = getBoundingBox(props, newZoom);
        const newCenter = recenterOnPoint(crs, [x + bbox[0], y + bbox[1], newZoom]);
        onChangeViewport({
          center: newCenter,
          zoom: newZoom,
          bbox
        });
      }}
      onPanStart={(e) => {

      }}
      onPanEnd={() => {

      }}
      onPan={(e) => {

      }}>
        <div style={{...style, position: "absolute"}}></div>
      </Hammer>
  );
};
