import mongoose from "mongoose";

export default () => {
  mongoose.connect(process.env.DB)
    .then(() => console.log("Connected to database successfully"))
    .catch(error => {
      console.error(error);
      console.log("Could not connect to the database!");
    });
};
