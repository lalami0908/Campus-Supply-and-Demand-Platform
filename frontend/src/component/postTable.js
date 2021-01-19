import React, { useState,ussEffect } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function PostTable(props) {

    // setData([{
    //     title: "title",
    //     subTitle: "subTitle",
    //     content: "123",
    //     postDate: new Date(),
    //     deadline: new Date(),
    //     needSupplyCnt: 5,
    //     supplyCnt: 3,
    // },{
    //     title: "title",
    //     subTitle: "subTitle",
    //     content: "123",
    //     postDate: new Date(),
    //     deadline: new Date(),
    //     needSupplyCnt: 5,
    //     supplyCnt: 3,
    // }]);
   
    const mockData = [{
        title: "title1",
        content: "content1",
        price: 200,
        postDate: new Date(),
        deadline: new Date(),
        needSupplyCnt: 4,
        supplyCnt: 3,
    },{
        title: "title2",
        content: "content2",
        price: 123,
        postDate: new Date(),
        deadline: new Date(),
        needSupplyCnt: 5,
        supplyCnt: 2,
    }];

    const  columns =  [
        { title: '需求標題', field: 'title'},
        { title: '需求內容', field: 'content' },
        { title: '需求金額', field: 'price', type: 'numeric' },
        { title: '申請時間', field: 'postDate', type:"datetime"},
        { title: '截止時間', field: 'deadline', type:"datetime"},
        { title: '需求人數', field: 'needSupplyCnt', type:"numeric"},
        { title: '目前人數', field: 'supplyCnt', type:"numeric"},
    ];

    const getDb = async () => {
       
    };
   

    const UpdateDb = async (newData) => {
        let data = newData;
      
    }

    const DeleteDb = async (deleteId) => {
      
    }
    
    
    // componentDidMount(){
    //     this.getDb();
    // }

    getDb();
    return (
        <div className = "materialTable">
          <br/><br/>
            {
                (props.editable)?(            
                <MaterialTable
                    title={props.title}
                    columns={columns}
                    data={mockData}//改成 props.postdata
                    icons={tableIcons}
                    editable={{
                        onRowAdd: (newData) => {
        
                            
                        },
                        onRowUpdate: (newData, oldData) =>{
                        
                        },
                        onRowDelete: (oldData) =>{
                       
                        },
                    }}
                />):(
                    <MaterialTable
                    title={props.title}
                    columns={columns}
                    data={mockData}//改成 props.postdata
                    icons={tableIcons}
                    />  
                )
            }

        </div>
    )
}

