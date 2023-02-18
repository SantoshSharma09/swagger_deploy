const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/User.model")

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              name:
 *                  type: string
 *                  description: The username
 *              email:
 *                  type: string
 *                  description: The user email
 *              age:
 *                  type: integer
 *                  description: The user's age
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: This will get all the user data from the database
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: The list of all the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/User"
 */
userRouter.get("/",async (req,res)=>{
    const users=await UserModel.find()
    res.send(users)
})

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: To post the details of a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

userRouter.post("/create",async (req,res)=>{
    const payload=req.body
    const user=new UserModel(payload)
    await user.save()
    res.send({"msg":"New User has been created"})
})

/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     summary: To post the details of a new user
 *     tags: [Users]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user details has been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some server error
 */

userRouter.patch("/update/:id",async (req,res)=>{
    const id=req.params.id
    const payload=req.body
    await UserModel.findByIdAndUpdate({_id:id},payload)
    res.send({"msg":"User details have been updated"})
})

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

userRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id
    await UserModel.findByIdAndDelete({_id:id})
    res.send({"msg":"User has been deleted"})
})

module.exports={
    userRouter
}