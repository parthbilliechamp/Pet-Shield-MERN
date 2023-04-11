/**
 * @author Jaivik Tailor
 */
const bcrypt = require("bcrypt");
const petOwnerModel = require("../models/pet_ownerModel");
const { vet, getVets, getVetById } = require("../models/vetsModel");
const adminModel =require("../models/adminModel");
const nodemailer = require("nodemailer");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN;
const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  sessionToken: sessionToken,
  region: region,
});

const store_image_on_s3_and_get_url = async (file) => {
  const params = {
    Bucket: bucketName,
    Key: `petshield/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };

  const s3Response = await s3.upload(params).promise();
  console.log(s3Response);

  console.log(`File uploaded to S3 at ${s3Response.Location}`);
  return s3Response.Location;
};

module.exports.adminLogin = (req,res) => {
    adminModel.findOne({ email: req.body.email })
      .then((user) => {
        // Find the user by email
        if (!user) {
          // If user is not found, send error response
          res.send({ code: 404, message: "User not found" });
        } else {
          if (req.body.password === user.password) {
            // If the passwords match, send success response
            res.send({
              userDetails:user,
              //email: user.email,
              code: 200,
              message: "User found",
            });
          } else {
            // If passwords don't match, send error response
            res.send({ code: 404, message: "Incorrect email or password" });
          }
        }
      })
      .catch((err) => {
        // If there was an error, send error response
        res.send({ code: 500, message: "Server error" });
      });
};  
module.exports.register = async (req, res) => {
  console.log(req.body);

  try {
    // Check if the email already exists in the database

    let newUser = null;

    if (req.body.userType == "petowner") {
      const user = await petOwnerModel.findOne({ email: req.body.email });
      if (user) {
        // If email exists, send error response
        return res.send({ code: 400, message: "Email already registered" });
      }
      // If email doesn't exist, create a new user
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
      newUser = new petOwnerModel({
        email: req.body.email,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        password: hashedPassword, // Store the hashed password
        phone: req.body.phone,
      });
    } else if (req.body.userType == "vets") {
      const user = await vet.findOne({ email: req.body.email });
      if (user) {
        // If email exists, send error response
        return res.send({ code: 400, message: "Email already registered" });
      }
      const s3_url = await store_image_on_s3_and_get_url(req.file);
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password

      newUser = new vet({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword, // Store the hashed password
        license_number: req.body.license_number,
        qualification: req.body.qualification,
        experience: req.body.experience,
        clinic_address: req.body.clinic_address,
        clinic_license_number: req.body.clinic_license_number,
        fees: req.body.fees,
        rating: req.body.rating,
        clinic_name: req.body.clinic_name,
        status: req.body.status,
        photo: s3_url,
      });
    }
    // Save the new user to the database
    await newUser.save();
    res.send({ Code: 200, message: "Register Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ code: 500, message: "Registration Error" });
  }
};

module.exports.login = (req, res) => {
  console.log(req.body.email);

  if (req.body.userType == "petowner") {
    petOwnerModel
      .findOne({ email: req.body.email })
      .then((user) => {
        // Find the user by email
        if (!user) {
          // If user is not found, send error response
          res.send({ code: 404, message: "User not found" });
        } else {
          // Compare the hashed password with the provided password
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              // If there was an error, send error response
              res.send({ code: 500, message: "Server error" });
            } else if (!result) {
              // If passwords don't match, send error response
              res.send({ code: 404, message: "Incorrect email or password" });
            } else {
              // If passwords match, send success response

              // req.session.userId = user._id;;
              // console.log(req.session);
              // send session information to frontend
              // res.json({
              //     userId: req.session.userId,
              //     userType : req.body.userType,
              // });
              res.cookie("cookieName", 1010, {
                maxAge: 900000,
                httpOnly: true,
              });
              res.send({
                userDetails: user,
                email: user.email,
                userType: req.body.userType,
                code: 200,
                message: "User found",
                // token: 'hfgdhg',
                //session: req.session
              });
            }
          });
        }
      })
      .catch((err) => {
        // If there was an error, send error response
        res.send({ code: 500, message: "Server error" });
      });
  } else if (req.body.userType == "vets") {
    vet
      .findOne({ email: req.body.email })
      .then((user) => {
        // Find the user by email
        if (!user) {
          // If user is not found, send error response
          res.send({ code: 404, message: "User not found" });
        } else {
          // Compare the hashed password with the provided password
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              // If there was an error, send error response
              res.send({ code: 500, message: "Server error" });
            } else if (!result) {
              // If passwords don't match, send error response
              res.send({ code: 404, message: "Incorrect email or password" });
            } else {
              // If passwords match, send success response
              res.send({
                email: user.email,
                userType: req.body.userType,
                code: 200,
                message: "User found",
                token: "hfgdhg",
                _id: user._id,
              });
            }
          });
        }
      })
      .catch((err) => {
        // If there was an error, send error response
        res.send({ code: 500, message: "Server error" });
      });
  }
};

module.exports.sendotp = async (req, res) => {
  console.log(req.body);
  const _otp = Math.floor(100000 + Math.random() * 900000);
  console.log(_otp);

  if (req.body.userType == "petowner") {
    let user = await petOwnerModel.findOne({ email: req.body.email });
    // send to user mail
    if (!user) {
      res.send({ code: 500, message: "user not found" });
    }

    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);
    let transporter = nodemailer.createTransport({
      // name: 'ethereal.com' ,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "petshield1234@gmail.com",
        pass: "bcyjzrwtndadgouu",
      },
    });

    let info = await transporter.sendMail({
      from: "petshield1234@gmail.com",
      to: req.body.email, // list of receivers
      subject: "OTP", // Subject line
      text: String(_otp),
      html: `<html>
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Pet Shield</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Use the following OTP to reset your password.</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${_otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />Pet Shield</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Petshield</p>
                <p>Dalhosuie University</p>
                <p>Nova Scotia, Canada</p>
              </div>
            </div>
          </div>
       </html > `,
    });

    if (info.messageId) {
      console.log(info, 84);
      petOwnerModel
        .updateOne({ email: req.body.email }, { otp: _otp })
        .then((result) => {
          res.send({
            userType: req.body.userType,
            code: 200,
            message: "otp send",
          });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    } else {
      res.send({ code: 500, message: "Server err" });
    }
  } else if (req.body.userType == "vets") {
    let user = await vet.findOne({ email: req.body.email });
    // send to user mail
    if (!user) {
      res.send({ code: 500, message: "user not found" });
    }

    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);
    let transporter = nodemailer.createTransport({
      // name: 'ethereal.com' ,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "petshield1234@gmail.com",
        pass: "bcyjzrwtndadgouu",
      },
    });

    let info = await transporter.sendMail({
      from: "petshield1234@gmail.com",
      to: req.body.email, // list of receivers
      subject: "OTP", // Subject line
      text: String(_otp),
      html: `<html>
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Pet Shield</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Use the following OTP to reset your password.</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${_otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />Pet Shield</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Petshield</p>
                <p>Dalhosuie University</p>
                <p>Nova Scotia, Canada</p>
              </div>
            </div>
          </div>
       </html > `,
    });

    if (info.messageId) {
      console.log(info, 84);
      vet
        .updateOne({ email: req.body.email }, { otp: _otp })
        .then((result) => {
          res.send({ code: 200, message: "otp send" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    } else {
      res.send({ code: 500, message: "Server err" });
    }
  }
};

module.exports.submitotp = (req, res) => {
  console.log(req.body);
  if (req.body.userType == "petowner") {
    petOwnerModel
      .findOne({ otp: req.body.otp })
      .then((result) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.send({ code: 500, message: "Server err" });
          } else {
            petOwnerModel
              .updateOne({ email: result.email }, { password: hash })
              .then((result) => {
                res.send({ code: 200, message: "Password updated" });
              })
              .catch((err) => {
                res.send({ code: 500, message: "Server err" });
              });
          }
        });
      })
      .catch((err) => {
        res.send({ code: 500, message: "otp is wrong" });
      });
  } else if (req.body.userType == "vets") {
    vet
      .findOne({ otp: req.body.otp })
      .then((result) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.send({ code: 500, message: "Server err" });
          } else {
            vet
              .updateOne({ email: result.email }, { password: hash })
              .then((result) => {
                res.send({ code: 200, message: "Password updated" });
              })
              .catch((err) => {
                res.send({ code: 500, message: "Server err" });
              });
          }
        });
      })
      .catch((err) => {
        res.send({ code: 500, message: "otp is wrong" });
      });
  }
};



