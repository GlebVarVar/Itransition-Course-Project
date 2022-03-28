
const ownerRating = (post) => {
    const res = post.Ratings.map((rate) => {
        if (rate.PostId == post.id ) {
          return rate
        }
    })[0].Rating

    return res
}

const totalRating = (post) => {
    return post.Ratings.map(rate => rate.Rating).reduce((prev, curr) => prev + curr, 0) / post.Ratings.length
}

export {ownerRating, totalRating}



