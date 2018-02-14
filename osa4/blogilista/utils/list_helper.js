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
    var best = { author: blogs[0].author, blogs: 1 }

    const ams = blogs.reduce((names, blog) => {
        blog.author in names ? names[blog.author]++ : names[blog.author] = 1
        if (names[blog.author] > best.blogs) {
            best = { author: blog.author, blogs: names[blog.author] }
        }
        return names
    }, {})

    return best
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    var best = {}
    const ams = blogs.reduce((names, blog) => {
        blog.author in names ? names[blog.author] += blog.likes : names[blog.author] = blog.likes
        return names
    }, {})

    for (name in ams) {
        if (!best.author || ams[name] > best.votes) {
            best.author = name,
                best.votes = ams[name]
        }
    }

    return best
}

const totalLikes = (blogs) => {
    return blogs.map(blogs => blogs.likes).reduce((acc, cum) => acc + cum, 0)
}

module.exports = {
    dummy,
    favouriteBlog,
    mostBlogs,
    mostLikes,
    totalLikes
}