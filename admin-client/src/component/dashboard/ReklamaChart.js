import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ReactApexChart from 'react-apexcharts';


class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: this.props.sortReklama && this.props.sortReklama.series && this.props.sortReklama.series.length > 0 ? this.props.sortReklama.series : [],
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: this.props.sortReklama && this.props.sortReklama.labels && this.props.sortReklama.labels.length > 0 ? this.props.sortReklama.labels : [],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },


        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380}/>
            </div>
        );
    }
}

ApexChart.propTypes = {}
export default connect(
    ({
         app: {sortReklama}
     }) => ({
        sortReklama
    }))
(ApexChart);