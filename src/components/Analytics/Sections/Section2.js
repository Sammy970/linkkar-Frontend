import React, { useEffect, useState } from "react";
import AnalyticsCard from "../AnalyticsCard/AnalyticsCard";
import { Stack } from "@chakra-ui/react";
import CityCard from "../CityAndStateCard/CityCard";
import classes from "./Section2.module.css";
import StateCard from "../CityAndStateCard/StateCard";

const Section2 = (props) => {
  const [apiData, setApiData] = useState({});
  const [apiCall, setApiCall] = useState(false);

  const code = props.code;

  useEffect(() => {
    const url = "https://oia-second-backend.vercel.app/api/analyticsData";
    // const url = "http://localhost:3001/api/analyticsData";
    const bodyContent = {
      code: code,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: { "Content-Type": "application/json" },
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (response.status === 201) {
          setApiCall(true);
          const json = await response.json();
          setApiData(json); // Update the state with fetched data
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    if (!apiCall) {
      fetchData();
    } else {
      return;
    }
  }, [code, apiCall]);

  const apiRecall = () => {
    // console.log("Hello");
    setApiCall(!apiCall);
  };

  // if (apiData !== "") {
  //   console.log(apiData);
  // }

  return (
    <section className={classes.section2}>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={10}
      >
        <AnalyticsCard clicks={apiData.clicks} onCall={apiRecall} />
      </Stack>
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={4}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <CityCard cityData={apiData.city} totalClicks={apiData.clicks} />
        <StateCard stateData={apiData.state} totalClicks={apiData.clicks} />
      </Stack>
    </section>
  );
};

export default Section2;