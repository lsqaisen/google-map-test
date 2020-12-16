import * as React from 'react';
import {google as Google} from 'google-maps';

export interface MapProps {
  google?: Google;
  onLoadMap?: (map: any) => void;
}

const Map = ({google, onLoadMap = () => {}}: MapProps) => {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    if (ref && ref.current && google) {
      const map = new google.maps.Map(ref.current as any, {
        center: {lat: 30.67, lng: 104.06},
        zoom: 12,
      });
      onLoadMap(map);
    }
  }, [google]);
  return <div style={{width: '100%', height: '100%'}} ref={ref}></div>;
};

export default Map;
