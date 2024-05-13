import React from 'react'
import { createPortal } from 'react-dom'

interface Props {
    minWidth?: number,

    onClose: () => void
};

export const Modal: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const { minWidth } = props;
    const { onClose } = props;

    return createPortal(
        <>
            {createPortal(<div onClick={onClose} className="modal-background"></div>, document.body)}
            <div className="modal" style={{ minWidth: minWidth ? `${minWidth}px` : 'auto' }}>
                <div className="modal-content">
                    {props.children}
                </div>
                <button className="button" onClick={onClose}>Close</button>
            </div>

        </>,
        document.body);
}
