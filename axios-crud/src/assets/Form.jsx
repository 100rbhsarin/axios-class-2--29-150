import { useEffect, useState } from 'react'
import './Form.css'
import { editPost, putPost } from '../api/postApi'


export const Form = ({data, setData, updatePostApi, setUpdatePostApi})=>{


    const [addData,setAddData] = useState({
        id:'',
        title:'',
        body:''
    })


    let isEmpty = Object.keys(updatePostApi).length === 0;

    //get the updated data update into input field
    useEffect(()=>{
        updatePostApi && setAddData({
            title: updatePostApi.title || "",
            body: updatePostApi.body  || "",
        })
    },[updatePostApi])
    

    const handleInputChange = (e)=>{

        const name = e.target.name;
        const value = e.target.value

        setAddData((prev)=>{
          return{
            ...prev, 
            [name]: value,
            
          }
        })
    }


    const getData = async ()=>{
    const res = await editPost(addData)
    console.log('res', res)
      
    if(res.status === 201){
      console.log(200)
        
        setData([...data, res.data])
        setAddData({
            id:'',
            title:'',
            body:''
        })
    } }



    const updatePostData = async () => {
        try {
          const res = await putPost(updatePostApi.id, addData);
          console.log(res);
    
          if (res.status === 200) {
            setData((prev) => {
              return prev.map((curElem) => {
                return curElem.id === res.data.id ? res.data : curElem;
              });
            });
    
            setAddData({ title: "", body: "" });
            setUpdatePostApi({});
          }
        } catch ({ error }) {
          console.log(error);
        }
      };


    const handleFormSubmit = (e)=>{
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if(action === 'ADD'){
            getData()
        }else if (action === 'EDIT'){
            updatePostData()
        }
       
    }

    return (
    <>  
    <form onSubmit={handleFormSubmit}>
    
    <div >
        <label htmlFor="title"></label>

            <input type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="ADD TITLE"
            value={addData.title}
            onChange={handleInputChange} />
        
    </div>

    <div>
        <label htmlFor="body"></label>

            <input type="text"
            autoComplete="off"
            id="body"
            name="body"
            placeholder="add body"
            value={addData.body}
            onChange={handleInputChange} />
        
    </div>

    <button type="submit" value={isEmpty ? "ADD" : "EDIT"}>
        {isEmpty ? "ADD": "EDIT"}
        </button>
    </form>
    </>
)
}
