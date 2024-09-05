import { useState, useEffect } from "react";
import getAllPosts from "../api/utils/getAllPosts";

const usePosts = () =>{
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const[error, setError] = useState('')

    useEffect(() =>{
        const fetchPosts = async ()=>{
            try{
                const data = await getAllPosts();
                setPosts(data);
            }catch(error){
                setError((error as Error).message);
            }finally{
                setLoading(false);
            }
        };
        fetchPosts()
    }, []);
   
    return {posts, loading, error}

};
export default usePosts;