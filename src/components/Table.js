import TableHead from './TableHead.js';
import TableBody from './TableBody.js';

/*
   компонент, выводящий на страницу таблицу 
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
    return( 
      <>
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ props.data } />
        </table>
       </>  
    )   
}

export default Table;