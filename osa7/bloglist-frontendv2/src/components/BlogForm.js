import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

class BlogForm2 extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault()
        const inputField = e.target
        const blog = {
            title: inputField.title.value,
            author: inputField.author.value,
            url: inputField.url.value
        }

        await this.props.createBlog(blog, this.props.user)
        this.props.setNotification(`blog '${blog.title}' by ${blog.author} added`, 'info', 10)

        inputField.title.value = ''
        inputField.author.value = ''
        inputField.url.value = ''
    }

    render() {
        return (
            <div>
                <h2>Luo uusi blogi</h2>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        title
          <input name='title' />
                    </div>
                    <div>
                        author
          <input name='author' />
                    </div>
                    <div>
                        url
          <input name='url' />
                    </div>

                    <button type="submit">Luo</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    { createBlog, setNotification }
)(BlogForm2)