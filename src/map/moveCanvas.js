import {toLatLng} from '../leaflet/src/geo/LatLng';
import {Point, toPoint} from '../leaflet/src/geometry/Point';
import {Bounds} from '../leaflet/src/geometry/Bounds';

export function getBoundingBox({
  layout: {clientWidth, clientHeight},
  viewport,
  crs
}, newZoom) {
  const {zoom, center} = viewport;
  const toZoom = newZoom || viewport.zoom;
  const centerLatLng = toLatLng(center);
  const pixelCenter = crs.latLngToPoint(centerLatLng, toZoom).floor();

  const scale = crs.scale(toZoom) / crs.scale(zoom);
  const divisor = scale * 2;
  const halfSize = new Point(clientWidth / divisor, clientHeight / divisor);
  const pixelOrigin = pixelCenter.subtract(halfSize);
  const bottomRight = pixelCenter.add(halfSize);
  const bbox = new Bounds(pixelOrigin, bottomRight);
  return [bbox.min.x, bbox.min.y, bbox.max.x, bbox.max.y];
}


export function recenterOnPoint(crs, [x, y, z]){
  const relativePoint = toPoint([x, y]);
  const latLngCenter = crs.pointToLatLng(relativePoint, z);
  return [latLngCenter.lat, latLngCenter.lng];
}
