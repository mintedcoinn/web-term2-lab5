const TableSeparater = (props) => {
    return (
        <tr className="table-separator">
            <td colSpan={props.cols}>· · ·</td>
        </tr>
    );
};

export default TableSeparater;
