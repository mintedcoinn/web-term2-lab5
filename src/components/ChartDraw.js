import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);


    // заносим в состояния ширину и высоту svg-элемента
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });
    // задаем отступы в svg-элементе
    const margin = {
        top: 10,
        bottom: 60,
        left: 40,
        right: 10
    };

    // вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        // выводим прямоугольник, 		
        svg
            .append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width", boundsWidth)
            .attr("height", boundsWidth)
            .style("fill", "lightgrey");
    });
    // диаграмма для максимальных значений

    let [min, max] = props.minMax[0] ?
        d3.extent(props.data.map(d => d.values[1]))
        : d3.extent(props.data.map(d => d.values[0]));

    // формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0, boundsWidth])
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);


    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        //рисуем график
        if (props.minMax[1] === true) {
            props.type === "Histogram" ?
                createHistogram(0, svg, "red", 0) :
                createDotChart(0, svg, "red");
        }
        if (props.minMax[0] === true) {
            props.type === "Histogram" ?
                createHistogram(1, svg, "blue", 1) :
                createDotChart(1, svg, "blue");
        }

    }, [scaleX, scaleY, props.data]);

    const createDotChart = (indexOY, svg, color) => {
        return svg.selectAll(".dot")
            .data(props.data)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[indexOY]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("fill", color)
    }

    const createHistogram = (indexOY, svg, color, pos) => {
        const bothSelected = props.minMax[0] && props.minMax[1];

        const barWidth = bothSelected
            ? (scaleX.bandwidth() / 2) * 0.8
            : scaleX.bandwidth() * 0.8;

        return svg.selectAll(`.bar-${indexOY}`)
            .data(props.data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + (bothSelected ? pos * barWidth : 0))
            .attr("y", d => scaleY(d.values[indexOY]))
            .attr("width", barWidth)
            .attr("height", d => height - margin.top - margin.bottom - scaleY(d.values[indexOY]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("fill", color);
    }


    return (
        <svg ref={chartRef} >  </svg>
    )
}

export default ChartDraw;