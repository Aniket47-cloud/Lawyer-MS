import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSpecialty } from "../redux/slices/lawyerSlices";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AllLawyers = () => {
  const dispatch = useDispatch();
  const { lawyers, selectedSpecialty } = useSelector((state) => state.lawyers);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const specialties = ["All", ...new Set(lawyers.flatMap((lawyer) => lawyer.specialities))];

  const filteredLawyers =
    selectedSpecialty === "All"
      ? lawyers
      : lawyers.filter((lawyer) =>
          lawyer.specialities.includes(selectedSpecialty)
        );

  const handleSpecialtyClick = (specialty) => {
    dispatch(setSpecialty(specialty));
  };

  return (
    <Box sx={{ p: 3 }}>
      
      <Box sx={{ width: "83.33%", mx: "auto" }}>
       
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "none" : "center",
            overflowX: isMobile ? "auto" : "visible",
            whiteSpace: isMobile ? "nowrap" : "normal",
            mb: 3,
            pb: 2,
            borderBottom: "1px solid #ddd",
          }}
        >
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? "contained" : "outlined"}
              onClick={() => handleSpecialtyClick(specialty)}
              sx={{
                textTransform: "capitalize",
                mx: isMobile ? 1 : 2,
                flexShrink: 0,
              }}
            >
              {specialty}
            </Button>
          ))}
        </Box>

       
        <Grid container spacing={3}>
          {filteredLawyers.map((lawyer) => (
            <Grid item xs={12} sm={6} md={4} key={lawyer.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                }}
              >
                
                <CardMedia
                  component="img"
                
                  image={lawyer.img}
                  alt={lawyer.name}
                  sx={{
                    objectFit: "contain",
                    height:"300px",
                    
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    backgroundColor: "#ebf4ff", 
                    px: 1,
                    pt:3 
                  }}
                />

             
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                    {lawyer.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Specialties: {lawyer.specialities.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cost per Appointment: ${lawyer.costPerAppointment}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    {lawyer.description.length > 60
                      ? `${lawyer.description.slice(0, 60)}...`
                      : lawyer.description}
                  </Typography>
                </CardContent>

                
                <Box sx={{ p: 2 }}>
                  <Button
                    component={Link}
                    to={`/lawyer/${lawyer.id}`}
                    variant="contained"
                    fullWidth
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#155a9a",
                      },
                    }}
                  >
                    Book Appointment
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AllLawyers;
