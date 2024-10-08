const mongoose = require("mongoose");
const connectionDb = async () => {
  await mongoose.connect(
    "mongodb+srv://shashankbackend807:q0eewsEOCHl9xFwC@cluster0.gapr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

connectionDb()
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });
