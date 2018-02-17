import React from 'react'
import PropTypes from 'prop-types'

const newBlogForm = (handleCreate, handleFieldChange, author, title, url) => (
    <div>
        <h2>Create new blog</h2>
        <form onSubmit={handleCreate}>
            <div>
                title
        <input
                    name='title'
                    onChange={handleFieldChange}
                    type='text'
                    value={title}
                />
            </div>
            <div>
                author
        <input
                    name='author'
                    onChange={handleFieldChange}
                    type='text'
                    value={author}
                />
            </div>
            <div>
                url
        <input
                    name='url'
                    onChange={handleFieldChange}
                    type='text'
                    value={url}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
)

newBlogForm.PropTypes = {
    handleCreate: PropTypes.func.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default newBlogForm