import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ReactApexChart from 'react-apexcharts';


class ApexChart extends Component {
    constructor(props) {
        super(props);

        function generateDayWiseTimeSeries() {
            return [
                [
                    "2019-2-23",
                    0
                ],
                [
                    "2019-2-24",
                    6
                ],
                [
                    "2019-2-25",
                    1
                ],
                [
                    "2019-2-26",
                    30
                ],
                [
                    "2019-2-27",
                    3
                ],
                [
                    "2019-2-28",
                    0
                ],
                [
                    "2019-2-29",
                    0
                ],
                [
                    "2019-2-30",
                    0
                ],
                [
                    "2019-2-31",
                    0
                ]
            ];
        }

        this.state = {

            series: [
                {
                    name: 'South',
                    data: [
                        [
                            "2019-2-23",
                            2
                        ],
                        [
                            "2019-2-24",
                            6
                        ],
                        [
                            "2019-2-25",
                            10
                        ],
                        [
                            "2019-2-26",
                            30
                        ],
                        [
                            "2019-2-27",
                            3
                        ],
                        [
                            "2019-2-28",
                            0
                        ],
                        [
                            "2019-2-29",
                            0
                        ],
                        [
                            "2019-2-30",
                            0
                        ],
                        [
                            "2019-2-31",
                            0
                        ]
                    ]
                },
                {
                    name: 'North',
                    data: [
                        [
                            "2019-2-23",
                            2
                        ],
                        [
                            "2019-2-24",
                            1
                        ],
                        [
                            "2019-2-25",
                            70
                        ],
                        [
                            "2019-2-26",
                            30
                        ],
                        [
                            "2019-2-27",
                            3
                        ],
                        [
                            "2019-2-28",
                            0
                        ],
                        [
                            "2019-2-29",
                            0
                        ],
                        [
                            "2019-2-30",
                            0
                        ],
                        [
                            "2019-2-31",
                            0
                        ]
                    ]
                },
                {
                    name: 'Central',
                    data: [
                        [
                            "2019-2-23",
                            2
                        ],
                        [
                            "2019-2-24",
                            6
                        ],
                        [
                            "2019-2-25",
                            1
                        ],
                        [
                            "2019-2-26",
                            30
                        ],
                        [
                            "2019-2-27",
                            3
                        ],
                        [
                            "2019-2-28",
                            0
                        ],
                        [
                            "2019-2-29",
                            0
                        ],
                        [
                            "2019-2-30",
                            0
                        ],
                        [
                            "2019-2-31",
                            0
                        ]
                    ]
                }
            ],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    stacked: true,
                    events: {
                        selection: function (chart, e) {
                            console.log(new Date(e.xaxis.min))
                        }
                    },
                },
                colors: ['#008FFB', '#00E396', '#CED4DC'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: 0.6,
                        opacityTo: 0.8,
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
            },


        };
    }

    render() {
        const {multiLineStat, sana} = this.props;
        return (
            <div className="donut p-3">
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350}/>
                </div>
            </div>
        );
    }
}

ApexChart.propTypes = {}
export default connect(
    ({
         app: {multiLineStat, sana}
     }) => ({
        multiLineStat, sana
    }))
(ApexChart);