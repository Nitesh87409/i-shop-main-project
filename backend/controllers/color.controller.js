const ColorModal = require("../models/color.model")
const mongoose = require('mongoose');


const ColorController = {
    async readTrashed(req, res) {
        try {
            const colors = await ColorModal.find({ deletedAt: { $ne: null } }).sort({ deletedAt: -1 })
            res.send(
                {
                    flag: 1,
                    colors
                }
            )
        } catch (err) {
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async read(req, res) {
        try {
            const id = req.params.id;
            if (id) {
                const color = await ColorModal.findById(id)
                res.send(
                    {
                        flag: 1,
                        color
                    }
                )
            } else {
                const colors = await ColorModal.find({ deletedAt: null }).sort({ createdAt: -1 })
                res.send(
                    {
                        flag: 1,
                        colors
                    }
                )
            }
        } catch (err) {
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async colorExist(req, res) {
        try {
            const { name } = req.params;
            if (name) {
                const color = await ColorModal.findOne({ name: name })
                if (color) {
                    res.send(
                        {
                            flag: 0,
                            message: "Color Already Exist"
                        }
                    )
                } else {
                    res.send(
                        {
                            flag: 1,
                            message: ""
                        }
                    )
                }

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
            const { name, code} = req.body;
            console.log("color",req.body);
            const ColorExists = await ColorModal.findOne({ name: name })
            if (ColorExists) {
                res.send(
                    {
                        flag: 0,
                        message: "Color already Exists"
                    }
                )
            } else {
                const CreateColor = new ColorModal({ name, code:code })
                CreateColor.save()
                    .then(
                        (success) => {
                            res.send(
                                {
                                    flag: 1,
                                    message: "Color Created"
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            res.send(
                                {
                                    flag: 0,
                                    message: `${error.message}`
                                }
                            )
                        }
                    )
            }
        } catch (err) {
            res.send(
                {
                    flag: 0,
                    message: `${err.message}`
                }
            )
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const color = await ColorModal.findByIdAndUpdate(
                { _id: id }, { name: data.name, code: data.code }
            )
            if (color) {
                res.send(
                    {
                        flag: 1,
                        message: "Color Updated"
                    }
                )
            } else {
                res.send(
                    {
                        flag: 0,
                        message: "Unable to Update Color"
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
    async toggleStatus(req, res) {
        try {
            // take id and status from link
            const { id, status } = req.params;
            await ColorModal.updateOne(
                {
                    _id: id
                },
                {
                    status: status
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
    async moveTrash(req, res) {
        try {
            const { id } = req.params;

            await ColorModal.updateOne(
                { _id: id },
                {
                    deletedAt: new Date().toISOString()
                }
            ).then(
                () => {
                    res.send(
                        {
                            flag: 1,
                            message: "Move To Trash"
                        }
                    )
                }
            ).catch(
                () => {
                    res.send(
                        {
                            flag: 0,
                            message: "Unable To Trash"
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
    async Restore(req, res) {
        try {
            const { id } = req.params;

            await ColorModal.updateOne(
                { _id: id },
                {
                    deletedAt: null
                }
            ).then(
                () => {
                    res.send(
                        {
                            flag: 1,
                            message: "Restore Color"
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
    delete(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                ColorModal.deleteOne({ _id: id })
                    .then(
                        (success) => {
                            res.send(
                                {
                                    flag: 1,
                                    message: "Color Deleted Successfully"
                                }
                            )
                        }
                    ).catch(
                        (err) => {
                            console.log(err.message)
                            res.send(
                                {
                                    flag: 0,
                                    message: "Unable To Delete Color"
                                }
                            )
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

    }
}


module.exports = ColorController;