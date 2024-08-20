import {Modal} from 'react-bootstrap';

const CategoryDeleteModal = ({
    showDeleteModal,
    makeDeleteModalAppear,
    categoryId,
    categoryName,
    deleteCategory
}) => {
    return(
        <>
            <Modal show={showDeleteModal} onHide={makeDeleteModalAppear}>
            <Modal.Header closeButton>
                <h3 className="delete-modal-title"><b>Are you sure you want to delete this?</b></h3>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="name" className='delete-label-styles'>Name: <span className='delete-data-text'>{categoryName}</span> </label>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => deleteCategory(categoryId)} className="action-btn modal-btn">Confirm Deletion</button>
            </Modal.Footer>
        </Modal>
        </>
    );
} 

export default CategoryDeleteModal;