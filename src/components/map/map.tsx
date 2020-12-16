import * as React from 'react';
import {google as Google} from 'google-maps';

export interface MapProps {
  zoom: number;
  center: google.maps.LatLng;
  google?: Google;
  onLoadMap?: (map: any) => void;
}

const Map = ({zoom, center, google, onLoadMap = () => {}}: MapProps) => {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    if (ref && ref.current && google) {
      center = center || new google.maps.LatLng(30.67, 104.06, true);
      const map = new google.maps.Map(ref.current as any, {
        // center, //{lat: 30.67, lng: 104.06},
        // zoom,
        zoom: 4,
        center: {lat: 49.496675, lng: -102.65625},
      });
      // let testi = new google.maps.Data();
      // testi.loadGeoJson('file:///Users/aisen/Downloads/AUS_zone.json');

      // map.data.loadGeoJson("file:///Users/aisen/Downloads/AUS_zone.json")
      // testi.setMap(map);
      // google.maps.FusionTablesLayer
      // var georssLayer = new google.maps.KmlLayer({
      //   url:
      //     'file:///Users/aisen/Downloads/AUS_zone.shp',
      // });
      // georssLayer.setMap(map);
      onLoadMap(map);
    }
  }, [google]);
  return <div style={{width: '100%', height: '100%'}} ref={ref}></div>;
};

export default Map;
