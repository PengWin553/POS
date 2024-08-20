import { Modal } from 'react-bootstrap';

const ProductAddModal = ({
    showAddModal,
    makeAddModalAppear,
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
    saveProduct
}) => {

    function GenerateSKU() {
        const getFirstTwoLetters = (str) => str?.substring(0, 2).toUpperCase() || '';
        const selectedCategory = categories.find(c => c.categoryId === categoryId);
        
        const namePart = getFirstTwoLetters(productName);
        const unitPart = getFirstTwoLetters(unit);
        const categoryPart = getFirstTwoLetters(selectedCategory?.categoryName);
        const randomDigits = Math.floor(100 + Math.random() * 900);

        setSku(`${namePart}${unitPart}${categoryPart}-${randomDigits}`);
    }

    return (
        <Modal show={showAddModal} onHide={() => makeAddModalAppear(false)}>
            <Modal.Header closeButton>
                <b className='bold-color'>New Product</b>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        id="name"
                        placeholder='Enter product name'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        id="price"
                        placeholder='Enter price'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(parseInt(e.target.value))}
                        id="stock"
                        placeholder='Enter stock'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="unit">Unit:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        id="unit"
                        placeholder='Enter unit'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sku">SKU:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            id="sku"
                            placeholder='Enter SKU'
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={GenerateSKU}>
                                Generate
                            </button>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        id="category"
                    >
                        <option value="">Select category</option>
                        {categories.map((c) => (
                            <option key={c.categoryId} value={c.categoryId}>
                                {c.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => makeAddModalAppear(false)}>
                    Close
                </button>
                <button className="btn btn-primary" onClick={saveProduct}>
                    Save Product
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductAddModal;
