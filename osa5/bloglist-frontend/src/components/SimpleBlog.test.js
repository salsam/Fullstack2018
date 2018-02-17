import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog >', () => {
    let testBlog

    beforeAll(() => {
        testBlog = {
            author: 'Author test',
            title: 'Test title',
            likes: 42
        }
    })

    it('renders content correct', () => {
        const blogComponent = shallow(<SimpleBlog blog={testBlog} onClick={() => true} />)

        const generalInfo = blogComponent.find('.general')
        expect(generalInfo.text()).toContain('Author test')
        expect(generalInfo.text()).toContain('Test title')

        const likes = blogComponent.find('.likes')
        expect(likes.text()).toContain('blog has 42 likes')
    })

    it('clicking button twice calls callback twice', () => {
        const mockHandler = jest.fn()
        const blogComponent = shallow(<SimpleBlog blog={testBlog} onClick={mockHandler} />)

        const button=blogComponent.find('button')
        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(1)
        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})