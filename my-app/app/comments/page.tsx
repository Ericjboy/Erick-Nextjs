"use client";

import { useState,useEffect,FormEventHandler, useRef } from "react";
import { Header } from "next/dist/lib/load-custom-routes";
import {format} from "date-fns"

interface Comment{
    id: string;
    createdTime:string;
    fields:{
        content:string;
        created:string;
        Status:'published' | 'pending-for-moderation';
    }
    title:string;
    category_name:string;

}

const formatDate = (date: string) => {
   return  format (new Date(date), 'd.MM.Y HH.mm.ss');
}
export default function Comments(){
    const commentRef = useRef <HTMLTextAreaElement>(null);
    const [isLoading , setIsLoading] = useState(true);
    const [isError , setIsError] = useState(false);
    const [Comments, setComments] = useState<Comment[] | null>(null);

    const loadComments = () => {
            fetch('/comments/api')
            .then(response => response.json())
            .then(data =>{ 
                 setComments(data);
          })
          .catch(()=>{
            setIsError(true);
          })
          .finally(()=>{
            setIsLoading(false);
          })
    }
  useEffect (() => {
    loadComments();
 }, []);
 const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const commentContent = commentRef.current?.value || '';
    if (commentContent){

       // console.log {'handleSubmit', commentRef .current?.value); 
   fetch('/comments/api',{
    method: 'POST',
    body: JSON.stringify({commentContent: commentContent})
   })
   .then(response => {
    if (response.ok){

        loadComments();

    }
   })   
    }

 }
 return(
        <main className="mt-6">
            <header>Comments</header>
            {isError &&<p>Error!</p>}
            {isLoading && <p>Loading...</p>}
            {isLoading && <p>Loading...</p>}
            <div>
                {Comments && Comments.map((elem) =>{  
                    return (
                        <div key={elem.id}>{elem.fields.content} ({elem.fields.Status}), {formatDate(elem.createdTime)}</div>
                    )
                }
                )}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                <label htmlFor="comment_body"></label>
                <textarea id="comment_body" ref={commentRef}/>
            </div>
            <div>
                <input type="submit" value="send" />
                </div>
                </form>
            </div>
                
                
             
            
        </main>
    )
    }