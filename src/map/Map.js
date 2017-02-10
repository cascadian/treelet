import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'react-hammerjs';
import {Point} from "../leaflet/src/geometry/Point";
import {LatLng, toLatLng} from "../leaflet/src/geo/LatLng";
import {getBoundingBox, pointToLatLng} from "./utils";
import {MapPane} from "./MapPane";

export class MapView extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  static propTypes = {
    renderLayers: PropTypes.func,
    onChangeViewport: PropTypes.func.isRequired,
    onLayoutChange: PropTypes.func,
    viewport: PropTypes.shape({
      zoom: PropTypes.number.isRequired,
      center: PropTypes.arrayOf(React.PropTypes.number)
    })
  }

  updateDimensions() {
    const {onLayoutChange} = this.props;
    const {clientWidth, clientHeight} = this.containerRef;
    if (onLayoutChange) {
      onLayoutChange({
        clientWidth,
        clientHeight
      })
    }
  }
  componentDidMount() {
    if (this.containerRef) {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions);
    }
  }
  componentWillUnmount() {
    if (this.containerRef) {
      window.removeEventListener("resize", this.updateDimensions);
    }
  }
  render() {
    const {renderLayers, style, ...rest} = this.props;
    const {onChangeViewport,
          onLayoutChange,
          layout,
          viewport: {zoom = 13, center = [0, 0]},
          crs} = rest;;
    const mergedStyle = {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "transparent",
      ...style};

      const layers = () => {
        if (layout && layout.clientWidth && layout.clientHeight && renderLayers) {
          const bbox = getBoundingBox(this.props);
          const result = renderLayers({...rest, bbox});
          return result || null;
        } else {
          return null;
        }
      };
    return (
      <div
        style={mergedStyle}

        ref={(ref) => this.containerRef = ref} >
        
         {layers()}
        {this.props.children}
      </div>
    );
  }
};
