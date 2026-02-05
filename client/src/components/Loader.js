import React from 'react';

function Loader() {
    return (
        <div style={{ marginTop: '150px' }}>
            <div className="sweet-loading text-center">
                <div className="spinner-border text-primary" role="status" style={{ height: '100px', width: '100px' }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default Loader;