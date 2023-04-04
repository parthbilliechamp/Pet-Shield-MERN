/**
 * @author Parth Champaneria
 */

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//defining availability schema
const availabilitySchema = new mongoose.Schema({
  time_slots: { type: Object, required: true },
  vet: { type: Object, required: true },
});

//defining the MongoDB schema
const availability = mongoose.model("availabilities", availabilitySchema);

//interacts with the database to get the availabilities of the vet
exports.getAvailabilityByVetId = async (vetId, date) => {
  const formattedDate = date.replace("%20", " ");
  const vetFilteredObject = await availability.findOne({ "vet._id": vetId });

  const filteredTimeSlots = vetFilteredObject.time_slots.filter((timeSlot) => {
    return timeSlot.date === formattedDate;
  });

  const availableTimeSlots = filteredTimeSlots.flatMap((timeSlot) => {
    return timeSlot.time.filter((time) => {
      return time.availability === 1;
    });
  });

  return availableTimeSlots;
};

//add availabilitites of the vet for a given date
exports.addAvailabilityByVetId = async (date, slotData, vetobj) => {
  try {
    const filter = { "vet.email": vetobj.email };
    const existingDoc = await availability.findOne(filter);
    if (existingDoc) {
      console.log("vet already exists");
      const existingTimeSlot = existingDoc.time_slots.find(
        (timeSlot) => timeSlot.date === date
      );

      if (existingTimeSlot) {
        console.log("date already exists");
        console.log("existing time array " + existingTimeSlot.time.length);
        existingTimeSlot.time.push({
          _id: new ObjectId(),
          start_time: slotData.slot[0].start_time,
          end_time: slotData.slot[0].end_time,
          availability: slotData.slot[0].availability,
        });
        console.log(slotData.slot[0].start_time);
        console.log("after pushing time array " + existingTimeSlot.time.length);
      } else {
        console.log("date does not exist");
        existingDoc.time_slots.push({
          date: date,
          time: [
            {
              _id: new ObjectId(),
              start_time: slotData.slot[0].start_time,
              end_time: slotData.slot[0].end_time,
              availability: slotData.slot[0].availability,
            },
          ],
        });
      }
      existingDoc.markModified("time_slots");
      const updatedDoc = await existingDoc.save();
      console.log("availability saved to the database", updatedDoc);
    } else {
      console.log("vet does not exist");
      const data = new availability({
        time_slots: [
          {
            date: date,
            time: [
              {
                _id: new ObjectId(),
                start_time: slotData.slot[0].start_time,
                end_time: slotData.slot[0].end_time,
                availability: slotData.slot[0].availability,
              },
            ],
          },
        ],
        vet: vetobj,
      });

      const savedDoc = await data.save();
      console.log("availability saved to the database", savedDoc);
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * modifies the availability status of the time slot. The time slot should be updated upon
 * booking, modifying of canceling an appointment.
 * For example, chaning the availability status to 0 when a booking is made, so that the
 * particular time slot is not displayed to other users.
 * Similiarly changing the availability status to 1 when the booking is cancelled.
 * 
 */
exports.change_time_slot_availability_status = async (vet_id, time_slot_id, date, updateValue) => {
  const filter = { "vet._id": vet_id.toString() };
  const existingDoc = await availability.findOne(filter);
  console.log("here")
  console.log(existingDoc);
  console.log(vet_id);
  console.log(time_slot_id);
  console.log(date);
  console.log(updateValue);
  if (existingDoc) {
    const existingTimeSlot = existingDoc.time_slots.find(
      (timeSlot) => timeSlot.date === date
    );

    const time = existingTimeSlot.time.find((t) =>
      t._id.equals(new ObjectId(time_slot_id))
    );

    time.availability = updateValue;
    
    existingDoc.markModified("time_slots");
    const updatedDoc = await existingDoc.save();
    console.log("Availability status updated: ", updatedDoc);
  }
};


