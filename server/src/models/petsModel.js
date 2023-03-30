/**
 * @author Shivangkumar Gandhi
*/

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//defining schema for the pets collection
const petSchema = new mongoose.Schema({
    _id: { type: ObjectId, required: true },
    type: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    certificate_number: { type: Number, required: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    pet_owner: {
        _id: { type: ObjectId, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        phone: { type: String, required: true },
    },
    medical_record: {
        date_of_diagnosis: { type: String, required: true },
        diagnosis: { type: String, required: true },
        medical_prescriptions: { type: String, required: true },
        pet_vaccines: { type: String, required: true }
    }
});

const pet = mongoose.model("pets", petSchema);

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
    const petList = await pet.find({ "pet_owner.email": email })
    return petList
}

//modify the pet details by adding or updating medical record
exports.updatePet = async (id, updatePetData) => {
    const result = await pet.findByIdAndUpdate(
        id,
        updatePetData,
        {
            new: true
        }
    );
    return result
}