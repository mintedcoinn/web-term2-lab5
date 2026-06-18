import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from "react";
/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {

  const [activePage, setActivePage] = useState("1");
  const changeActive = (event) => {
    setActivePage(event.target.innerHTML);
  };

  const [dataTable, setDataTable] = useState(props.data);
  const updateDataTable = (value) => { 
    setDataTable(value);
    setActivePage('1');
   };

  const showPagination = props.showPagination;

  if (showPagination === true) {
    //количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows);

    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    //формируем совокупность span с номерами страниц
    const isCurPage = (cur, numPage) => {
      if (cur === numPage) return "pagination__curPage"
    }
    const pages = arr.map((item, index) =>
      <span key={index} className={isCurPage(item, activePage)} onClick={changeActive}> {item} </span>
    );
    return (
      <>
        <h4>Фильтры</h4>
        <Filter filtering={updateDataTable} data={dataTable} fullData={props.data} />
        <table>
          <TableHead head={Object.keys(props.data[0])} />
          <TableBody body={dataTable} amountRows={props.amountRows} numPage={activePage} />
        </table>

        <div className="pagination">
          {pages}
        </div>
      </>
    )

  } else {
    return (
      <>
        <h4>Фильтры</h4>
        <Filter filtering={updateDataTable} data={dataTable} fullData={props.data} />
        <table>
          <TableHead head={Object.keys(props.data[0])} />
          <TableBody
            body={dataTable}
            amountRows={props.data.length}
            numPage={1}
            separatorAfter={Number(props.amountRows) - 1}
          />
        </table>
      </>
    )
  }
}

export default Table;
