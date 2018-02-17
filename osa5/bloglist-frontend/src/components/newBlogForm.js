import React from 'react'

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

export default newBlogForm