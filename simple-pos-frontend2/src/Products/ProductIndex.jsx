import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

// import ProductAddModal
import ProductAddModal from './ProductModals/ProductAddModal.jsx';

// import ProductUpdateModal
import ProductUpdateModal from './ProductModals/ProductUpdateModal.jsx';

// import ProductDeleteModal
import ProductDeleteModal from './ProductModals/ProductDeleteModal.jsx';
import API_BASE_URL from '../config.js';

const Products = () => {
    // get Products to display
    const [products, setProducts] = useState([]);

    // handle individual variables
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [unit, setUnit] = useState('');
    const [sku, setSku] = useState('');
    const [categoryId, setCategoryId] = useState('');

    // get Categories to display
    const [categories, setCategories] = useState([]);

    // set loading...
    const [loading, setLoading] = useState(true);

    // Add Modal
    const [showAddModal, setShowAddModal] = useState(false);
    const makeAddModalAppear = () => setShowAddModal(!showAddModal);

    // Update Modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const makeUpdateModalAppear = () => setShowUpdateModal(!showUpdateModal);

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const makeDeleteModalAppear = () => setShowDeleteModal(!showDeleteModal);

    // Fetch Products
    const getProducts = async () => {
        const response = await fetch(
            API_BASE_URL+
            "/api/ProductApi/GetProducts"
        );

        const result = await response.json();
        console.log(result); // Add this line to check the API response
        setProducts(result);
    }

    // Fetch Categories
    const getCategories = async () => {
        const response = await fetch(
            API_BASE_URL+
            "/api/CategoryApi/GetCategories"
        );

        const result = await response.json();
        setCategories(result);
    }

    // update browser in case of database updates
    useEffect(() => {
        const fetchData = async () => {
            await getProducts();
            await getCategories();
            setLoading(false);
        };
        fetchData();
    }, []);

    // Helper function to get category name
    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.categoryId === categoryId);
        return category ? category.categoryName : 'Unknown';
    };

    // Cleanup variables to default
    const setVariablesToDefault = () => {
        setProductId('');
        setProductName('');
        setPrice('');
        setStock('');
        setUnit('');
        setSku('');
        setCategoryId('');
    }

    // handle selected data
    const handleSelectedData = async (productId, productName, price, stock, unit, sku, categoryId) => {
        setProductId(productId);
        setProductName(productName);
        setPrice(price);
        setStock(stock);
        setUnit(unit);
        setSku(sku);
        setCategoryId(categoryId);
    }

    // Add Product
    const saveProduct = async () => {
        const dataToSend = {
            "ProductName": productName,
            "Price": price,
            "Stock": stock,
            "Unit": unit,
            "Sku": sku,
            "CategoryId": categoryId,
        }
    
        const response = await fetch(
            API_BASE_URL+
            "/api/ProductApi/SaveProduct", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }
            
        );
    
        if (response.ok) {
            await getProducts();
            makeAddModalAppear();
            setVariablesToDefault();
            toast.success('Product saved successfully');
        } else {
            toast.error('Failed to save product');
        }
    }

    // Update Product
    const updateProduct = async () => {
        const dataToSend = {
            "productName": productName,
            "price": price,
            "stock": stock,
            "unit": unit,
            "sku": sku,
            "categoryId": categoryId,
        }

        const response = await fetch(
            API_BASE_URL+
            "/api/ProductApi/UpdateProduct?Id=" + productId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }
        );

        if (response.ok) {
            await getProducts();
            makeUpdateModalAppear();
            setVariablesToDefault();
            toast.success('Product updated successfully');
        } else {
            toast.error('Failed to update product');
        }
    }

    // Delete Product
    const deleteProduct = async () => {
        const response = await fetch(
            API_BASE_URL+
            "/api/ProductApi/DeleteProduct?Id=" + productId,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            await getProducts();
            makeDeleteModalAppear();
            setVariablesToDefault('');
            toast.success('Product deleted successfully');
        } else {
            toast.error('Failed to delete product');
        }
    }

    // if the browser is still loading data
    if (loading) return <center><h1>Loading</h1></center>

    return (
        <>
            {/* Add Product */}
            <ProductAddModal
                showAddModal={showAddModal}
                makeAddModalAppear={makeAddModalAppear}
                productName={productName}
                price={price}
                stock={stock}
                unit={unit}
                sku={sku}
                categoryId={categoryId}
                setProductName={setProductName}
                setPrice={setPrice}
                setStock={setStock}
                setUnit={setUnit}
                setSku={setSku}
                setCategoryId={setCategoryId}
                categories={categories}
                saveProduct={saveProduct}
            />

            {/* Update Product */}
            <ProductUpdateModal
                showUpdateModal={showUpdateModal}
                makeUpdateModalAppear={makeUpdateModalAppear}
                productId={productId}
                productName={productName}
                price={price}
                stock={stock}
                unit={unit}
                sku={sku}
                categoryId={categoryId}
                setProductName={setProductName}
                setPrice={setPrice}
                setStock={setStock}
                setUnit={setUnit}
                setSku={setSku}
                setCategoryId={setCategoryId}
                categories={categories}
                updateProduct={updateProduct}

                setVariablesToDefault={setVariablesToDefault}
            />

            {/* Delete Product */}
            <ProductDeleteModal
                showDeleteModal={showDeleteModal}
                makeDeleteModalAppear={makeDeleteModalAppear}
                productId={productId}
                productName={productName}
                deleteProduct={deleteProduct}
            />
            
            <div className="crud-content-container">
                {/* Show Add Product Modal */}
                <div className="add-client-btn-container">
                    <button className="action-btn add-client-btn" onClick={makeAddModalAppear}>Add New Product</button>
                </div>

                {/* Display All Product Data */}
                <div className="table-container">
                    <div className="fixTableHead" style={{backgroundColor: '#eaebeb'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Unit</th>
                                    <th>Sku</th>
                                    <th>Category</th>
                                    <th className='action-btn-row-container'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) =>
                                    <tr key={p.productId}>
                                        <td>{p.productId}</td>
                                        <td>{p.productName}</td>
                                        <td>{p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.unit}</td>
                                        <td>{p.sku}</td>
                                        <td>{getCategoryName(p.categoryId)}</td>
                                        <td className='action-btn-container-display'>
                                            <button className="action-btn row-btn update-client-btn" onClick={() => { handleSelectedData(p.productId, p.productName, p.price, p.stock, p.unit, p.sku, p.categoryId); makeUpdateModalAppear() }}>Update</button>
                                            <button className="action-btn row-btn delete-client-btn" onClick={() => { handleSelectedData(p.productId, p.productName); makeDeleteModalAppear() }}>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Toaster expand={true} richColors position='bottom-right' className='mr-8'></Toaster>
        </>
    );
}

export default Products;