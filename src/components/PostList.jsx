import React, { useEffect } from 'react';
import { useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useDeletePost } from '../hooks/mutations';
import { fetchPosts } from '../hooks/queries';
import { State } from "../StateProvider"
import PostContent from './PostContent';
import { useTranslation } from "react-i18next";

const PostList = () => {
    const {editingId, setEditingId, user} = State();
    const [showFilteredPosts, setShowFilteredPosts] = useState(false)
    const {data, isLoading, isError, isSuccess, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return nextPage <= 5 ? nextPage : undefined;
        }
    })

    const {t, i18n} = useTranslation();

    // sets pool of posts to display later
    const [allPosts, setAllPosts] = useState([]);

    // if data exists, update pool of posts
    useEffect(() => {
        if(data){
            setAllPosts(data.pages)
        }
    }, [data])

    // if there is a pool of posts and a selected user id, filter the posts
    const filteredPosts = useMemo(() => {
        if(user.userId){
            return allPosts.map(page => page.filter(post => post.userId === user.userId))
        }else{
            return allPosts
        }
    }, [allPosts, user.userId])

    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);

    const deletePostMutation = useDeletePost();
    const handleDelete = (id) => {
        deletePostMutation.mutate(id);
        setShowDeleteSuccessAlert(true);
        setTimeout(() => setShowDeleteSuccessAlert(false), 5000);
    }

    const handleEdit = (id) => {
        setEditingId(id)
    }

    const toggleUserPosts = () => {
        if(user.userId && !showFilteredPosts){
            // this just sets the user ID to 2 to simulate filtering
            setShowFilteredPosts(true)
        }else if (user.userId && showFilteredPosts){
            setShowFilteredPosts(false)
        }
    }

    if (isLoading) return <Spinner animation='border' role='status'><span className='visually-hidden'>{t('general.loadingMessage')}</span></Spinner>
    if (isError) return <Alert variant='danger'>{t('general.errorFetchMessage')}</Alert>

    return (
        <div className='bg-secondary'>
            <Button variant={showFilteredPosts ? 'success' : 'secondary'} onClick={() => toggleUserPosts()}>{t('general.userPostFilterButton')}</Button>
            {showDeleteSuccessAlert && <Alert variant="success">{t('general.deletedMessage')}</Alert>}
            <h1 className='text-light'>{t('general.dashboard')}</h1>
            {isSuccess && !showFilteredPosts && allPosts.map((page, index) => (
                <React.Fragment key={index}>
                    {page.map(post => (
                        <PostContent
                            post={post}
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                        />
                    ))}
                </React.Fragment>
            ))}
            {isSuccess && showFilteredPosts && filteredPosts.map((page, index) => (
                <React.Fragment key={index}>
                    {page.map(post => (
                        <PostContent
                            post={post}
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                        />
                    ))}
                </React.Fragment>
            ))}
            {hasNextPage && (
                <div className='d-flex justify-content-center'>
                    <Button variant='primary' disabled={isFetching} onClick={() => fetchNextPage()}>
                        {isFetching ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default PostList