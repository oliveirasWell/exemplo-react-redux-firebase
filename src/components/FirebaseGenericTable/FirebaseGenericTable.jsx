import React from "react";
import {TableLine} from "../TableLine/TableLine";
import Fade from "../Fade/Fade";

export default class FirebaseGenericTable extends React.Component {

    state = {
        tittle: '',
        dataList: this.props.dataList,
        in: false,
    };

    componentWillReceiveProps = nextProps => {
        this.setState({
            dataList: nextProps.dataList
        });
    };

    componentDidMount = () => this.setState({in: true});

    extractTableInfo = () => {
        if (this.state.dataList == null || this.state.dataList === undefined) {
            return {dataList: null, header: null}
        }

        const firstItem = this.state.dataList[0];
        const keys = firstItem !== undefined ? Object.keys(firstItem) : [];

        const dataList = this.state.dataList
            .map((leitura, index) =>
                <TableLine dados={leitura} index={index} key={index}/>
            );

        const header = (<tr>{keys.map((key, index) => <th key={index}> {key} </th>)}</tr>);

        return {dataList, header};
    };

    render() {
        const {dataList, header} = this.extractTableInfo();
        return (
            <Fade in={this.state.in}>
                <div>
                    <h1>{this.state.tittle}</h1>
                    <Fade in={dataList.length > 0}>
                        <table style={{margin: '0 auto'}}>
                            <thead>
                            {header}
                            </thead>
                            <tbody>
                            {dataList}
                            </tbody>
                        </table>
                    </Fade>
                </div>
            </Fade>
        );
    }
}
