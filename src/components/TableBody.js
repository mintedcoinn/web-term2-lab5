import TableRow from './TableRow.js';
import TableSeparater from './TableSeparater.js';

/*
   компонент, для вывода tbody таблицы
   пропсы:
      body - данные для таблицы в виде массива объектов
      numPage - номер текущей страницы
      amountRows - количество строк таблицы на странице
*/

const TableBody = (props) => {
    const begRange = (props.numPage - 1) * props.amountRows;
    const endRange = begRange + Number(props.amountRows);
    const cols = Object.keys(props.body[0]).length;

    const rows = [];
    props.body.forEach((item, index) => {
        rows.push(
            <tr key={index} className={
                (index >= begRange && index < endRange) ? "show" : "hide"
            }>
                <TableRow row={Object.values(item)} isHead="0" />
            </tr>
        );
        if (props.separatorAfter === index) {
            rows.push(<TableSeparater key={`sep-${index}`} cols={cols} />);
        }
    });

    return <tbody>{rows}</tbody>;
};

export default TableBody;
