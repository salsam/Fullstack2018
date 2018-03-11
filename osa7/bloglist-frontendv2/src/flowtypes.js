export type Blog = {
    title: string,
    author: string,
    url: string,
    likes: number,
    user: User,
    _id: string,
    comments: [string]
}

export type User = {
    name: string,
    username: string,
    adult: boolean,
    blogs: Blog[]
}

export type NotificationType = {
    type: string,
    message: string
}