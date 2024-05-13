import React from 'react'

interface Props {
    errors: string[];
};

export const Errors: React.FC<Props> = ({ errors }) => {
    return (
        <ul className="errors-container mb-2">
            {errors.map(e => <li className="error">{e}</li>)}
        </ul>
    )
}
