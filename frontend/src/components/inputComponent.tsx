import React from 'react';
import { InputDefaultProps } from '../interface/InputDefaultProps.interface';

export const InputDefault: React.FC<InputDefaultProps> = ({ value, onChange, placeholder }) => {
    return (
        <input className="c-form__input theme-ghost ps-3 mx-1" placeholder={placeholder} type="text" value={value} onChange={(e) => onChange(e.target.value)} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required />
    )
}

export const InputSub: React.FC<InputDefaultProps> = ({ value, onChange, placeholder }) => {
    return (
        <input className="br-100 poppins-bold fs-6 border-none theme-snow ps-3 h-3em w-100" placeholder={placeholder} type="text" value={value} onChange={(e) => onChange(e.target.value)} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required />
    )
}
// developed with ❤️ by Luis