import {Modal} from 'react-bootstrap';

const CategoryUpdateModal = ({
    showUpdateModal,
    makeUpdateModalAppear,
    categoryId,
    categoryName,
    setCategoryId,
    setCategoryName,
    updateCategory
}) => {

    return(
        <>
            {/* Update Category */}
            <Modal show={showUpdateModal} onHide={makeUpdateModalAppear}>
                <Modal.Header closeButton>
                    <b className='bold-color'>Update Category</b>
                </Modal.Header>
                <Modal.Body>
                    {/* <label htmlFor="id">Id:</label> */}
                    <input type="hidden"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        id="id"
                        readOnly
                    />

                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        id="name"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={updateCategory} className="action-btn modal-btn" >Update Category</button>
                </Modal.Footer>
            </Modal>
        </>
    );
} 

export default CategoryUpdateModal;