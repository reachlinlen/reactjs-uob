import React from 'react';
import TableHead from './TableHead';
import Row from './Row';

const NO_ROWS = 5;

export default function Table() {
  const rowDetails = [
          ['transId01', 'USER - A', 'American Express', 500],
          ['transId02', 'USER - B', 'VISA', 3500],
          ['transId03', 'USER - C', 'DBS PayLah', 2500],
        ];
  const allRows = rowDetails.map(r => {
    return <Row tranID={r[0]} userName={r[1]} payMode={r[2]} amt={r[3]} />;
  });
  return (
    <div>
      <table style={{borderCollapse: 'collapse', width: '100%', display: 'inline-grid', margin: '2vh 0 0 15vw'}}>
        <TableHead />
        <React.Fragment>{allRows}</React.Fragment>
      </table>
    </div>
  );
}