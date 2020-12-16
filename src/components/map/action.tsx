import * as React from 'react';
import {google as Google} from 'google-maps';

export interface ActionProps {
  google?: Google;
  map: any;
  onSetMarkers?: (markers: any[]) => void;
}

const Action = ({google, map, onSetMarkers = () => {}}: ActionProps) => {
  const [markers, setMarkers] = React.useState<any>([]);
  return (
    <button
      onClick={() => {
        if (google && map) {
          markers.forEach((v: any) => v.setMap(null));
          const data: any[] = [...new Array(5000)].map((_, i) => {
            const info = {
              map,
              title: `marker-${i}`,
              position: new google.maps.LatLng(
                30 + Number(Number(Math.random()).toFixed(2)),
                103.8 + Number(Number(Math.random()).toFixed(4)),
                true
              ),
            };
            return new google.maps.Marker(info);
          });
          onSetMarkers(data);
          setMarkers(data);
        }
      }}
    >
      随机生成markers
    </button>
  );
};

export default Action;
