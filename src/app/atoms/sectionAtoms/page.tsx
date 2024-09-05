"use client";
import { FaThumbsUp, FaThumbsDown, FaEye } from "react-icons/fa";
import usePosts from "@/app/hooks/usePosts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PostCardProps {
  id:number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  views: number;
}

const SectionAtom = ({id, title, body, likes, dislikes, views }: PostCardProps) => {
    
  return (
    <div className="relative border border-gray-300 rounded-lg p-6 mb-6 bg-white bg-opacity-30 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300">
  <h2 className="text-2xl font-extrabold mb-3 text-gray-800">{title}</h2>
  <p className="text-gray-600 mb-5">{body}</p>
  
  <div className="flex items-center justify-between text-gray-500 text-sm">
    <div className="flex items-center">
      <FaThumbsUp className="text-blue-500 mr-2" />{likes}
      <FaThumbsDown className="text-red-500 ml-4 mr-2" />{dislikes}
    </div>
    <div className="flex items-center">
      <FaEye className="text-gray-400 mr-2" />{views}
    </div>
  </div>
  
  <Link href={`/post/${id}`}>
    <div className="block mt-6 text-center">
      <button className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold rounded-lg py-2 px-4 shadow-md hover:shadow-lg transition-shadow duration-300">
        Read more..
      </button>
    </div>
  </Link>
</div>

  );
};

const PostsPage = () => {
const data = usePosts();
  
  if (data.loading) {
    return <div>Please wait...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-20">
    {data.posts.map(post => (
        <SectionAtom
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          likes={post.reactions.likes}
          dislikes={post.reactions.dislikes}
          views={post.views}
        />
      ))}
    </div>
  );
};

export default PostsPage;
