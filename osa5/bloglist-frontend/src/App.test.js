import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App >', () => {
    let app

    describe('when user not logged in ', () => {
        beforeEach(() => {
            app = mount(<App />)
            localStorage.clear()
        })

        it('shows only login screen when not logged in', () => {
            app.update()
            expect(app.text()).not.toContain('dsfsdgsg')
            expect(app.text()).not.toContain('qss5cv')

            expect(app.text()).toContain('Login')
            expect(app.text()).toContain('username')
            expect(app.text()).toContain('password')
        })
    })

    describe('when user logged in ', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                id: '12334434',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }

            localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('shows all blogs when logged in', () => {
            app.update()

            expect(app.text()).toContain('dsfsdgsg')
            expect(app.text()).toContain('qss5cv')
        })
    })
})