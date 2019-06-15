import React, { Component, useState, useEffect, useLayoutEffect } from 'react';
import TableHead from './TableHead';
import Row from './Row';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const NO_ROWS = 5;

function Table(props) {
  const [rowElements, setRowElements] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageButtons, setPageButtons] = useState([]);
  // const [totPages, setTotPages] = useState(1);
  let totPages = 1, currPages = [], prevTotPages = 0;
  const NOROWS_PAGE = 3;
  let BUT1, BUT2, BUT3, NAVBUT1, NAVBUT2;

  useEffect(() => {
    let txnData = props.txnData, latestTxns = [];
    if (txnData.length > NOROWS_PAGE) {
      if (pageNo === 1) latestTxns = txnData.slice(0,NOROWS_PAGE);
      else latestTxns = txnData.slice(pageNo*NOROWS_PAGE, (pageNo*NOROWS_PAGE)+NOROWS_PAGE);
    } else latestTxns = txnData;
    let allRows = latestTxns.map(r => {
      return <Row tranID={r.transID} userName={r.userName} payMode={r.bankName} amt={r.txnAmt} />;
    });
    setRowElements(allRows);
  }, [props.txnData]);

  useLayoutEffect(() => {
  let currTotPages = Math.trunc(props.txnData.length/3) + (props.txnData.length%3 !== 0 ? 1 : 0);  
  if (prevTotPages !== currTotPages) {
    switch (currTotPages) {
      case 1:
        // currPages = [];
        // setPageButtons(createPageBut(currPages));
        prevTotPages = currTotPages;
        break;
      case 2:
        currPages = [1,2];
        createPageBut(currPages);
        prevTotPages = currTotPages;
        break;
      case 3:
        currPages = [1,2,3];
        createPageBut(currPages);
        prevTotPages = currTotPages;
        break
      case 4:
        currPages = [1,2,3,4];
        createPageBut(currPages);
        prevTotPages = currTotPages;
        break;
      case 5:
        currPages = [1,2,3,4,5];
        createPageBut(currPages);
        prevTotPages = currTotPages;
        break;
      default:
        switch (pageNo) {
          case 1 || 2 || 3 || 4 || 5:
            currPages = [1,2,3,4,5,'>'];
            break;
          default:
            if (currTotPages === pageNo) currPages = ['<',pageNo-4, pageNo-3, pageNo-2, pageNo-1, pageNo];
            else currPages = ['<',pageNo-4, pageNo-3, pageNo-2, pageNo-1, pageNo,'>'];
        }
        createPageBut(currPages);
        prevTotPages = currTotPages;
        break;
    }
  }  
  setPageButtons([BUT1, BUT2]);
  }, [props.txnData]);

  const createPageBut = (pages) => {
    let Buttons = pages.forEach(e => {
                    return <Button className="user-a" variant="contained" color="primary" onClick={handlePageBtnClick}
                              style={{margin: '2vh 2vw 2vh 2vw'}}>{e}</Button>;
    });
    setPageButtons(Buttons);
  }

  const handlePageBtnClick = (e) => {
    let txnData = props.txnData, pageClicked = parseInt(e.target.innerHTML);
    setPageNo(pageClicked);
    let allRows = txnData.slice((pageClicked-1)*NOROWS_PAGE, ((pageClicked-1)*NOROWS_PAGE)+NOROWS_PAGE)
                          .map(r => {
                            return <Row tranID={r.transID} userName={r.userName} payMode={r.bankName} amt={r.txnAmt} />;
                          });
    setRowElements(allRows);
  }
  
  return (
    <div style={{paddingTop: '20px'}}>
      <table style={{borderCollapse: 'collapse', width: '100%', display: 'inline-grid'}}>
        <TableHead />
        <React.Fragment>{rowElements}</React.Fragment>
      </table>
      {pageButtons}
    </div>
  );
}

const mapStateToProps = (state) => ({
  txnData: state.data
});

export default connect(mapStateToProps, null)(Table);