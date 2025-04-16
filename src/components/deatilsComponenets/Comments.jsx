import React from 'react'
import useReviews from '../../hooks/useReviews'
import LoaderSipnner from '../common/LoaderSipnner'
import CommentCard from './CommentCard'

const Comments = ({productTitle, id}) => {
    const {reviewData, reviewLoading} = useReviews(id);
    


  return (
    <div className='max-w-[1200px] mx-auto'>
      <div className="mb-8">
        <p className="text-xl font-medium text-gray-600 text-center">Ratings & Reviews of {productTitle}</p>
      </div> 
      {/* comment card */}
      <div className="">
        {
            reviewData?.length===0? <div className='py-10'>
             <p className="text-3xl font-semibold text-center">No Review Found</p>
            </div>:
            <div className="">
                {reviewLoading?<LoaderSipnner/>:
                // comment card
                <div className="">
                  {
                    reviewData.map(item=>(
                        <CommentCard 
                        key={item?._id}
                        item={item}
                        />
                    ))
                  }
                </div>
                }
            </div>
        }
      </div>
    </div>
  )
}

export default Comments