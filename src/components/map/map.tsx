import * as React from 'react';
import {google as Google} from 'google-maps';

export interface MapProps {
  zoom: number;
  center?: google.maps.LatLng;
  google?: Google;
  onLoadMap?: (map: any) => void;
}

const Map = ({zoom, center, google, onLoadMap = () => {}}: MapProps) => {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    if (ref && ref.current && google) {
      center = center || new google.maps.LatLng(30.67, 104.06, true);
      const map = new google.maps.Map(ref.current as any, {
        center, //{lat: 30.67, lng: 104.06},
        zoom,
      });

      onLoadMap(map);
    }
  }, [google]);
  return <div style={{width: '100%', height: '100%'}} ref={ref}></div>;
};

export default Map;
