import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getpost = () => {
    return api.get('/posts');
};

export const deletPost = (id) => {
    console.log(`Attempting to delete post with id: ${id}`);
    return api.delete(`/posts/${id}`);
};
