import { useState, useEffect } from 'react';
import creeperHead from '../assets/creeperhead.png';
import 'boxicons';
import { Toaster, toast } from 'sonner';
import API_BASE_URL from '../config';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [checkOut, setCheckOut] = useState([]);

    const getProducts = async () => {
        const response = await fetch(API_BASE_URL + "/api/ProductApi/GetProducts");
        const result = await response.json();
        setProducts(result);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleSelectProduct = (product) => {
        if (product.stock === 0) {
            toast.error(`${product.productName} is out of stock!`);
            return;
        }

        setCheckOut((prevCheckOut) => {
            const existingProduct = prevCheckOut.find(item => item.productId === product.productId);
            if (existingProduct) {
                return prevCheckOut.filter((item) => item.productId !== product.productId);
            } else {
                return [...prevCheckOut, { ...product, quantity: 1 }];
            }
        });
    };

    const handleQuantityChange = (productId, change) => {
        setCheckOut(prevCheckOut =>
            prevCheckOut.map(item => {
                if (item.productId === productId) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity > item.stock) {
                        toast.error(`Cannot add more than ${item.stock} to the cart.`);
                        return item; // Return the item without changes
                    } else if (newQuantity < 1) {
                        return { ...item, quantity: 1 }; // Ensure quantity does not go below 1
                    } else {
                        return { ...item, quantity: newQuantity };
                    }
                }
                return item;
            })
        );
    };

    const calculateTotal = () => {
        const total = checkOut.reduce((total, item) => total + item.price * item.quantity, 0);
        return total.toFixed(2);
    };

    const updateProductStocks = async (products) => {
        const updateData = products.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        const response = await fetch(API_BASE_URL + "/api/ProductApi/UpdateProductStocks", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    };

    const saveTransaction = async () => {
        const transactionAmount = calculateTotal();
    
        const transactionResponse = await fetch(API_BASE_URL + "/api/TransactionHistoryApi/SaveTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                transactionDate: new Date().toLocaleString('en-US'),
                totalAmount: transactionAmount,
            })
        });
    
        if (transactionResponse.ok) {
            const transaction = await transactionResponse.json();
            const transactionId = transaction[0]?.transactionId;
    
            if (transactionId) {
                const transactionProducts = checkOut.map(item => ({
                    transactionId,
                    productId: item.productId,
                    quantity: item.quantity
                }));
    
                const productResponse = await fetch(API_BASE_URL + "/api/TransactionProductApi/SaveTransactionProductsBatch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(transactionProducts)
                });
    
                if (productResponse.ok) {
                    const stockUpdateSuccess = await updateProductStocks(checkOut);
    
                    if (stockUpdateSuccess) {
                        await getProducts();
                        toast.success('Transaction saved successfully');
                        setCheckOut([]);
                    } else {
                        toast.error('Failed to update stock for some products');
                    }
                } else {
                    toast.error('Failed to save transaction products');
                }
            } else {
                toast.error('Failed to retrieve transaction ID');
            }
        } else {
            toast.error('Failed to save transaction');
        }
    };

    return (
        <>
            <div className="content-container">
                <div className="card-content-container">
                    <div className="card-container">
                        {products.map((p) => (
                            <label
                                key={p.productId}
                                className={`product-card ${p.stock === 0 ? 'out-of-stock' : ''}`}
                                htmlFor={`checkbox-${p.productId}`}
                                onClick={() => p.stock > 0 && handleSelectProduct(p)}
                            >
                                <img src={creeperHead} alt="a creeper head" />
                                <h3 className='product-name'>{p.productName}</h3>
                                <p className='product-price'>${p.price}</p>
                                <p className='product-price'>Stock: {p.stock}</p>
                                <input
                                    id={`checkbox-${p.productId}`}
                                    type="checkbox"
                                    checked={checkOut.some(item => item.productId === p.productId)}
                                    onChange={() => handleSelectProduct(p)}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="checkOutContainer">
                    <h4 className='checkout-title'><strong>Checkout</strong></h4>

                    {checkOut.length > 0 ?
                        (
                            <>
                                <div className="fixTableHead">
                                    <table className="checkout-table">
                                        <thead className='thead'>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {checkOut.map(item => (
                                                <tr key={item.productId}>
                                                    <td>{item.productName}</td>
                                                    <td>${item.price}</td>
                                                    <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                        <i className='bx bxs-minus-circle bx-quantity-icon' onClick={() => handleQuantityChange(item.productId, -1)} />
                                                        <span>{item.quantity}</span>
                                                        <i className='bx bxs-plus-circle bx-quantity-icon' onClick={() => handleQuantityChange(item.productId, 1)} />
                                                    </td>
                                                    <td>
                                                        <i className='bx bxs-trash bx-trash' onClick={() => setCheckOut(checkOut.filter(i => i.productId !== item.productId))} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="foot">
                                    <div className="total-container">
                                        <h6 colSpan="3"><strong>Total:</strong></h6>
                                        <h6>${calculateTotal()}</h6>
                                    </div>
                                    <div className="checkout-btn-container">
                                        <button className='checkout-btn' onClick={saveTransaction}>Checkout</button>
                                    </div>
                                </div>
                            </>
                        )
                        : (
                            <div style={{ textAlign: 'center', padding: '30px' }}>
                                No products selected yet!
                            </div>
                        )
                    }
                </div>
            </div>
            
            <Toaster expand={true} richColors position='bottom-right' className='mr-8'></Toaster>
        </>
    );
};

export default Dashboard;
