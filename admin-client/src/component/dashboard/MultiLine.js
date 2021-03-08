import React, {Component} from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class LineGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: "Umumiy talablar soni",
                    data: this.props.multiLineStat[0]
                },
                {
                    name: "Faol talabalar",
                    data: this.props.multiLineStat[1]
                }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [3, 3],
                    curve: 'straight',
                    dashArray: [0, 3]
                },
                title: {
                    text: 'Talabalar statistikasi',
                    align: 'left',
                },
                legend: {
                    tooltipHoverFormatter: function (val, opts) {
                        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                    }
                },
                markers: {
                    size: 0,
                    hover: {
                        sizeOffset: 6
                    }
                },
                xaxis: {
                    categories: this.props.sana
                },
                tooltip: {
                    y: [
                        {
                            title: {
                                formatter: function (val) {
                                    return val + " - "
                                    // + " (mins)"
                                }
                            }
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val + " - "
                                    // + " per session"
                                }
                            }
                        },
                    ]
                },
                grid: {
                    borderColor: '#f1f1f1',
                }
            },
        };
    }

    render() {
        const {multiLineStat, sana} = this.props;
        if (this.state.options.xaxis.categories !== sana) {
            this.setState({
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: [3, 3],
                        curve: 'straight',
                        dashArray: [0, 3]
                    },
                    title: {
                        text: 'Talablar soni',
                        align: 'left',
                    },
                    legend: {
                        tooltipHoverFormatter: function (val, opts) {
                            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                        }
                    },
                    markers: {
                        size: 0,
                        hover: {
                            sizeOffset: 6
                        }
                    },
                    xaxis: {
                        categories: sana
                    },
                    tooltip: {
                        y: [
                            {
                                title: {
                                    formatter: function (val) {
                                        return val + " - "
                                        // + " (mins)"
                                    }
                                }
                            },
                            {
                                title: {
                                    formatter: function (val) {
                                        return val + " - "
                                        // + " per session"
                                    }
                                }
                            }
                        ]
                    },
                    grid: {
                        borderColor: '#f1f1f1',
                    }
                },
            })
        }
        return (
            <div className="donut p-3">
                <div id="chart">
                    <Chart id="donut" options={this.state.options} series={multiLineStat} type="line"
                           height={350}/>
                </div>
            </div>
        );
    }
}

LineGraph.propTypes = {}
export default connect(
    ({
         app: {multiLineStat, sana}
     }) => ({
        multiLineStat, sana
    }))
(LineGraph);