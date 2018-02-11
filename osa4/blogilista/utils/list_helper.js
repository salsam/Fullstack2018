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
    const ams = blogs.reduce((names,blog) => {
        blog.author in names ? names[blog.author]++ : names[blog.author]=1
        return names
    }, {})

    const best = { author: "", blogs: -1}
    for (name in ams) {
        if (ams[name] > best.blogs) {
            best.author=name,
            best.blogs=ams[name]
        }
    }

    return best
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const ams = blogs.reduce((names,blog) => {
        blog.author in names ? names[blog.author]+=blog.likes : names[blog.author]=blog.likes
        return names
    }, {})

    const best={}

    for (name in ams) {
        if (!best.author || ams[name] > best.votes) {
            best.author=name,
            best.votes=ams[name]
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