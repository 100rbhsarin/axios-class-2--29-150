import './card.css'
export const Card = ({jsonData, onDelet}) =>{
 


    const {id,title,body} = jsonData

    return(
        <>
     {/* <li className='user-id' key={id}> */}
     <div className='card'>
    
        <li className='user-id' key={id}>
    <h1>id : {id}</h1>
    <h2 className="title">title :{title}</h2>
    <p className="body"> body : {body}</p>
    <button>EDIT</button>
    <button onClick={() => onDelet(id)}>DELETE</button>
    </li>
</div>



        </>
    )

}
