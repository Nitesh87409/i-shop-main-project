
const { log } = require("console");
const { getNewFileName } = require("../helper");
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");
const ColorModel = require("../models/color.model");
const fs = require("fs");

const ProductController = {
  // async read(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const {category} = req.query;
  //     console.log("searchQuery", req.query);
  //     const filterQuery = {deletedAt: null};
  //     if (category) {
  //       const catagory = await CategoryModel.findOne({slug:
  //         category
  //       });
  //       if(catagory){
  //         filterQuery.category = catagory._id;
  //       }
  //     }
      
  //     if (id) {
  //       const product = await ProductModel.findById(id).populate(["category", "color"]);
  //       res.send(
  //         {
  //           flag: 1,
  //           product
  //         }
  //       )
  //     } else {
  //       //{ deletedAt: null }).sort({ createdAt: - 1 } this code help to read only those  products whose deleted at value is null .
  //       const products = await ProductModel.find(filterQuery).populate(["category", "color"]);
  //       // console.log(products);
  //       res.send(
  //         {
  //           flag: 1,
  //           products
  //         }
  //       )
  //     }
  //   } catch (error) {
  //     res.send(
  //       {
  //         flag: 0,
  //         message: "Internal Server Error",
  //         error: error.message
  //       }
  //     )
  //   }
  // },

  async read(req, res) {
    const query = req.query;

    // console.log(query.color);
    
    const filterQuery = {}
    if (query.category) {
        const category = await CategoryModel.find({ slug: query.category })
        const categoryID = category.map(cat => cat._id)
        filterQuery["category"] = { $in: categoryID }
    }
    if (query.min != null && query.max != null) {
        filterQuery['discounted_price'] = {
            $gte: Number(query.min),
            $lte: Number(query.max)
        }
    }
    
    if (query.color) {
        const colors = await ColorModel.find({ slug: { $in: query.color?.split(",") } });

        
        
        const colorID = colors.map(col => col._id)
        filterQuery['color'] = { $in: colorID }
        
    }
    // console.log("Filter query is",filterQuery);
    try {
        const { id } = req.params;
        if (id) {
            const product = await ProductModel.findById(id).populate(['category', 'color'])
            res.send(
                {
                    flag: 1,
                    product
                }
            )
        } else {
            const products = await ProductModel.find({ $and: [filterQuery, { deletedAt: null }] }).populate(["category", "color"])
            res.send(
                {
                    flag: 1,
                    products
                }
            )
        }
    } catch (error) {
        res.send(
            {
                flag: 0,
                message: "Internal Server Error"
            }
        )
    }
},
  async create(req, res) {
    try {
      // console.log(req.body)
      const image = req.files.main_image
      // console.log("IMage",req.files.main_image)
      const data = {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        color: JSON.parse(req.body.color),
        original_price: req.body.orignal_price,
        discounted_price: req.body.discounted_price,
        discount_percentage: req.body.discount_percentage
      }
      // console.log("Data", data)

      const newName = getNewFileName(image.name)

      const destination = './public/images/product/' + newName

      image.mv(
        destination,
        (error) => {
          if (error) {
            res.send(
              {
                flag: 0,
                message: "Something Went Wrong"
              }
            )
          } else {
            data.main_image = newName;
            const product = new ProductModel({ ...data })
            product.save()
              .then(
                (success) => {
                  res.send(
                    {
                      flag: 1,
                      message: "Product Created"
                    }
                  )
                }
              ).catch(
                () => {
                  res.send(
                    {
                      flag: 0,
                      message: "Unable to create Product"
                    }
                  )
                }
              )
          }
        }
      )

    } catch (error) {
      // console.log(error.message)
      res.send(
        {
          flag: 0,
          message: "Internal Server Error"
        }
      )

    }
  },
  async uploadOtherImages(req, res) {
    try {

      const { id } = req.params;
      // console.log(id);

      let other_images = Array.isArray(req.files.other_images) ? req.files.other_images : [req.files.other_images];
      // console.log(other_images);

      const other_images_name = [];
    
      for (let other_image of other_images) {
        const newName = getNewFileName(other_image.name);
        const destination = "./public/images/product/other_images/" + newName;
        await other_image.mv(destination);
        other_images_name.push(newName);
      }
      const product = await ProductModel.findById(id);
      const product_other_images = product.other_images;
      const updated_names = [...product_other_images, ...other_images_name];
      product.other_images = updated_names
      await product.save();
      res.send({ flag: 1, message: "Images Uploaded", other_images: updated_names })
    } catch (error) {
      res.send(
        {
          flag: 0,
          message: "Internal server Error",
          error: error.message
        }
      )
    }
  },
  async deleteOtherImages(req, res) {
    try {
      const id = req.params.id
      // console.log(id,"OtherImages Id")
      const index = req.params.index
      // console.log("id", id);
      // console.log("index", index);


      const product = await ProductModel.findById(id);
      const other_images = product.other_images;
      // console.log(other_images)
      const image_name = other_images[index]
      console.log("Image Name", image_name);

      await fs.unlinkSync("./public/images/product/other_images/" + image_name);
      other_images.splice(index, 1)
      console.log(other_images)
      product.other_images = other_images
      await product.save()
      res.send({ flag: 1, message: "Image Deleted", other_images: product.other_images })
    } catch (error) {
      console.log(error.message)
      res.send(
        {
          flag: 0,
          message: "Internal server Error",
          error: error.message
        }
      )
    }

  },
  async update(req, res) {
    try {
        const { id } = req.params
        const product = await ProductModel.findById(id)
        if (!product) return res.send({ flag: 0, message: "Invalid Product ID" })
        const image = req.files?.main_image ?? null
        let colors;
        try {
            colors = JSON.parse(req.body.color)
        } catch (error) {
            throw new Error("Color is Not Defiend")
        }
        const data = {
            name: req.body.name,
            slug: req.body.slug,
            category: req.body.category,
            color: colors,
            original_price: req.body.orignal_price,
            discounted_price: req.body.discounted_price,
            discount_percentage: req.body.discount_percentage
        }
        console.log(data);
        
        if (image != null) {
            const newName = getNewFileName(image.name)
            const destination = './public/images/product/' + newName
            await image.mv(destination)
            data.main_image = newName
        }
        await ProductModel.updateOne({ _id: id }, data)
        if (image != null && product.main_image) {
            await fs.unlinkSync(`./public/images/product/${product.main_image}`)
        }
        res.send(
            {
                flag: 1,
                message: "Product Updated Successfully"
            }
        )
    } catch (error) {
        res.send(
            {
                flag: 0,
                message: "Internal Server Error"
            }
        )
    }
},
async toggleStatus(req, res) {
  try {
    // take id and new_status from link
    const { id, new_status } = req.params;
    await ProductModel.updateOne(
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
      await ProductModel.findByIdAndUpdate(
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
// read trashed

async readTrashed(req, res) {
  try {
      const products = await ProductModel.find({ deletedAt: { $ne: null } })
      
          .sort({ deletedAt: -1 })
          .populate(["category", "color"]);
      res.send(
          {
              flag: 1,
              products
              
              
          }
      )
      // console.log(products);
  } catch (error) {
      res.send(
          {
              flag: 0,
              message: "Internal server Error"
          }
      )
  }
},

// Delete Controller
async delete(req, res) {
  try {
      const { id } = req.params;
      const product = await ProductModel.findOne({ _id: id });

      if (product) {
          // Delete main image if exists
          if (product.main_image) {
              try {
                  await fs.unlinkSync(`./public/images/product/${product.main_image}`);
              } catch (error) {
                  console.log(`Error deleting main image: ${error.message}`);
              }
          }

          // Delete other images if exist
          const other_image = product.other_images;
          if (other_image) {
              if (Array.isArray(other_image)) {
                  for (let prod_other of other_image) {
                      try {
                          await fs.unlinkSync(`./public/images/product/other-images/${prod_other}`);
                      } catch (error) {
                          console.log(`Error deleting other image (${prod_other}): ${error.message}`);
                      }
                  }
              } else {
                  try {
                      await fs.unlinkSync(`./public/images/product/other-images/${other_image}`);
                  } catch (error) {
                      console.log(`Error deleting other image: ${error.message}`);
                  }
              }
          }

          // Delete product from the database
          await ProductModel.findByIdAndDelete(id);

          res.send({
              flag: 1,
              message: "Product Deleted Successfully",
          });
      } else {
          res.send({
              flag: 0,
              message: "Product not found",
          });
      }
  } catch (error) {
      // console.log(error.message);
      res.send({
          flag: 0,
          message: "Internal Server Error",
      });
  }
},
// Restore Controller
async Restore(req, res) {
  try {
      const { id } = req.params;

      await ProductModel.updateOne(
          { _id: id },
          {
              deletedAt: null
          }
      ).then(
          () => {
              res.send(
                  {
                      flag: 1,
                      message: "Restore Category"
                  }
              )
          }
      ).catch(
          () => {
              res.send(
                  {
                      flag: 0,
                      message: "Unable To Restore"
                  }
              )
          }
      )
  } catch (error) {
      res.send(
          {
              flag: 0,
              message: "Internal Server Error"
          }
      )
  }
},
    // async productCategory(req, res) {
    //     try {
    //         const category_slug = req.params.slug;
    //         if (!category_slug) return res.send({ message: "Wrong Category Name" })
    //         else {
    //             const category = await CategoryModel.findOne({ slug: category_slug })
    //             if (category) {
    //                 const products = await ProductModel.find({ category: category._id })
    //                 res.send(
    //                     {
    //                         flag: 1,
    //                         products
    //                     }
    //                 )
    //             } else {
    //                 res.send(
    //                     {
    //                         flag: 0,
    //                         message: "Unable to get Product",
    //                         products: []
    //                     }
    //                 )
    //             }

    //         }
    //     } catch (error) {
    //         res.send(
    //             {
    //                 message: "Internal Server Error",
    //                 flag: 0
    //             }
    //         )
    //     }
    // },

}





module.exports = ProductController;