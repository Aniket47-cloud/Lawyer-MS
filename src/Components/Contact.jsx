import React from "react";
import { Box, Typography, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box id="contact"
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        py: 4,
        px: 6,
        mt:6,
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
       
        
      }}
    >
      <Grid
        container
        width={12/12}
        
        direction={isMobile ? "column" : "row"}
        justifyContent={isMobile?"none":"space-between"}
        spacing={2}
        px={6}
        py={5}
        alignItems="center"
        
      >
        {/* Short Description Section */}
        <Grid item xs={12} sm={5}>
          <Typography variant="h6" sx={{ mb: 1,fontSize:"24px" }}>
            LawyerHire - Book the Best Lawyers Easily
          </Typography>
          <Typography variant="body2">
            LawyerHire is your trusted platform for booking appointments with top-rated lawyers across specialties like criminal, divorce, and property disputes. Make the right legal decisions with ease and confidence using our user-friendly app.
          </Typography>
        </Grid>


        <Grid item xs={12} sm={3}>
          <Typography variant="h6" sx={{ mb: 1 , fontSize:"24px"}}>
            Contact Us
          </Typography>
          <Typography variant="body2">
            📞 Phone: +1-800-555-LEGAL <br />
            ✉️ Email: support@lawyerhire.com <br />
            📍 Address: 123 Legal Lane, Justice City, USA
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
