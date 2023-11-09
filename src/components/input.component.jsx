import { useState } from 'react';
import {AiOutlineEyeInvisible} from 'react-icons/ai'

const InputBox = ({ name, type, id, value, placeholder, icon }) => {

    const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <div className="relative w-[100%] mb-4">
      <input
        type="text"
        name={name}
        type={type === "password" ? passwordVisible ? "text" : "password" : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      {icon}
      {
        type === "password" ? <AiOutlineEyeInvisible onClick={()=>setPasswordVisible(currentVal => !currentVal)} className='input-icon left-[auto] right-4 cursor-pointer'/> :""
      }
    </div>
  );
};

export default InputBox;
