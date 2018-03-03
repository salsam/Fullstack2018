import blogService from '../services/blogs'

const BlogReducer = (state = [], action) => {
    if (action.type === 'LIKE') {
        const liked = state.find(blog => blog._id === action.id)
        return state
            .map(blog => blog._id === liked._id ?
                { ...liked, likes: liked.likes + 1 } :
                blog)
    } else if (action.type === 'CREATE') {
        console.log(action.data)
        return state.concat(action.data)
    } else if (action.type === 'DELETE') {
        return state.filter(blog => blog._id !== action.data)
    } else if (action.type === 'INITIALIZE_BLOGS') {
        return action.data
    }
    return state
}

export const likeCreation = (id) => {
    return {
        type: 'LIKE',
        id
    }
}

export const createBlog = (blog,user) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        newBlog.user=user
        dispatch({
            type: 'CREATE',
            data: newBlog
        })
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE',
            data: id
        })
    }
}

export const like = (liked) => {
    return async (dispatch) => {
        const updated = { ...liked, likes: liked.likes + 1 }
        await blogService.update(liked._id, updated)
        dispatch(likeCreation(liked._id))
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE_BLOGS',
            data: blogs
        })
    }
}

export default BlogReducer