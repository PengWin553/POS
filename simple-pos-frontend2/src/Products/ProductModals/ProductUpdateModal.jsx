import {Modal} from 'react-bootstrap';

const ProductUpdateModal = ({
    showUpdateModal,
    makeUpdateModalAppear,
    productId,
    productName,
    price,
    stock,
    unit,
    sku,
    categoryId,
    setProductName,
    setPrice,
    setStock,
    setUnit,
    setSku,
    setCategoryId,
    categories,
    updateProduct,
    setVariablesToDefault
}) => {

    return(
        <>
            {/* Update Product */}
            <Modal show={showUpdateModal} onHide={makeUpdateModalAppear}>
            <Modal.Header closeButton onClick={setVariablesToDefault}>
                <b className='bold-color'>Update Product</b>
            </Modal.Header>
            <Modal.Body>
                <input type="hidden"
                    value={productId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    id="id"
                    readOnly
                />

                <label htmlFor="name">Name:</label>
                <input type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    id="name"
                    placeholder='Enter product name'
                />

                <label htmlFor="price">Price:</label>
                <input type="text"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    id="price"
                    placeholder='Enter price'
                />

                <label htmlFor="stock">Stock:</label>
                <input type="text"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value))}
                    id="stock"
                    placeholder='Enter stock'
                />

                <label htmlFor="unit">Unit:</label>
                <input type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    id="unit"
                    placeholder='Enter unit'
                />

                <label htmlFor="sku">SKU:</label>
                <input type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    id="sku"
                    placeholder='Enter SKU'
                />

                <label htmlFor="category">Category:</label>
               
                <select
                    value={categoryId}
                    onChange={(e) => {
                        setCategoryId(parseInt(e.target.value));
                    }}

                    id="category"
                >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                        <option key={c.categoryId} value={c.categoryId}>
                            {c.categoryName}
                        </option>
                    ))}
                </select>
                
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <button onClick={updateProduct} className="action-btn modal-btn">Save Changes</button>
            </Modal.Footer>
            </Modal>
        </>
    );
} 

export default ProductUpdateModal;