// import './postshow.css'

import { useEffect, useState } from "react";
import { deletPost, getpost } from "../api/postApi";
import {Card} from './card'
import { Form } from "./Form";


export const PostShow = ()=>{
const [data,setData] = useState([])

console.log(data)



const handleDelete = async (id) => {
    try {
        console.log(`Deleting post with id: ${id}`);
        const res = await deletPost(id);
        console.log(res.data);
        if (res.status === 200) {
            console.log(200)
            const newupdatepost = data.filter((curItem) =>
                 curItem.id !== id);
            setData(newupdatepost);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete the post.');
    }
};

    const getpostapi = async () =>{
        const res = await getpost();
        setData(res.data)
        console.log(res.data);
      }
      
      
      useEffect(()=>{
      
      getpostapi()
      },[])
    return(
        <>
        <section>
            <Form data={data} setData={setData}/>
        </section>
        <div>

 <ol className="card-container">
    
    {data.map((curItem)=>{
        return(
            
            <Card key={curItem.id} jsonData={curItem} onDelet={handleDelete} />
            
        )
    })}
</ol>
</div>

    
        </>
    )
}
