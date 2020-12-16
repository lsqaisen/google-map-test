import * as React from 'react';
import styles from './style/index.less';

export interface MarkersProps {
  markers: any[];
}

const Markers = ({markers}: MarkersProps) => {
  const [page, setPage] = React.useState(1);
  const [data, setDate] = React.useState<any>([]);
  React.useEffect(() => {
    if (markers.length > 0) {
      setPage(1);
      setDate(markers.slice((page - 1) * 25, page * 25));
    }
  }, [markers]);
  React.useEffect(() => {
    setDate(markers.slice((page - 1) * 25, page * 25));
  }, [page]);
  return markers.length <= 0 ? (
    <p>暂无数据</p>
  ) : (
    <div style={{marginTop: 16}}>
      <ul className={styles.list}>
        {data.map(({title, position}: any) => (
          <li className={styles.item} key={title}>
            {title},(lat:{position.lat()},lng:{position.lng()} )
          </li>
        ))}
      </ul>
      <section>
        <span>当前页 {page}</span>
        {page > 1 && (
          <button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            上一页
          </button>
        )}
        {markers.length > page * 25 && (
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            下一页
          </button>
        )}
      </section>
    </div>
  );
};

export default Markers;
