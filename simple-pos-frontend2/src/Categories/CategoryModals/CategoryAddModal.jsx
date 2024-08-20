import {Modal} from 'react-bootstrap';

const CategoryAddModal = ({
    showAddModal,
    makeAddModalAppear,
    categoryName,
    setCategoryName,
    saveCategory
}) => {

    return(
        <>
            {/* Add Category */}
            <Modal show={showAddModal} onHide={makeAddModalAppear}>
            <Modal.Header closeButton>
                <b className='bold-color'>New Category</b>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    id="name"
                    placeholder='Enter category name'
                />
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <button onClick={saveCategory} className="action-btn modal-btn">Save Category</button>
            </Modal.Footer>
            </Modal>
        </>
    );
} 

export default CategoryAddModal;