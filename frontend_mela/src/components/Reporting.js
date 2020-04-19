import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { nextFormatDate } from '../store/settings'
import { columns } from './Aids';
import moment from 'moment';

import { 
    Table,  Radio, 
    DatePicker,
} from 'antd';

const { RangePicker } = DatePicker;

const HeaderTable = props => (
    <div>
        <h1> Список данных для отчета</h1>
        <div>
            <div className='d-flex justify-content-between mt-3 mb-2'>
                <div>
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a" onClick={() => props.setActualData(2)}>ЭОП</Radio.Button>
                    <Radio.Button value="b" onClick={() => props.setActualData(0)}>Заявки</Radio.Button>
                </Radio.Group>
                </div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="ant-btn ant-btn-primary"
                    table="table-to-xls"
                    filename="Отчет"
                    sheet="ЭОП"
                    buttonText="Скачать отчет XLS"/>
            </div>
        </div>
        <div className='d-flex mt-4'>
            <div>
                <span className='mr-2'> Дата публикации :</span>
                <RangePicker 
                    format={nextFormatDate}
                    placeholder={['Старт дата', 'Конец дата']}
                    onChange={props.onChangeRangePicker}
                />
            </div>
        </div>
    </div>
)

const actualDataChoice = {
    0 : 'application',
    1 : 'company',
    2 : 'aids',
}


class Reporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actualData: actualDataChoice[2],
            dataPublication : null
        }
    }

    setActualData = number => {
        this.setState({
            actualData: actualDataChoice[number]
        })
    }

    componentDidMount() {
        this.props.onLoadAids();
        let elem = document.getElementById('table-find-table').getElementsByTagName('table')
        elem[0].id = 'table-to-xls'
    }

    filterData = data => {
        let { dataPublication } = this.state;
        if (dataPublication) {
            data = data.filter((elem) => {
                let data_public = moment(elem.date_public, nextFormatDate);
                return (
                    data_public.isSameOrAfter(dataPublication[0], 'day') 
                    && data_public.isSameOrBefore(dataPublication[1], 'day')
                )
            })
        }
        return data
    }

    getActualData = data => {
        let { actualData } = this.state;
        switch(actualData) {
            case 'application':
                let data_status_start = data.filter((elem) => elem.status === 'Создано')
                return this.filterData(data_status_start)
            case 'company':
                return this.filterData(data)
            case 'aids':
                return this.filterData(data)
            default:
                return this.filterData(data)
        }
    }
    
    onChangeRangePicker = date => {
        this.setState({
            dataPublication: date
        })
    }

    render() {
        let { data } = this.props;
        let { dataPublication } = this.state;

        console.log(dataPublication)
        
        data = this.getActualData(data)

        return (
            <div>
                <Table 
                    id='table-find-table'
                    bordered
                    className='table-aids'
                    title={() => <HeaderTable 
                                    setActualData={this.setActualData}
                                    onChangeRangePicker={this.onChangeRangePicker}
                                 />
                    }
                    dataSource={data} 
                    columns={columns} 
                    pagination={false}
                />
            </div>
        );
    }
}
 
export default Reporting