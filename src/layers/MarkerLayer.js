import React from 'react';
import {latLngToViewportPoint} from '../map/utils';
function renderMarker(props) {

    return function ({coords: [lat, lng]}, index, points) {
        const [left, top] = latLngToViewportPoint(props, [lat, lng, props.viewport.zoom])

        return (
            <div
            key={[lat, lng]}
            style={{
                position: "relative",
                height: 10,
                width: 10,
                background: "blue",
                top: top,
                left: left
            }} />
        )
    }
}

export function MarkerLayer(props) {
    const {markers} = props;
    const render = renderMarker(props);
    return (
      <div style={{
          ...props.style,
          position: "absolute",
          zIndex: 2000,
          top: 0,
          left: 0
      }}>
        {markers.map(render)}
      </div>
    );
}