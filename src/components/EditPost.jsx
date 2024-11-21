import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Col, Row, Form, Button, Modal, Spinner } from "react-bootstrap";
import { State } from "../StateProvider"
import PostForm from "./PostForm";
import { fetchPost, updatePost } from "../hooks/queries";
import { useTranslation } from "react-i18next";

const EditPost = () => {
    const {editingId, setEditingId} = State();
    const queryClient = useQueryClient();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const {t, i18n} = useTranslation();

    const {data: post, isPending} = useQuery({
        queryKey: ['posts', editingId],
        queryFn: () => fetchPost(editingId)
    })

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: updatePost,
        onSuccess: (data) => {
            setShowSuccessAlert(true);
            console.log('Post updated with ID:', data.id);
            queryClient.invalidateQueries(['posts']);
            setTimeout(() => setShowSuccessAlert(false), 5000)
        }
    })

    const handleUpdate = (post) => {
        mutate(post)
        handleClose()
    }

    const handleClose = () => {
        setEditingId(false)
    }

    if (isPending) return <Spinner animation='border' role='status'><span className='visually-hidden'>{t('general.loadingMessage')}</span></Spinner>

    return (
        <div>
            {isError && <Alert variant="danger">{t('general.errorMessage')} {error.message}</Alert>}
            {showSuccessAlert && <Alert variant="success">{t('general.savedMessage')}</Alert>}
            {editingId && !isPending &&
                <Modal show={editingId} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{t('form.editPostLabel')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PostForm 
                            onSubmit={handleUpdate}
                            initialValue={post}
                            startString={t('form.saveButton')}
                            progressString={t('general.updatingMessage')}
                            isLoading={isLoading}
                        />
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}

export default EditPost;