const postsUrl = 'https://dummyjson.com/posts';

export const getAllPosts = async() =>{
    try{
        const response = await fetch(postsUrl);
        if(!response.ok){
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        return data.posts;
    }catch(error){
        return error
    }
};
export default getAllPosts;