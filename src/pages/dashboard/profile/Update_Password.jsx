import React, { useState } from 'react'

const Update_Password = () => {

 const [formData, setFormData] = useState({
    new_password: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
      <div className='space-y-3'>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">New Password</p>
        <input
          type="text"
          name="new_password"
          value={formData.new_password}
          onChange={handleChange}
          className="w-96 py-3 text-black px-2 outline-0 text-md rounded-md bg-light-blue"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Confirm new password</p>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-96 py-3 text-black px-2 outline-0 text-md rounded-md bg-light-blue"
        />
      </div>
    </div>
  )
}

export default Update_Password