import React, {PropTypes} from 'react';
import {latLngToViewportPoint} from '../map/utils';
import {point, featureCollection} from '@turf/helpers';
import {LatLng, toLatLng} from "../leaflet/src/geo/LatLng";
import bboxPolygon from '@turf/bbox-polygon';
import inside from '@turf/inside';

function renderMarker(props) {

    return function ({geometry: {type, coordinates: [lng, lat]}}, index, points) {
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

function filterMarker({bbox, crs, viewport: {zoom}}) {
    return function({geometry: {type, coordinates: [lng, lat]}}, index, points) {
        if (type != "Point") return false;

        const {x, y} = crs.latLngToPoint(toLatLng([lat, lng]), zoom);
        const bboxPoly = bboxPolygon(bbox);
        return inside(point([x, y]), bboxPoly);
    }
}

export function MarkerLayer(props) {
    const {featureCollection, bbox} = props;
    const render = renderMarker(props);
    const filterFn = filterMarker(props);
    return (
      <div style={{
          ...props.style,
          position: "absolute",
          zIndex: 500,
          top: 0,
          left: 0
      }}>
        {featureCollection.features.filter(filterFn).map(render)}
      </div>
    );
}

MarkerLayer.propTypes = {
    featureCollection: PropTypes.shape({
        features: PropTypes.arrayOf(
            PropTypes.shape({
                geometry: PropTypes.shape({
                    type: PropTypes.string.isRequired,
                    coordinates: PropTypes.oneOfType([
                        PropTypes.arrayOf(PropTypes.number),
                        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
                    ]).isRequired
                }).isRequired
            })
        )
    }).isRequired
}