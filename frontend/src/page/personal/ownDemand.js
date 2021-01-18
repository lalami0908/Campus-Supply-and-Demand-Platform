import React, { useEffect, useRef, useState } from 'react'
// import { Button, Input, message, Tag } from 'antd'
// import MaterialTable from 'material-table';
import PostTable  from '../../component/postTable.js';
import CreateNewPostForm  from '../../component/creatNewPostForm.js';
// import FormModal from '../../component/FormModal.js';
import  UploadImage   from '../../component/UploadImage.js';

function OwnDemand() {

    return(
        <div>
            <h1>
            OwnDemand TEST            
            </h1>
            {/* <UploadImage></UploadImage> */}
            <CreateNewPostForm></CreateNewPostForm>
            <PostTable></PostTable>
 
        </div>
       
    )
}

export default OwnDemand
