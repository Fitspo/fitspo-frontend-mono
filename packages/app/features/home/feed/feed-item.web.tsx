import { Avatar } from "app/design/avatar"
import { Effort, Post } from "app/features/posts/gqlTypes"

export function FeedItem({post}){

    console.log("Feed item: "+ JSON.stringify(post))
    const feedPost = post as Post
    const postTime = new Date(feedPost.updatedAt).toLocaleDateString()

    function feedMediaNull(){
        return feedPost.media === null || feedPost.media === "" || feedPost.media[0] === ""
    }

    function getStyleBasedOnEffort(){
        let effortColor
        console.log("Getting style based on effort: " + feedPost.effort)
        switch (feedPost.effort) {
            case Effort.HIGH:
                effortColor = 'ring-red-500'
                break;
            case Effort.MEDIUM:
                effortColor = 'ring-yellow-500'
                break;
            case Effort.LOW:
                effortColor = 'ring-green-500'
                break;
            default:
                effortColor = 'ring-slate-500'
                break;
        }
        return "rounded-full ring-4 ring-offset-2 " + effortColor
    }

    const fullName = feedPost.creator.firstName + " " + feedPost.creator.lastName

    return (
        <div className="md:flex-col z-10 border pt-4 rounded-lg shadow-md bg-gray-100 mb-5">
            <div className="flex px-4">
                <Avatar 
                    profilePic={feedPost?.creator.profilePic}
                    effort={feedPost?.effort}
                    emoji={feedPost?.effortEmoji}
                ></Avatar>
                {/* <img className={getStyleBasedOnEffort()} src={feedPost.creator.profilePic} alt="" style={{width:44, height:44}}></img> */}
                <div className="flex-col justify-between  items-center ml-4 mb-4">
                    <p className="font-medium text-black duration-300 transition ease-in-out text-sm">{fullName}</p>
                    <p className="font-medium text-slate-600 duration-300 transition ease-in-out text-sm">{postTime}</p>
                </div>
            </div>
            
            {!feedMediaNull()  && <div className="flex border-b border-t border-gray-200  h-96 w-full pb-3/4 justify-center" style={{height:500}}>
                    <div className="relative h-full w-fit"> 
                        <img className="relative h-full w-fit object-contain" src={feedPost.media} alt=""/>
                        {/* <button type="button" onClick={()=>{setMedia("")}}  className="absolute top-0 m-2 w-7 h-7 hover:bg-gray-500 hover:bg-opacity-50 rounded">
                            <svg fill="black" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button> */}
                    </div>
                </div>}
                <div className="px-4">
                    <p className="text-gray-700 my-4">{feedPost.content}</p>
                    <div className="flex-row justify-between space-x-4">
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </button>
                    </div>
                </div>
        </div>
    )
}