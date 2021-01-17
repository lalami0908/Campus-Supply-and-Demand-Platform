import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
import MaterialTable from 'material-table';
import PostTable  from '../../component/postTable.js';
function OwnDemand() {

    return(
        <div>
            <h1>
            OwnDemand TEST            
            </h1>
            <PostTable></PostTable>
        </div>
       
    )
}

export default OwnDemand
