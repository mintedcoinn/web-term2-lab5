/*
   компонент, для вывода строки таблицы
   пропсы:
      row - данные для формирования ячеек строки таблицы в виде массива
*/
const TableRow = (props) => {
    const cells = props.row.map((item, index) => <td key={ index }> { item } </td>); 
    return(
        <> 
           { cells } 
        </>
    )
}

export default TableRow;