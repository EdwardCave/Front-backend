import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const InputField = (({type,placeholder,name,handleChange,address})=>(
    <input className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required/>
))
const AddAddress =() =>{
    const {axios,user,navigate} = useAppContext();
    const [address,setAddress] = useState({
        firstName:"",
        lastName:"",
        street:"",
        city:"",
        state:"",
        country:"",
        zipCode:"",
        email:"",
        phone:"",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    }
    const onSubmitHandler = (e) => {

        
        e.preventDefault()
        try {
            const {data} = axios.post("/api/address/add",{
                address
            })

            if(data.success){
                toast.success(data.message)
                navigate("/cart")
            }else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(!user){
            navigate('/cart')
        }
    },[])
    return (
        <div className="mt-16 pb-16">
            <p className="text-2xl md:text-3xl text-gray-500">Add Shipping
                <span className="font-semibold text-primary">Address</span>
            </p>
            <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
                <div className="flex-1 max-w-md">
                    <form action="" onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField handleChange={handleChange} name="firstName" placeholder="First Name" type="text" address={address}/>
                            <InputField handleChange={handleChange} name="lastName" placeholder="Last Name" type="text" address={address}/>
                        </div>
                        <InputField handleChange={handleChange} name="street" placeholder="Street Address" type="text" address={address}/>
                        <InputField handleChange={handleChange} name="email" placeholder="email" type="text" address={address}/>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField handleChange={handleChange} name="city" placeholder="City" type="text" address={address}/>
                            <InputField handleChange={handleChange} name="state" placeholder="State" type="text" address={address}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField handleChange={handleChange} name="country" placeholder="Country" type="text" address={address}/>
                            <InputField handleChange={handleChange} name="zipCode" placeholder="Zip Code" type="text" address={address}/>
                        </div>
                        <InputField handleChange={handleChange} name="phone" placeholder="Phone" type="text" address={address}/>
                        <button type="submit" className="w-full py-3 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                            Save Address
                        </button>
                    </form>
                </div>
                <img src={assets.add_address_image} className="md:mr-16 mb-16 md:mt-0"  alt="Add Address" />

            </div>

           
        </div>
    )
}
export default AddAddress;