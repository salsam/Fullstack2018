
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blogs => blogs.likes).reduce((acc,cum) => acc+cum,0)
}

module.exports = {
    dummy,
    totalLikes
}