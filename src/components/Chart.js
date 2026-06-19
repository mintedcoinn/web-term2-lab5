import { use, useState } from "react";
import ChartDraw from "./ChartDraw";
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false]);
    const [type, setType] = useState("gisto");
    const [showError, setShowError] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();

        setOx(event.target["ox"].value);
        setOy([event.target["oy"][0].checked, event.target["oy"][1].checked]);
        checkOy(event.target["oy"]);
        setType(event.target["type"].value);

    }

    const handleCheck = (event) => {
        setShowError(false);

    }
    const checkOy = (oy) => {
        if (!(oy[0].checked || oy[1].checked)) {
            setShowError(true);
        }
    }

    const createArrGraph = (data, key) => {
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];

        for (let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({ labelX: entry[0], values: minMax });
        }
        if (key === "Год") {
            arrGraph.sort((a, b) => a.labelX - b.labelX);
        }

        return arrGraph;
    }
    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"} />
                    Страна
                    <br />
                    <input type="radio" name="ox" value="Год" />
                    Год
                </div>

                <p> Значение по оси OY </p>
                <div className="oy">
                    <label className={showError ? "error" : ""}  >
                        <input type="checkbox" name="oy" defaultChecked={oy[0] === true} onChange={handleCheck} />
                        Максимальная высота <br />
                    </label>
                    <label className={showError ? "error" : ""}>
                        <input type="checkbox" name="oy" onChange={handleCheck} />
                        Минимальная высота
                    </label>
                </div>


                <p> Тип графика </p>
                <select name="type">
                    <option value="DotChart">Точечная диаграмма</option>
                    <option value="Histogram">Гистограмма</option>
                </select>
                <p>
                    <button type="submit">Построить </button>
                </p>


            </form>
            <ChartDraw data={createArrGraph(props.data, ox)} minMax={oy} type={type} />
        </>
    )
}

export default Chart;