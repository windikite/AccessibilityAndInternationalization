
export const fetchPost = async (postId) => {
    if(postId){
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        if(!response.ok){
            throw new Error('Failed to fetch post')
        }
        return response.json()
    }else{
        return {
            id: 'temp data',
            title: 'temp data',
            body: 'temp data'
        }
    }
}

export const fetchPosts = async ({pageParam = 1}) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/?_limit=50&_page=${pageParam}`)
    if(!response.ok){
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export const postPost = async (post) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    if(!response.ok) {
        throw new Error('Failed to add new post')
    }
    return response.json();
}

export const deletePost = async (postId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
    })
    if(!response.ok){
        throw new Error('Failed to delete post')
    }
    return response.json()
}

export const updatePost = async (post) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    if(!response.ok) {
        throw new Error('Failed to add new post')
    }
    return response.json();
}