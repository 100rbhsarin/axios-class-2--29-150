import { useState } from 'react'
import './Form.css'
import { editPost } from '../api/postApi'


export const Form = ({data, setData})=>{


    const [addData,setAddData] = useState({
        id:'',
        title:'',
        body:''
    })


    const handleInputChange = (e)=>{

        const name = e.target.name;
        const value = e.target.value

        setAddData((prev)=>{
          return{
            ...prev, 
            [name]: value,
            id: Date.now(),
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




    const handleFormSubmit = (e)=>{
        e.preventDefault();
        getData()
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
    <button type="submit">FORM SUBMIT</button>
    </form>
    </>
)
}
