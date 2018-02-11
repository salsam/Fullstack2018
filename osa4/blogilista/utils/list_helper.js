
const dummy = (blogs) => {
    return 1
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const mostLikes = blogs.map(blog => blog.likes)
        .reduce((acc, cum) => Math.max(acc, cum), blogs[0].likes)
    return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }


}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, cum) => acc.likes + cum.likes, 0)
}

module.exports = {
    dummy,
    favouriteBlog,
    totalLikes
}