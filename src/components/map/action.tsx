import * as React from 'react';
import {google as Google} from 'google-maps';

export interface ActionProps {
  google?: Google;
  map?: google.maps.Map;
  onSetMarkers?: (markers: google.maps.Marker[]) => void;
}

function getRandomNum(max: number, min: number) {
  let range = max - min,
    rand = Math.random();
  return min + Math.round(rand * range);
}

const Action = ({google, map, onSetMarkers = () => {}}: ActionProps) => {
  const [markers, setMarkers] = React.useState<any>([]);
  const [polygon, setPolygon] = React.useState<google.maps.Polygon>();
  const [canFill, setCanFill] = React.useState(false);
  React.useEffect(() => {
    let path: any[] = [];
    markers.forEach((v: any) => {
      path.push(v.position);
    });
    if (google && map) {
      map.addListener('rightclick', () => {
        const poly = new google.maps.Polygon({
          paths: path,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#FF0000',
          fillOpacity: 0.5,
        });
        poly.setMap(map);
        setPolygon(poly);
        markers.forEach((v: any) => v.setMap(null));
        setCanFill(true);
      });
    }
  }, [markers]);
  return (
    <>
      <button
        onClick={() => {
          if (google && map) {
            markers.forEach((v: any) => v.setMap(null));
            const data: any[] = [...new Array(5000)].map((_, i) => {
              const info = {
                map,
                title: `marker-${i}`,
                position: new google.maps.LatLng(
                  getRandomNum(-85, 80) + Math.random(),
                  getRandomNum(-180, 180) + Math.random(),
                  true
                ),
              };
              const marker = new google.maps.Marker(info);
              return marker;
            });
            setMarkers(data);
            onSetMarkers(data);
          }
        }}
      >
        随机生成markers
      </button>
      {canFill && (
        <button
          onClick={() => {
            if (polygon) {
              polygon.setOptions({
                fillColor: '#000',
              });
            }
          }}
        >
          填充颜色
        </button>
      )}
      <input
        id="file"
        type="file"
        onChange={(e) => {
          let file = (document.getElementById(`file`) as any).files[0];
          console.log(file);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            console.log(e.target.result);
            let testi = new google!.maps.Data();
            testi.loadGeoJson(URL.createObjectURL(new Blob([e.target.result])));

            testi.setMap(map!);
          };
          reader.readAsText(file);
        }}
      />
    </>
  );
};

export default Action;
