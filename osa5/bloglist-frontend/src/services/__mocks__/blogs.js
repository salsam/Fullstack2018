let token = null

const blogs = [
    {
        _id: "5a885500463c062947913af3",
        title: "dadsad",
        author: "dsfsdgsg",
        url: "fdsgsgs",
        likes: 22,
        user: {
            _id: "5a883616fc18f40c336a4782",
            username: "root",
            name: "admin"
        }
    },
    {
        _id: "5a885506463c062947913af4",
        title: "qss5cv",
        author: "qf5vsg",
        url: "vdbdf47",
        likes: 23,
        user: {
            _id: "5a883616fc18f40c336a4782",
            username: "root",
            name: "admin"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (newToken) => {
    token=newToken;
}

export default { getAll, blogs, setToken }