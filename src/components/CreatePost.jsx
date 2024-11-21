import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Col, Row, Form, Button, Modal } from "react-bootstrap";
import { State } from "../StateProvider"
import PostForm from "./PostForm";
import { postPost } from "../hooks/queries";
import { useTranslation } from "react-i18next";

const CreatePost = () => {
    const {showCreatePost, setShowCreatePost} = State();
    const queryClient = useQueryClient();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const {t, i18n} = useTranslation();

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: postPost,
        onSuccess: (data) => {
            setShowSuccessAlert(true);
            console.log('Post added with ID:', data.id);
            queryClient.invalidateQueries(['posts']);
            setTimeout(() => setShowSuccessAlert(false), 5000)
        }
    })

    const handleCreate = (post) => {
        mutate(post)
        handleClose()
    }

    const handleClose = () => {
        setShowCreatePost(false)
    }

    return (
        <div>
            {isError && <Alert variant="danger">{t('general.errorMessage')} {error.message}</Alert>}
            {showSuccessAlert && <Alert variant="success">{t('general.postMessage')}</Alert>}
            {showCreatePost === true && 
                <Modal show={showCreatePost} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{t('form.createPostLabel')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PostForm 
                            onSubmit={handleCreate}
                            initialValue={false}
                            startString={t('form.postButton')}
                            progressString={t('form.postingMessage')}
                            isLoading={isLoading}
                        />
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}

export default CreatePost;