"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const singleUser = ({params}: {params:{id:string}}) => {
    const [post, setPost] = useState<any>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('')
    const router = useRouter();

    useEffect(() => {
       const fetchPost = async () =>{
        try{
            const response = await fetch(`https://dummyjson.com/posts/${params.id}`);
            if(!response.ok){
                throw new Error("Failed to fetch post");
            }
            const data = await response.json();
            setPost(data);
        }catch (error){
            setError((error as Error).message);
        }finally{
            setLoading(false);
        }
       };
       fetchPost();
    }, [params.id]);

    if(loading) {
        return <div>Loading...</div>;
    }
    if(error){
        return <div>Error:{error}</div>;
    }
    if(!post){
        return <div>Post not found</div>
    }
    return(
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-700 mb-4">{post.body}</p>
          <div className="flex items-center mb-4">
           <span className="mr-4">Likes:{post.reactions.likes}</span>
           <span className="mr-4">Dislikes:{post.reactions.dislikes}</span>
           <span>Views:{post.views}</span>
          </div>
          <button onClick={() => router.back()} className="p-2 bg-ombre-500 text-white rounded">Back</button>
        </div>
    )
}
export default singleUser;