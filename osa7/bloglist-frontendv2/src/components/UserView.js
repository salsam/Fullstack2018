// @flow
import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import type { User } from '../flowtypes'

type funArg = { users: User[] };
const UserView = ({ users }: funArg) => {
  if (!users) return <div></div>
  return (
    <div>
      <h2>users</h2>
      <Table striped celled columns={2}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>username</Table.HeaderCell>
            <Table.HeaderCell>blogs added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default UserView