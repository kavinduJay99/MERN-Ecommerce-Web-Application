import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md"; 
import AdminEditProduct from './AdminEditProduct';
import displaySLCurrency from '../helpers/displaySLCurrency';
import SummaryApi from '../common';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: SummaryApi.deleteProduct.method,
                credentials : "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: data._id })
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            await fetchdata(); // Refresh the product list after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className='bg-white p-4 rounded-lg border shadow-xl relative'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <div className='w-fit mr-2 p-1 text-red-600 hover:bg-red-600 rounded-full hover:text-white cursor-pointer mt-2 absolute right-0 top-0' 
                         onClick={handleDelete}>
                        <MdDelete />
                    </div>
                    <img src={data?.productImage[0]} 
                         width={120} 
                         height={120} 
                         className='w-fit mx-auto ml-9'/>   
                </div> 
                <h1 className='text-ellipsis line-clamp-1'>{data.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {displaySLCurrency(data.sellingPrice)}
                    </p>

                    <div className='w-fit ml-auto p-1 rounded-lg font-bold text-black hover:bg-blue-400 hover:text-white cursor-pointer' 
                         onClick={() => setEditProduct(true)}>
                        <MdEdit />
                    </div>
                </div>
            </div>
            
            {
                editProduct && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center'>
                        <div className='bg-white p-4 rounded-lg shadow-lg'>
                            <AdminEditProduct productData={data} 
                                              onClose={() => setEditProduct(false)} 
                                              fetchdata={fetchdata} />
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default AdminProductCard;
