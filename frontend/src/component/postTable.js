import React, { useState,ussEffect } from 'react';
import MaterialTable from 'material-table';
import SupplyModal from './SupplyModal'
import {tableIcons} from '../common/constant'


function PostTable(props) {
    // 奇怪的坑 這裡不能用react hook function 我猜有一些套件衝突
    const mockData = [{
        apply: <SupplyModal postID={"mockID-sadasd123o4hasdjlk"}/>,
        title: "title1",
        content: "content1",
        price: 200,
        postDate: new Date(),
        deadline: new Date(),
        needSupplyCnt: 4,
        supplyCnt: 3,
    },{
        apply: <SupplyModal postID={"mockID-132kzxceawd8931hsa"}/>,
        title: "title2",
        content: "content2",
        price: 123,
        postDate: new Date(),
        deadline: new Date(),
        needSupplyCnt: 5,
        supplyCnt: 2,
    }];
    const  columns =  [
        { title: '我要應徵', field: 'apply'},
        { title: '需求標題', field: 'title'},
        { title: '需求內容', field: 'content' },
        { title: '報酬金額', field: 'price', type: 'numeric' },
        { title: '刊登時間', field: 'postDate', type:"datetime"},
        { title: '截止時間', field: 'deadline', type:"datetime"},
        { title: '需求人數', field: 'needSupplyCnt', type:"numeric"},
        { title: '目前人數', field: 'supplyCnt', type:"numeric"},
    ];
    
    return (
        <div className = "materialTable">
          <br/><br/>
            {
                (props.editable)?(            
                <MaterialTable

                    // title={props.title}
                    // columns={columns}
                    // data={props.postdata}//改成 props.postdata

                    title={`${localStorage.getItem('name')}刊登的需求單`}
                    columns={columns.slice(1)}
                   // data={mockData.slice(1)}//改成 props.postdata
                    data={props.postdata}
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
                    title={'點擊各需求單標題進行接單'}
                    columns={columns}
                    data={props.postdata}//改成 props.postdata
                    icons={tableIcons}
                    />  
                )
            }

        </div>
    )
}

export default PostTable