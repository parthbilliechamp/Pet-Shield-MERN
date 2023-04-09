/**
 * @author Shivangkumar Gandhi
 */

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//defining schema for the pets collection
const petSchema = new mongoose.Schema({
 // _id: { type: ObjectId, required: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  certificate_number: { type: Number, required: true },
  gender: { type: String, required: true },
  name: { type: String, required: true },
  pet_owner: {
    _id: { type: ObjectId },
    email: { type: String },
    password: { type: String},
    first_name: { type: String},
    last_name: { type: String},
    phone: { type: String},
  },
  medical_record: {
    date_of_diagnosis: { type: String },
    diagnosis: { type: String },
    medical_prescriptions: { type: String},
    pet_vaccines: { type: String },
  },
  insurance: {
    _id: { type: ObjectId },
    name: { type: String},
    amount: { type: String},
    coverage_limit: { type: Number},
    coverage_period: { type: String},
    insurance_provider: { type: String},
  },
});

const pet = mongoose.model("pets", petSchema);

//add the list of all the pets to the database
exports.addPets = async (req) => {
  try {
    
    const petName = req.body.petName;
    const petType = req.body.petType;
    const petBreed = req.body.petBreed;
    const petAge = req.body.petAge;
    const petCertificateNumber = req.body.petCertificateNumber;
    const petGender = req.body.petGender;
    pet_owner = req.body.pet_owner;

    const newPet = new pet({ name: petName, type: petType, breed:petBreed, age:petAge, 
      certificate_number: petCertificateNumber, gender:petGender , pet_owner: pet_owner});
    const savedPet = await newPet.save();
    return savedPet;
  } catch (err) {
    throw err;
  }
};

//get the list of all the pets from the database
exports.getPets = async () => {
  const petList = await pet.find({});
  return petList;
};

//get the pet by id from the database.
exports.getPetById = async (id) => {
  const petList = await pet.findById(id);
  return petList;
};

//get the pet by owner email from the database.
exports.getPetByOwnerEmail = async (email) => {
  const petList = await pet.find({ "pet_owner.email": email });
  return petList;
};

//modify the pet details by adding or updating medical record
exports.updatePet = async (id, updatePetData) => {
  const result = await pet.findByIdAndUpdate(id, updatePetData, {
    new: true,
  });
  return result;
};

exports.deleteOne = async (id) => {
  const deleteResult = await pet.deleteOne({ _id: id });
  return deleteResult
};

//modify the pet details by adding or updating medical record
exports.updatePetInsurance = async (id, updatedPetData) => {
  // Check if the insurance object exists in the request body
  if (updatedPetData.insurance) {
    // If the insurance object exists, update or add it to the pet document
    const result = await pet.findByIdAndUpdate(
      id,
      { $set: { insurance: updatedPetData.insurance } },
      { new: true }
    );
    return result;
  } else {
    // If the insurance object does not exist, simply update the pet document
    const result = await pet.findByIdAndUpdate(id, updatedPetData, {
      new: true,
    });
    return result;
  }
};

