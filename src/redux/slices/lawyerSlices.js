import { createSlice } from "@reduxjs/toolkit";
import  lawyers  from "../../data";

const initialState = {
  lawyers: lawyers, // Initialize with mock data
  selectedSpecialty: "All", // Default filter
};

const lawyersSlice = createSlice({
  name: "lawyers",
  initialState,
  reducers: {
    setSpecialty: (state, action) => {
      state.selectedSpecialty = action.payload; // Update selected specialty
    },
    bookAppointment: (state, action) => {
      const { lawyerId, appointmentDate, appointmentTime } = action.payload;
      const lawyer = state.lawyers.find((l) => l.id === lawyerId);
    
      if (lawyer) {
        if (!lawyer.appointments) {
          lawyer.appointments = [];
        }
    
        const dailyAppointments = lawyer.appointments.filter(
          (appt) => appt.date === appointmentDate
        );
    
        if (dailyAppointments.length >= lawyer.availability) {
          throw new Error("No available slots for this day");
        }
    
        lawyer.appointments.push({
          date: appointmentDate,
          time: appointmentTime,
        });
      }
    },
  },
});

export const { setSpecialty, bookAppointment } = lawyersSlice.actions;

export default lawyersSlice.reducer;