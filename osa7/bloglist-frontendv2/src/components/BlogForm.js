import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

class BlogForm extends React.Component {
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

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>title</label>
                        <input name='title' />
                    </Form.Field>
                    <Form.Field>
                        <label>author</label>
                        <input name='author' />
                    </Form.Field>
                    <Form.Field>
                        <label>url</label>
                        <input name='url' />
                    </Form.Field>

                    <Button type="submit">Luo</Button>
                </Form>
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
)(BlogForm)