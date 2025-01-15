const Appointment = require("../models/Appointment");
const Business = require("../models/Business");

/**
 * Helper function to convert "HH:mm" to total minutes from midnight.
 * Example "09:00" => 540, "17:30" => 1050.
 */
function timeStringToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Check if two time intervals overlap.
 * interval A: [startA, endA]
 * interval B: [startB, endB]
 */
function isOverlap(startA, endA, startB, endB) {
  // Overlap if (startA < endB) AND (startB < endA)
  return startA < endB && startB < endA;
}

/**
 * CREATE APPOINTMENT (normal or hot).
 * Ensures there's no overlap with existing appointments for the same date/business.
 */
exports.createAppointment = async (req, res) => {
  try {
    const {
      businessId,
      serviceType,
      originalPrice,
      discountPrice,
      date,
      time, // "HH:mm"
      durationInMinutes,
      isHot,
    } = req.body;

    // Ensure business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    // Calculate the start and end times (in minutes from midnight)
    const newStart = timeStringToMinutes(time);
    const newEnd = newStart + durationInMinutes;

    // Find all appointments for this business on the same date
    const existingAppointments = await Appointment.find({ businessId, date });

    // Check for conflicts
    for (const apt of existingAppointments) {
      // Hanan and rawan this is how we iterate over an object
      const aptStart = timeStringToMinutes(apt.time);
      const aptEnd = aptStart + apt.durationInMinutes;
      if (isOverlap(newStart, newEnd, aptStart, aptEnd)) {
        return res.status(400).json({
          success: false,
          message: "Appointment time conflicts with an existing booking",
        });
      }
    }

    // If no conflicts, create the new appointment
    const newAppointment = new Appointment({
      businessId,
      serviceType,
      originalPrice,
      discountPrice,
      date,
      time,
      durationInMinutes,
      isHot: !!isHot, // convert to boolean
    });

    await newAppointment.save();
    return res.status(201).json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET ALL HOT APPOINTMENTS
 */
exports.getAllHotAppointments = async (req, res) => {
  try {
    const hotAppointments = await Appointment.find({ isHot: true });
    return res.json({ success: true, hotAppointments });
  } catch (error) {
    console.error("Error fetching hot appointments:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const normalAppointments = await Appointment.find({});
    return res.json({ success: true, normalAppointments });
  } catch (err) {
    console.error("Error fetching normal appointments:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/*
Maybe Hanan we will use the underneath code in the future.


*/

/**
 * GET AVAILABLE HOURS for a specific business on a specific date.
 * 1. Determine which day of the week it is (example "monday").
 * 2. Get the business's opening hours for that day.
 * 3. List all time slots from open to close in 30-min increments.
 * 4. Exclude any that overlap with existing appointments for that date.
 */
exports.getAvailableHours = async (req, res) => {
  try {
    const { businessId, date } = req.query; // e.g. date="12/01/2025"
    if (!businessId || !date) {
      return res.status(400).json({
        success: false,
        message: "businessId and date are required",
      });
    }

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    // 1. Determine day of the week from date
    //    We'll assume date is "DD/MM/YYYY", parse it, and find the weekday.
    //    *Important*: This is a naive approach. For production, use a robust library (dayjs, date-fns, etc.).
    const [dayStr, monthStr, yearStr] = date.split("/");
    const dateObj = new Date(`${yearStr}-${monthStr}-${dayStr}`); // "YYYY-MM-DD"
    if (isNaN(dateObj)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid date format." });
    }

    const weekdayIndex = dateObj.getDay(); // 0=Sunday, 1=Monday, ...
    const weekdays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const weekdayName = weekdays[weekdayIndex]; // e.g. "sunday"

    // 2. Get opening hours for that day
    const dayHours = business.openingHours[weekdayName];
    if (!dayHours) {
      return res.status(404).json({
        success: false,
        message: `Business is closed on ${weekdayName}`,
      });
    }

    const openMinutes = timeStringToMinutes(dayHours.open); // e.g. "09:00" => 540
    const closeMinutes = timeStringToMinutes(dayHours.close); // e.g. "17:00" => 1020

    // 3. Build all 30-min increments from open to close
    //    e.g. [540, 570, 600, ..., 1020]
    const timeSlots = [];
    for (let t = openMinutes; t < closeMinutes; t += 30) {
      timeSlots.push(t);
    }

    // 4. Find existing appointments for this date
    const existingAppointments = await Appointment.find({ businessId, date });

    // For each appointment, remove any time slots that would overlap
    // We'll assume each existing appointment blocks out its start->end in 30-min increments
    for (const apt of existingAppointments) {
      const aptStart = timeStringToMinutes(apt.time);
      const aptEnd = aptStart + apt.durationInMinutes;
      // Remove any slot that overlaps [aptStart, aptEnd)
      for (let i = timeSlots.length - 1; i >= 0; i--) {
        const slotStart = timeSlots[i];
        const slotEnd = slotStart + 30; // each slot is 30 min
        if (isOverlap(slotStart, slotEnd, aptStart, aptEnd)) {
          timeSlots.splice(i, 1);
        }
      }
    }

    // Convert timeSlots back to "HH:mm" strings
    const availableSlots = timeSlots.map((slot) => {
      const hours = Math.floor(slot / 60);
      const minutes = slot % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    });

    return res.json({ success: true, availableSlots });
  } catch (error) {
    console.error("Error fetching available hours:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
