import React from "react";
import Section1 from "./Sections/Section1";
import { Container } from "@chakra-ui/react";
import Section2 from "./Sections/Section2";

// Importing Auth0
import { useAuth0 } from "@auth0/auth0-react";
import Error401 from "../ErrorPages/Error401";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { isAuthenticated , isLoading } = useAuth0();
  console.log(isLoading);
  console.log("auth "+ isAuthenticated)
  return (
    <>

      {isAuthenticated  ? (
        <Container maxW={"1010px"} mt={10}>
          <Section1 />
          <Section2 />
        </Container>
      ) :  (
        isLoading || isAuthenticated ? (
          <FontAwesomeIcon icon={faSpinner} spin size="2xl" /> 
          ) : 
          <Error401 />
      )
      }

    </>
  );
};

export default Dashboard;