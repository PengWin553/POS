import { Modal } from 'react-bootstrap';

const TransactionDetailsModal = ({
    showModal,
    makeShowModalAppear,
    productDetails,
    totalPayment,
    transactionDate,
}) => {
    return(
        <>
            {/* Modal to display product details */}
            <Modal show={showModal} onHide={makeShowModalAppear}>
                <Modal.Header closeButton>
                    <b className='bold-color'>Transaction Details</b>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                       <tbody>
                            {(productDetails || []).map((product, index) => (
                                <tr key={index}>
                                    <td>{product.productName}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Body>
                    <div className="footer-container">
                        <p> <b>Total: </b> ${totalPayment} </p>
                        <p> <b>Date: </b> {transactionDate} </p>
                    </div>
                </Modal.Body>
            </Modal>        
        </>
    );  
}

export default TransactionDetailsModal;