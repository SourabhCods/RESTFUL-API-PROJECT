const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const app = express();
// const multer=require("multer");


const port = 8080;

const methodOverride = require("method-override");

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));

// Setting up Multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads'); // Specify the directory to save the files
//     },
//     filename: (req, file, cb) => {
//         cb(null, uuidv4() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

/*making default path for 'views folder'--> iska matlab jab bhi views folder ke liye
search kiya jayega toh hamesha vo (api project/backend) directory ke andar hi milega*/

app.set("views" ,path.join(__dirname,"/views"));

app.set("view engine","ejs")

//for storing all static files(CSS and JS files or more) , we must have a public folder in our directory

app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine","ejs");

app.listen(port , ()=>{
    console.log(`Server listening to your request at ${port}`);
})


let instaPosts = [
    {
        id : uuidv4(),
        username : "saurav_20_goel_",
        caption : "Attended a seminar eith Google Cloud Team",
        icon:"https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/BlogHeader_Set2_D_IdY07VY.png",
        image : "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/BlogHeader_Set2_D_IdY07VY.png"

    },
    {
        id : uuidv4(),
        username : "Aaridhi_59",
        caption : "Top Interview Question for your Technical Rounds",
        icon:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fa-letter-ah-aha-alphabet-language-1708752%2F&psig=AOvVaw0mpirXMHaDOoJN2Boyw_T7&ust=1702230152621000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCqxtfzgoMDFQAAAAAdAAAAABAD",
        image:"https://media.geeksforgeeks.org/wp-content/uploads/20230419180619/Top-100-dsa-interview-questions-copy.webp"
    },
    {
        id : uuidv4(),
        username : "goenka_karan_97",
        caption : "Startups growing Rapidly 🚀",
        icon:"",
        image:"https://blog.ipleaders.in/wp-content/uploads/2021/07/startup-with-Company-Suggestion-1-1.jpg"

    }

]

//HOme page
app.get("/home",(req , res)=>{
    res.render("home.ejs");
    


})

//(Show or Read or View) all posts
app.get("/post" , (req , res)=>{
    res.render("show.ejs", {instaPosts});

})

//Creating a new Post
app.get("/newpost", (req, res)=>{
    res.render("newpost.ejs");

})

app.post("/post" , (req,res)=>{
    let id = uuidv4();
    let {username , caption}=req.body;
    console.log(req.body);
    instaPosts.push({username , caption , id});
    res.redirect("/post");
})

app.get("/post/:id", (req,res)=>{
    let {id} = req.params;
    let singlepost = instaPosts.find((p) => id == p.id);
    res.render("view.ejs", {singlepost});
})

// Edit a post
app.patch("/post/:id" , (req ,res)=>{
    let {id}=req.params;
    let newCaption = req.body.caption;
    let singlepost = instaPosts.find((p)=>id===p.id);
    singlepost.caption=newCaption;
    res.redirect("/post");

})

app.get("/post/:id/edit", (req , res)=>{
    let {id}=req.params;
    let singlepost = instaPosts.find((p)=>id===p.id);
    res.render("edit.ejs", {singlepost});
})

app.delete("/post/:id/" , (req,res)=>{
    let {id} =req.params;
    instaPosts=instaPosts.filter((p)=> p.id != id);
    res.redirect("/post");
})

