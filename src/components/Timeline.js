import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/user-photos'
import Post from './posts/index'

export default function Timeline() {
    // we need to get the logged in user's photo (custom-hook)
    const {photos} = usePhotos();
    // on loading the photos, we need to use react skeleton
    // if we have photos, render them (create a post component)
    // if the user has no photos, tell them to create some photos 
    return (
        <div className="container col-span-2 mr-4">
           {!photos?(
               <>
               {<Skeleton width={620} count="4" height={500} className="mb-4 md:w-12 sm:w-12"/>} 
               </>
           ): photos?.length>0?(photos.map((content)=> <Post key={content.docId} content={content}/>)):(
            <p className ="text-center text-2xl">Follow people to see photos</p>
           )
           }
        </div>
    )
}
