import React, { ReactElement, FC, useState, useEffect } from "react";
import { Button, Stack, Container, Typography } from "@mui/material";
import SearchInput from "../components/SearchInput";

// function for calculating distance
const calcDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p)) / 2;
  // return value
  return 12742 * Math.asin(Math.sqrt(a)) * 0.621371;
}


// Home function component
const Home: FC<any> = (): ReactElement => {
  const [distance, setDistance] = useState('');
  const [airport1, setAirport1] = useState(null);
  const [airport2, setAirport2] = useState(null);

  useEffect(() => {
    console.log(airport1);
  }, [airport1]);

  const calculateDistance = () => {
    if (airport1 && airport2) {
      let lat1 = parseFloat(airport1['latitude']);
      let lon1 = parseFloat(airport1['longitude']);
      let lat2 = parseFloat(airport2['latitude']);
      let lon2 = parseFloat(airport2['longitude']);
      let dis = calcDistance(lat1, lon1, lat2, lon2).toFixed(2);
      setDistance(dis);
    }

  }
  return (
    <Container maxWidth="sm">
      <Stack spacing={3}
        sx={{
          width: 400,
          mt: 3,
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <SearchInput handleAirport={setAirport1} />
        <SearchInput handleAirport={setAirport2} />
        <Button variant="outlined" sx={{ height: '55px', width: '100%' }} onClick={calculateDistance}>Calculate</Button>
        <Typography variant="h4" component="h2">Distance: {distance ? `${distance}miles` : 'Not Selected'} </Typography>
      </Stack>
    </Container>
  );
};

export default Home;