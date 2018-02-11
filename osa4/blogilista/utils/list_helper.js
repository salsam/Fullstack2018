
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

const totalLikes = (blogs) => {
    return blogs.map(blogs => blogs.likes).reduce((acc, cum) => acc + cum, 0)
}

module.exports = {
    dummy,
    favouriteBlog,
    totalLikes
}