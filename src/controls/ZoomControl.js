import React, {PropTypes} from 'react';


export function ZoomControl({onChangeViewport, viewport: {zoom}}) {
  // TODO add a slider for changing zoom levels
  return (
    <div style={{
           display: "flex",
           flexDirection: "column",
           position: "absolute",
           top: 10,
           left: 10,
           zIndex: 700
         }}>
      <button onClick={() => onChangeViewport({zoom: zoom + 1})}>+</button>
      <button onClick={() => onChangeViewport({zoom: zoom - 1})}>-</button>

    </div>
  );
}

ZoomControl.propTypes = {
  onChangeViewport: PropTypes.func.isRequired,
  viewport: PropTypes.shape({
    zoom: PropTypes.number.isRequired
  })

};
