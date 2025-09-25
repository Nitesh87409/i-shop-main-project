import { axiosInstance } from "./helper";

// it show all the data from category api except whose deletedAt a not null.
const getCategories = () => {
    return axiosInstance.get(`/category`)
        .then(
            (response) => {
                return response.data.categories;
            }
        ).catch(
            (error) => {
                return error;
            }
        )
}

// it fetch data from temporary deleted data from api
const getTrashedCategories = async () => {
    return await axiosInstance.get(`/category/get-trashed`)
        .then(
            (response) => {
                return response.data.categories;
            }
        ).catch(
            (error) => {
                return error;
            }
        )
}

// this function help to read those data whose have id given in link 
const getCategoriesbyId = async (id) => {
    return await axiosInstance.get(`/category/${id}`)
        .then(
            (response) => {
                return response.data.category;
            }
        ).catch(
            (error) => {
                return error;
            }
        )
}

// it show all the data from product api except whose deletedAt a not null.
// const getProducts = async () => {
//     return await axiosInstance.get(`/product`)
//         .then(
//             (response) => {
//                 return response.data.products;
//             }
//         ).catch(
//             (error) => {
//                 return error;
//             }
//         )
// }

// this function help to read those data whose have id given in link 
const getProductsbyId = async (id) => {
    // console.log(id);

    return await axiosInstance.get(`/product/${id}`)
        .then(
            (response) => {
                return response.data.product;
            }
        ).catch(
            (error) => {
                return error;
            }
        )
}

const getColors = async () => {
    return await axiosInstance.get(`/color`)
        .then(
            (response) => {
                return response.data.colors;
            }
        ).catch(
            (error) => {
                return error;
            }
        )
}



const GetColorByID = async (id) => {
    return await axiosInstance.get(`/color/${id}`)
        .then(
            (response) => {
                return response.data.color
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const ColorTrash = async () => {
    return await axiosInstance.get("/color/get-trashed")
        .then(
            (response) => {
                return response.data.colors
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const ProductTrash = async () => {
    return await axiosInstance.get("/product/trash")
        .then(
            (response) => {
                return response.data.products
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


// get Product by category, range and color in store page

const getProducts = async (category = null, range = null, color = null) => {
    const searchQuery = new URLSearchParams()
 
    
    if (category != null) {
        searchQuery.append("category", category)
    }
    if (range != null) {
        if (range.min < range.max) {
            searchQuery.append("min", range.min)
            searchQuery.append("max", range.max)
        }
    }
    if (color != null) {
        searchQuery.append("color", color)
    }
    // console.log("searchQuery", searchQuery);
    
    return await axiosInstance.get(`/product?${searchQuery.toString()}`)
    .then(
        (response) => {
            return response.data.products
        }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getUserData = async () => {
    return await axiosInstance.get("/user")
        .then(
            (response) => {
                return response.data.users
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


//  admin api call
const getAdminData = async () => {
    return await axiosInstance.get("/admin")
        .then(
            (response) => {
                return response.data.admins
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


const AdminTrash = async () => {
    return await axiosInstance.get("/admin/getTrashed")
        .then(
            (response) => {
                return response.data.admins
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getAllOrders = async () => {
    return await axiosInstance.get("/order")
        .then(
            (response) => {
                return response.data.orders
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


export { getCategories, getTrashedCategories, getCategoriesbyId, getProducts, getProductsbyId, getColors, GetColorByID, ColorTrash, ProductTrash, getUserData , getAdminData, AdminTrash, getAllOrders };