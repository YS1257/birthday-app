import { useState } from "react";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "./App.css";
import axios from "axios";
import { Typography } from "@mui/material";

function App() {
  const [inputs, setInputs] = useState({});
  const [birthday, setBirthday] = useState();
  const [greeting, setGreeting] = useState(null);
  const [sent, setSent] = useState(true);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSent(false);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSent(true);
    const res = await axios.post("http://localhost:8080/", {
      ...inputs,
      birthday,
    });
    if (res.status === 200) {
      setGreeting(res.data);
    } else {
      setGreeting("error");
    }
    console.log(res);
  };

  return (
    <Stack spacing={5}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <input
            placeholder="firstName"
            type="text"
            name="firstName"
            value={inputs.firstName || ""}
            onChange={handleChange}
          />

          <input
            placeholder="lastName"
            type="text"
            name="lastName"
            value={inputs.lastName || ""}
            onChange={handleChange}
          />

          <input
            type="text"
            pattern="[0-9]*"
            placeholder="phone"
            name="phone"
            value={inputs.phone || ""}
            onChange={handleChange}
          />

          <input
            placeholder="email"
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="birthday"
              name="birthday"
              value={birthday}
              onChange={(birthday) => {
                setSent(false);
                setBirthday(birthday);
              }}
              format="DD.MM"
              views={["month", "day"]}
            />
          </LocalizationProvider>
        </Stack>
        <br />
        <input type="submit" />
      </form>
      {greeting && sent && (
        <Stack>
          <Typography>{`Welcome ${inputs.firstName}, there are ${greeting} days until your birthday.`}</Typography>
          <Typography>{`We will be sending a gift coupon to the email ${inputs.email}`}</Typography>
        </Stack>
      )}
    </Stack>
  );
}

export default App;
