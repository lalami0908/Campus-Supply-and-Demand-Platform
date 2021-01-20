import React, { useState,ussEffect } from 'react';
import MaterialTable from 'material-table';
import {tableIcons} from '../common/constant'
export default function SupplyTable(props) {

    const  columns =  [
        { title: '需求標題', field: 'title'},
        { title: '需求內容', field: 'content' },
        { title: '報酬金額', field: 'price', type: 'numeric' },
        { title: '刊登時間', field: 'postDate', type:"datetime"},
        { title: '截止時間', field: 'deadline', type:"datetime"},
    ];

    return (
        <div className = "materialTable">
          <br/><br/>
            {     
                <MaterialTable
                    title={`${localStorage.getItem('name')}接下的需求單`}
                    columns={columns}
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
                />
            }

        </div>
    )
}

