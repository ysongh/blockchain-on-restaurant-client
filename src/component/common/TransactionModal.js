import React from 'react';

const TransactionModal = ({ transactionHash }) => {
    return(
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h3 className="text-center">Success, <a href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                            {transactionHash.substring(0, 10) + '...' + transactionHash.substring(56, 66)}
                        </a></h3>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;