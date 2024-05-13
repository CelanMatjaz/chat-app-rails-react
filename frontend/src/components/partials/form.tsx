import React, { PropsWithChildren } from 'react'

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void

};

export const Form: React.FC<PropsWithChildren<Props>> = (props) => {
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.onSubmit(e);
    }

    return (
        <div className="form">
            <form onSubmit={submit}>
                {props.children}
            </form>
        </div>
    )
}
