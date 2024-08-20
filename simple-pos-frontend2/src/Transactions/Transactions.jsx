import { useState, useEffect } from 'react';
import API_BASE_URL from '../config.js';
import TransactionDetailsModal from './TransactionModals/TransactionDetailsModal.jsx';

const Transactions = () => {

    // get Categories to display
    const [transactionHistory, setTransactionHistory] = useState([]);

    // set loading...
    const [loading, setLoading] = useState(true);

    // handle individual variables
    const [productDetails, setProductDetails] = useState([]);

    // Modal state
    const [showModal, setShowModal] = useState(false);

    // Show Modal
    const makeShowModalAppear = () => setShowModal(!showModal);

    // handle individual variables
    const [totalPayment, setTotalPayment] = useState(0);
    const [transactionDate, setTransactionDate] = useState('');

    // Fetch all transaction history
    const getTransactionHistory = async () => {
        const response = await fetch(
            API_BASE_URL +
            "/api/TransactionHistoryApi/GetAllTransactionHistory"
        );

        const result = await response.json();
        setTransactionHistory(result);
        setLoading(false);
    }

    // Fetch specific transaction history's details
    const getTransactionDetails = async (id) => {
        const response = await fetch(
            API_BASE_URL +
            "/api/TransactionProductApi/GetTransactionProducts?transactionId=" + id,
        );

        const result = await response.json();
        setProductDetails(result);
        setShowModal(true);
        setLoading(false);
    }

    // set summary of transaction in modal
    const setSummary = (totalPayment, transactionDate) =>{
        setTotalPayment(totalPayment);
        setTransactionDate(transactionDate);
    }

    // update browser in case of database updates
    useEffect(() => {
        getTransactionHistory();
    }, []);

    // if the browser is still loading data
    if (loading) return <center><h1>Loading</h1></center>

    return (
        <>
            {/* Show Transacton Details Modal */}
            <TransactionDetailsModal
                showModal={showModal}
                makeShowModalAppear={makeShowModalAppear}
                productDetails={productDetails}
                totalPayment={totalPayment}
                transactionDate={transactionDate}
            />

            {/* Display All Transaction History Data */}
            <div className="crud-content-container">
                <br></br>
                <strong><h5>Transaction History</h5></strong>
                <br></br>
                <div className="table-container">
                    <div className="fixTableHead Narrow" style={{backgroundColor: '#eaebeb'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>TransactionDate</th>
                                    <th>TotalPayment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionHistory.map((th) =>
                                    <tr key={th.transactionId}>
                                        <td>{th.transactionId}</td>
                                        <td>{th.transactionDate}</td>
                                        <td>${th.totalAmount}</td>
                                        <td className='action-btn-container-display'>
                                            <button className="action-btn row-btn update-client-btn" onClick={() => {getTransactionDetails(th.transactionId), setSummary(th.totalAmount, th.transactionDate)}}>View</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Transactions;
