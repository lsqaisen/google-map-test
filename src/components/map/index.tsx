import * as React from 'react';
import {Loader, google} from 'google-maps';
import Map from './map';
import Action from './action';
import Markers from './markers';

export interface MapsProps {}

const Maps = () => {
  const [google, setGoogle] = React.useState<google>();
  const [map, setMap] = React.useState<any>();
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
        <Map google={google} onLoadMap={setMap} />
      </section>
      <section style={{float: 'left', width: '480px', height: '100%'}}>
        <header>
          <Action google={google} map={map} onSetMarkers={setMarkers} />
        </header>
        <footer>
          <Markers markers={markers} />
        </footer>
      </section>
    </div>
  );
};

export default Maps;
