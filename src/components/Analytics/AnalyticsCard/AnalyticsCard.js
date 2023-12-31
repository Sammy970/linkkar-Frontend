import React from "react";
import { Button, Card, CardBody, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCity,
  faHandPointer,
  faLaptop,
  faLocationCrosshairs,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./AnalyticsCard.module.css";

const AnalyticsCard = (props) => {
  let selectMode;
  const propsKeys = Object.keys(props);
  if (propsKeys.includes("clicks")) {
    selectMode = "clicks";
  } else if (propsKeys.includes("topCity")) {
    selectMode = "topCity";
  } else if (propsKeys.includes("topState")) {
    selectMode = "topState";
  } else if (propsKeys.includes("topDevice")) {
    selectMode = "topDevice";
  }

  let data;
  let iconData;
  // Coral, Salmon, #FD7C6E, #F08080

  let bgcolor;

  if (selectMode === "clicks") {
    bgcolor = "#80C8A1";
  } else if (selectMode === "topCity") {
    bgcolor = "#80C8A1";
  } else if (selectMode === "topState") {
    bgcolor = "#80C8A1";
  } else if (selectMode === "topDevice") {
    bgcolor = "#80C8A1";
  }

  if (selectMode === "topCity") {
    let cityData = props.topCity;
    const totalClicks = props.totalClicks;
    iconData = faCity;

    if (cityData === null) {
      cityData = [];
    }

    let cityArr = [];
    if (cityData !== undefined) {
      cityData.map((city) => {
        let cityName = Object.keys(city).toString();
        let curValue = city[cityName];
        let newValue = (curValue / totalClicks) * 100;
        let obj = { [cityName]: newValue };
        cityArr.push(obj);

        return cityArr.sort((a, b) => {
          const valueA = Object.values(a)[0];
          const valueB = Object.values(b)[0];

          // Sort in descending order
          return valueB - valueA;
        });
      });

      if (cityArr.length > 0) {
        data = Object.keys(cityArr[0]).toString();
      } else {
        data = "No Clicks";
      }
    }
  } else if (selectMode === "topState") {
    let stateData = props.topState;
    const totalClicks = props.totalClicks;
    iconData = faLocationCrosshairs;

    if (stateData === null) {
      stateData = [];
    }

    let stateArr = [];
    if (stateData !== undefined) {
      stateData.map((state) => {
        let stateName = Object.keys(state).toString();
        let curValue = state[stateName];
        let newValue = (curValue / totalClicks) * 100;
        let obj = { [stateName]: newValue };
        stateArr.push(obj);

        return stateArr.sort((a, b) => {
          const valueA = Object.values(a)[0];
          const valueB = Object.values(b)[0];

          // Sort in descending order
          return valueB - valueA;
        });
      });

      if (stateArr.length > 0) {
        data = Object.keys(stateArr[0]).toString();
      } else {
        data = "No Clicks";
      }
    }
  } else if (selectMode === "topDevice") {
    let osNameData = props.topDevice;
    const totalClicks = props.totalClicks;
    iconData = faLaptop;

    if (osNameData === null) {
      osNameData = [];
    }

    let deviceArr = [];
    if (osNameData !== undefined) {
      osNameData.map((device) => {
        let deviceName = Object.keys(device).toString();
        let curValue = device[deviceName];
        let newValue = (curValue / totalClicks) * 100;
        let obj = { [deviceName]: newValue };
        deviceArr.push(obj);

        return deviceArr.sort((a, b) => {
          const valueA = Object.values(a)[0];
          const valueB = Object.values(b)[0];

          // Sort in descending order
          return valueB - valueA;
        });
      });

      if (deviceArr.length > 0) {
        data = Object.keys(deviceArr[0]).toString();
      } else {
        data = "No Clicks";
      }
    }
  } else {
    if (props.clicks !== undefined) {
      data = props.clicks;
      iconData = faHandPointer;
    } else {
      data = 0;
    }
  }

  if (iconData === null || iconData === undefined) {
    iconData = faSpinner;
  }

  return (
    <Card
      height="150px"
      width={{ sm: "full", base: "90%" }}
      background={bgcolor}
      boxShadow={{ base: "5px 5px 0px black", sm: "5px 5px 0px black" }}
      border={"2px solid black"}
    >
      <CardBody>
        <Text
          position="absolute"
          bottom="14"
          right="1"
          left="5"
          fontSize={"20px"}
          fontWeight={600}
          fontFamily="circular-std-light"
          color={"#0f0f0e"}
        >
          {props.text}
        </Text>
        <Text
          position="absolute"
          bottom={`${selectMode === "clicks" ? "0" : "3"}`}
          fontSize={`${selectMode === "clicks" ? "40px" : "24px"}`}
          color={"#0f0f0e"}
          // whiteSpace="pre-line" // Add this line
          fontFamily="circular-std-bold"
        >
          {data}
        </Text>
        <Text position="absolute" right="5" top="3">
          <FontAwesomeIcon
            icon={iconData}
            size="2xl"
            style={{ color: "black" }}
          />
        </Text>
        {selectMode === "clicks" && (
          <Button
            className={classes.reloadBtn}
            position="absolute"
            bottom="3.5"
            right="3"
            bg={"white"}
            onClick={props.onCall}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default AnalyticsCard;
