import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ReactApexChart from 'react-apexcharts';


class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: this.props.multiLineStat,
            options: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: this.props.sana,
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " ta"
                        }
                    }
                }
            },


        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350}/>
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