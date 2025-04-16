import React from 'react'
import CardWish from './CardWish'

const WishCard = ({wishData, wishRefetch}) => {
  return (
    <div>
        <div className="grid grid-cols-1 bg-white p-4 gap-2">
        {wishData?.map((item) => (
          <CardWish key={item?._id} item={item} wishRefetch={wishRefetch} />
        ))}
      </div>
    </div>
  )
}

export default WishCard