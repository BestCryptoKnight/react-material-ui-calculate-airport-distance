import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { debounce } from "lodash";

export default function SearchInput(props: any) {
  const [airports, setAirports] = useState([]);

  async function searchAirport(airport: string) {
    const res = await axios.get(`/api/airports?term=${airport}`);
    let resData = res.data.airports ? res.data.airports.map((airport: any) => { return {...airport, label: airport.name } }) : [];
    console.log(resData)
    return resData;
  }

  const debouncedSearchAirport = useRef(
    debounce(async (airport: string) => {
      setAirports(await searchAirport(airport));
    }, 500)
  ).current;

  return (
    <>
      <Autocomplete
        disablePortal
        sx={{width: "100%"}}
        id="combo-box-demo"
        options={airports}
        onChange={(event: any, newValue: string | null) => {
          props.handleAirport(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          debouncedSearchAirport(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Airport" />}
      />
    </>

  );
}
