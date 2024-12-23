import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});


// method od geting data from api   
export const getpost = () => {
    return api.get('/posts');
};

//method of deleting data from api
export const deletPost = (id) => {
    console.log(`Attempting to delete post with id: ${id}`);
    return api.delete(`/posts/${id}`);
};

//method of editing dta from api
export const editPost = (post)=>{
return api.post('/posts',post)
}

//method of put  data from api
export const putPost = (id, post)=>{
 return api.put(`/posts/${id}`, post)
}