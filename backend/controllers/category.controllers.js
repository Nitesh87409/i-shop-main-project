
const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");

const { body } = require("express-validator");
const CategoryController = {
    async read(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                const category = await CategoryModel.findById(id);
                res.send({
                    flag: 1,
                    category
                })
            } else {
                //{ deletedAt: null }).sort({ createdAt: - 1 } this code help to read only those  category whose category deleted at value is null .
                const categories = await CategoryModel.find({ deletedAt: null }).sort({ createdAt: - 1 });
                const data =[];
                const allPromises = categories.map(
                    async (cat)=>{
                        const ProductCount = await ProductModel.find({category:cat._id}).countDocuments()
                        data.push({
                            ...cat.toJSON(),
                            ProductCount
                        })
                    }
                )
                await Promise.all(allPromises)
                res.send(
                    {
                        flag: 1,
                        categories:data
                    }
                )
            }

        } catch (error) {
            res.send({
                flag: 0,
                error:error.message,
                message: "Internal Server Error"
            })
        }
    },

    async readTrashed(req, res) {
        try {
                // readTrashed categories find those categories whose deletedAt is not null and sort it 
                const categories = await CategoryModel.find({ deletedAt: {$ne: null} }).sort({ createdAt: - 1 });
                res.send({
                    flag: 1,
                    categories
                })


        } catch (error) {
            res.send({
                flag: 0,
                message: "Internal Server Error"
            })
        }
    },

    async create(req, res) {
        try {
            const { name, slug } = req.body;
            const CategoryExist = await CategoryModel.findOne({ name: name });
            // body("name").isEmpty().withMessage("Name is Required");
            // body("slug").isEmpty().withMessage("Slug is Required");
            if (CategoryExist) {
                res.send({
                    flag: 0,
                    message: "Category Already Exist"
                })
            } else {
                const category = new CategoryModel({ name, slug });
                category.save()
                    .then(
                        (success) => {
                            res.send({
                                flag: 1,
                                message: "Category Created"
                            })
                        }
                    ).catch(
                        (error) => {
                            res.send({
                                flag: 0,
                                message: "Unable to Create Category"
                            }
                            )
                        }
                    )
            }
        }
        catch {
            console.log(error.message);

            res.send({
                flag: 0,
                message: "Internal Server Error"
            })
        }
    },

    async categoryExists(req, res) {
        try {
            const { name } = req.params;
            const category = await CategoryModel.findOne({ name });


            if (category) {
                res.send({
                    flag: 0
                })
            } else {
                res.send({
                    flag: 1,
                })
            }
        } catch (error) {
            res.send({
                message: "Internal server error",
                flag: 0
            })
        }
    },


    // this function help to edit category name and update it 
    async update(req, res) {
       try{
        const {id} = req.params;
        const data = req.body;
        const category = await CategoryModel.findByIdAndUpdate({_id:id}, {name:data.name, slug:data.slug});
        if(category){
            res.send({
                flag: 1,
                message:"Category Updated"
            })
        }else{
            res.send({
                flag: 0,
                message:"Category Not Found"
            })
        }
       }catch(error){
        res.send({
            message: "Internal server error",
            error:error.message,
            flag: 0
        })
       }
    },
    async ToggleStatus(req, res) {
        try {
            // take id and new_status from link
            const { id, new_status } = req.params;
            await CategoryModel.updateOne(
                {
                    _id: id
                },
                {
                    status: new_status
                }
            )
            res.send(
                {
                    flag: 1,
                    message: "Status Changed"
                }
            )
        } catch (error) {
            res.send(
                {
                    message: "Internal Server Error",
                    flag: 0,
                    error: error.message
                }
            )
        }
    },
    //Move to Trash  Controller
    async MovetoTrash(req, res) {
        try {
            const { id } = req.params;
            // console.log(id);
            
            // Update the document with the specified _id by setting the 'deletedAt' field to the current date and time in ISO format.
            await CategoryModel.findByIdAndUpdate(
                { _id: id },
                { deletedAt: new Date().toISOString() }
            );
            res.send(
                {
                    flag: 1,
                    message: "Move to Trash"
                }
            )
        } catch (error) {
            res.send(
                {
                    message: "Internal Server Error",
                    flag: 0,
                    error: error.message
                }
            )
        }
    },
    //permanent Delete Controller
     delete(req, res) {
       try {
        const {id} = req.params;
        CategoryModel.deleteOne({_id:id})
        .then(
            ()=>{
                res.send(
                    {
                        flag: 1,
                        message: "Category Deleted"
                    }
                )
            }
        ).catch(
            ()=>{
                res.send(
                    {
                        flag: 0,
                        message: "Unable to Delete Category"
                    }
                )
            }
        )
       } catch (error) {
        res.send(
            {
                message: "Internal Server Error",
                flag: 0,
                error: error.message
            }
        )
       }

    },
   async restore(req,res){
    try {
        const { id } = req.params;
        // Update the document with the specified _id by setting the 'deletedAt' field to null
        await CategoryModel.updateOne(
            { _id: id },
            { deletedAt: null }
        );
        res.send(
            {
                flag: 1,
                message: "Restore Category"
            }
        )
    } catch (error) {
        res.send(
            {
                message: "Internal Server Error",
                flag: 0,
                error: error.message
            }
        )
    }
    }
}

module.exports = CategoryController;