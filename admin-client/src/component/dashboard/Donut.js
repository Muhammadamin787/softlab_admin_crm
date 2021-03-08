import React, {Component} from 'react';
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class Donut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chart: "donut",
            options: {
                labels: props.labels ? props.labels : [],
            },
            series: props.series ? props.series : [],
        }
    }

    render() {
        const {sortAges} = this.props;
        if (sortAges.series !== this.state.series) {
            this.setState({
                series: sortAges.series,
                options: {labels: sortAges.labels ? sortAges.labels : []}
            })
        }
        return (
            <div className="donut m-1 p-3 bg-white rounded box-shad">
                <h5>{this.props.title}</h5>
                <Chart
                    options={this.state.options}
                    labels={this.state.options.labels}
                    series={this.state.series}
                    type="donut"
                    width="380"/>
            </div>
        );
    }

}

Donut.propTypes = {}

export default connect(
    ({app: {sortAges}}) => ({sortAges}))(Donut);