import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'

describe.only('<Blog >', () => {
    let testBlog

    beforeAll(() => {
        testBlog = {
            "_id": "5a883657fc18f40c336a4783",
            "title": "Test blog",
            "author": "Test authr",
            "url": "testurl",
            "likes": 8,
            "__v": 0,
            "user": {
                "username": "testuser",
                "name": "admin",
                "adult": false
            }
        }
    })

    it('renders only author and title by default', () => {
        const blogComponent = shallow(<Blog blog={testBlog} />)

        const content=blogComponent.find('.titleLine')
        expect(content.getElement().props.style.display).toBe('')
        expect(content.text()).toContain(testBlog.author)
        expect(content.text()).toContain(testBlog.title)

        expect(content.text()).not.toContain(testBlog._id)
        expect(content.text()).not.toContain(testBlog.url)
        expect(content.text()).not.toContain(testBlog.likes)
        expect(content.text()).not.toContain(testBlog.user.name)

        const details=blogComponent.find('.details')
        expect(details.getElement().props.style.display).toBe('none')
    })

    it('renders all details when pressed', () => {
        const blogComponent = shallow(<Blog blog={testBlog} />)
        const titleLine = blogComponent.find('.titleLine')
        titleLine.simulate('click')

        const content=blogComponent.find('.titleLine')
        expect(content.getElement().props.style.display).toBe('none')


        const details=blogComponent.find('.details')
        expect(details.getElement().props.style.display).toBe('')

        expect(details.text()).toContain(testBlog.author)
        expect(details.text()).toContain(testBlog.title)

        expect(details.text()).toContain(testBlog.url)
        expect(details.text()).toContain(testBlog.likes)
        expect(details.text()).toContain(testBlog.user.name)
    })
})