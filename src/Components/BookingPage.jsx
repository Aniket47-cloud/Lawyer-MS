import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { bookAppointment } from "../redux/slices/lawyerSlices";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Grid,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const lawyer = useSelector((state) =>
    state.lawyers.lawyers.find((l) => l.id === parseInt(id, 10))
  );

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const bookedAppointments = lawyer?.appointments || [];
  const dayBookings = bookedAppointments.filter(
    (appt) => appt.date === appointmentDate
  );


  const availableTimes = [];
  for (let hour = 9; hour <= 14; hour++) {
    const time = `${String(hour).padStart(2, "0")}:00`;
    availableTimes.push(time);
  }

  const handleBooking = () => {
    if (!lawyer) {
      setError("Lawyer not found. Please try again.");
      return;
    }

    if (!appointmentDate || !appointmentTime) {
      setError("Please select both date and time.");
      return;
    }

    const isTimeBooked = dayBookings.some(
      (appt) => appt.time === appointmentTime
    );

    if (isTimeBooked) {
      setError("This time slot is already booked.");
      return;
    }

    if (dayBookings.length >= lawyer.availability) {
      setError("This day is fully booked.");
      return;
    }

    dispatch(
      bookAppointment({
        lawyerId: lawyer.id,
        appointmentDate,
        appointmentTime,
      })
    );

    setSuccess(`Appointment booked for ${appointmentDate} at ${appointmentTime}.`);
    setError("");
  };

  if (!lawyer) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Lawyer not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to All Lawyers
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "83.33%", mx: "auto", mt: 4 }}>
      <Typography variant={isMobile?"h3":"h2"} sx={{ textAlign: "center", mb: 3, color:"#1976d2" }}>
        Book an Appointment
      </Typography>

      
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          mb: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
    
        <Box
          sx={{
            width: { xs: "100%", sm: "30%" },
            backgroundColor: "#ebf4ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingX: 2,
          }}
        >
          <img
            src={lawyer.img}
            alt={lawyer.name}
            style={{
              width: "100%",
              maxWidth: "250px",
              
              objectFit: "cover",
            }}
          />
        </Box>

        
        <CardContent sx={{ width: { xs: "100%", sm: "70%" }, p: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold",color:"#1976d2" }}>
            {lawyer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{fontSize:"18px",mt:"8px"}}>
           Speciality: {lawyer.specialities.join(", ")}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: "medium",fontSize:"24px",color:"#1976d2" }}>
            About
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1,fontSize:"17px" }}>
            {lawyer.description}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: "medium",fontSize:"20px" }}>
            Appointment Fee: ${lawyer.costPerAppointment}
          </Typography>
        </CardContent>
      </Card>

   
      <Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
      </Box>

   
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          mb: 2,
        }}
      >
        {Array.from({ length: 7 }).map((_, index) => {
          const date = dayjs().add(index, "day").format("YYYY-MM-DD");
          const isFullyBooked =
            dayBookings.length >= lawyer.availability &&
            dayBookings.some((appt) => appt.date === date);

          return (
            <Button
              key={date}
              variant={appointmentDate === date ? "contained" : "outlined"}
              onClick={() => setAppointmentDate(date)}
              disabled={isFullyBooked}
              sx={{
                textTransform: "capitalize",
                mx: 1,
                flexShrink: 0,
                backgroundColor: isFullyBooked ? "#d32f2f" : "inherit",
                color: isFullyBooked ? "white" : "inherit",
              }}
            >
              {dayjs(date).format("ddd, MMM D")}
              {isFullyBooked && " - Fully Booked"}
            </Button>
          );
        })}
      </Box>

      {appointmentDate && (
        <Box>
          <Typography variant="body1">Select Time Slot</Typography>
          <Grid container spacing={2} mt={2}>
            {availableTimes.map((time) => {
              const isTimeBooked = dayBookings.some((appt) => appt.time === time);
              return (
                <Grid item xs={6} sm={4} md={3} key={time}>
                  <Button
                    variant="outlined"
                    onClick={() => setAppointmentTime(time)}
                    fullWidth
                    disabled={isTimeBooked}
                    sx={{
                      backgroundColor:
                        appointmentTime === time
                          ? "#1976d2"
                          : isTimeBooked
                          ? "#ccc"
                          : "inherit",
                      color: isTimeBooked || appointmentTime === time ? "white" : "inherit",
                    }}
                  >
                    {time}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      <Container className="w-[10/12]  flex justify-center items-center p-2">
      
      <Button variant="contained" onClick={handleBooking}   sx={{ fontSize:"14px", width:"210px" }}>
        Book Appointment
      </Button>
      </Container>

      
      <Box mt={5}>
        <Typography variant="h6">Appointment History</Typography>
        {bookedAppointments.length === 0 ? (
          <Typography>No appointments booked yet.</Typography>
        ) : (
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography variant="body1">See Past Appointments</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {bookedAppointments.map((appt, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="body2">Date: {appt.date}</Typography>
                      <Typography variant="body2">Time: {appt.time}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    </Box>
  );
};

export default BookingPage;
