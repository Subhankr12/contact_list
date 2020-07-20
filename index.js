const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

const contactList = [
  {
    name: "Ravi",
    phone: "582345894",
  },
  {
    name: "Ram",
    phone: "582342439",
  },
  {
    name: "Raghu",
    phone: "582234255",
  },
];

app.get("/", (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      console.log("error in fetching contacts from db");
      return;
    }
    return res.render("home", {
      title: "ContactsList",
      contact_list: contacts,
    });
  });
});

app.post("/create-contact", (req, res) => {
  // contactList.push(req.body);
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    (err, newContact) => {
      if (err) {
        console.log("Error in creating a contact!");
        return;
      }
      console.log("*********", newContact);
      return res.redirect("back");
    }
  );
});

app.get("/delete-contact", (req, res) => {
  let id = req.query.id;

  Contact.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log("Error in deleting the contact!");
      return;
    }

    return res.redirect("back");
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error in running the server", err);
  }

  console.log("Server is up and running on Port: ", port);
});
