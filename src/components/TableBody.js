import TableRow from './TableRow.js';

/*
   компонент, для вывода tbody таблицы
   пропсы:
      body - данные для таблицы в виде массива объектов
*/
const TableBody = (props) => {

   //формируем строки на основе переданных данных
    const tbody = props.body.map((item, index) =>
            <tr key={ index }>            
                <TableRow row={ Object.values(item) } isHead="0"/>
            </tr>
        );
  
    return (
        <tbody>
            { tbody }
        </tbody>
    )
}

export default TableBody;