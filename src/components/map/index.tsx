import * as React from 'react';
import {Loader, google} from 'google-maps';
import Map from './map';
import Action from './action';
import Markers from './markers';

export interface MapsProps {
  center: google.maps.LatLng;
  zoom: number;
}

const Maps = ({zoom = 12, center}: MapsProps) => {
  const [google, setGoogle] = React.useState<google>();
  const [map, setMap] = React.useState<google.maps.Map>();
  const [markers, setMarkers] = React.useState<any>([]);
  React.useEffect(() => {
    const loader = new Loader();
    loader.load().then((google) => {
      setGoogle(google);
    });
  }, []);

  return (
    <div style={{width: '100%', height: '100%'}}>
      <section
        style={{float: 'left', width: 'calc(100% - 480px)', height: '100%'}}
      >
        <Map {...{zoom, center, google}} onLoadMap={setMap} />
      </section>
      <section style={{float: 'left', width: '480px', height: '100%'}}>
        <header>
          <Action {...{google, map}} onSetMarkers={setMarkers} />
        </header>
        <footer>
          <Markers map={map!} markers={markers} />
        </footer>
      </section>
    </div>
  );
};

export default Maps;
