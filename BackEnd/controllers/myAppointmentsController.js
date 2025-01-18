const { UserAppointment, WaitingList } = require("../models/appointment");

// Get all appointments for a user
exports.getUserAppointments = async (req, res) => {
  try {
    // Replace with actual user ID (e.g., from auth middleware)
    const userId = req.userId;

    const appointments = await UserAppointment.find({ userId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointments." });
  }
};

// Get user's waiting list
exports.getUserWaitingList = async (req, res) => {
  try {
    const userId = req.userId;

    const waitingList = await WaitingList.find({ userId });
    res.status(200).json({ success: true, waitingList });
  } catch (error) {
    console.error("Error fetching waiting list:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch waiting list." });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await UserAppointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Appointment canceled successfully." });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to cancel appointment." });
  }
};

// Delete an item from the waiting list
exports.deleteFromWaitingList = async (req, res) => {
  try {
    const { waitingId } = req.params;

    const waitingItem = await WaitingList.findByIdAndDelete(waitingId);
    if (!waitingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Waiting list item not found." });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from waiting list successfully.",
    });
  } catch (error) {
    console.error("Error deleting from waiting list:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete from waiting list." });
  }
};
