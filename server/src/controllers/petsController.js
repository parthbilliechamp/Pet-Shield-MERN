/**
 * @author Shivangkumar Gandhi
**/

petsModel = require('../models/petsModel.js');


//Controller which calls the pets model to add pets.
exports.addPetsData = async (req, res) => {
    // res.send({
    //   code: 200,
    //   message: "Animal Added",
    //   token: "hfgdhg",
    // });
    try {
        const pets = await petsModel.addPets(req);
        res.status(200).json({ pets });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error while adding pets." });
    }
  };

//Controller which calls the pets model to get the list of pets to display it to the pet owner for booking appointment
exports.getPets = async (req, res) => {
    try {
        const pets = await petsModel.getPets();
        res.json({ pets });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error while fetching pets." });
    }
};

//Controller which calls the pets model to get the pet by its id.
exports.getPetById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    try {
        const pets = await petsModel.getPetById(id);
        if (vets) {
            res.status(200).json({ pets });
        } else {
            res.status(404).json({ error: "Pet not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error while fetching pet." });
    }
}

//Controller which calls the pets model to get the pet by its owner email.
exports.getPetByOwnerEmail = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ error: "Owner email id is required" });
    }
    try {
        const pets = await petsModel.getPetByOwnerEmail(email)
        if (pets) {
            res.status(200).json({ pets });
        } else {
            res.status(404).json({ error: "Pet/s not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error while fetching pet/s" });
    }
}

//Controller to add or update the pets medical data and insurance data 
exports.updatePet = async (req, res) => {
    const id = req.params.id;
    const updatedPetData = req.body
    try {
        const result = await petsModel.updatePet(id, updatedPetData);
        return res.json({ result });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error while updating pet data." });
    }
}

exports.updatePetInsurance = async (req, res) => {
    const id = req.params.id;
    const updatedPetData = req.body
    try {
        const result = await petsModel.updatePetInsurance(id, updatedPetData);
        return res.json({ result });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error while updating pet data." });
    }
}

exports.deletePetRecord = async (req, res) => {
    const petId = req.params.id;
    try {
        const deleteResult = await petsModel.deleteOne( petId );
        if (deleteResult.deletedCount === 1) {
            return res.status(200).json({ message: "Pet deleted successfully" });
        } else {
            return res.status(404).json({ error: "Pet not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error while deleting pet" });
    }
}


