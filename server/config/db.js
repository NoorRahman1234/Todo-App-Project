import mongoose from 'mongoose';

const uri = "mongodb+srv://rahmanafr0123_db_user:rfvgbH5BRcoRxkci@cluster0.s9u5g2n.mongodb.net/?appName=Cluster0";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Atlas connected!"))
.catch(err => console.error("Connection error:", err));