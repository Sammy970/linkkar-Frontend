import { Container } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";

const Analytics = () => {
  const location = useLocation();

  const data = location.state.obj;
  const title = data.title;
  const description = data.description;
  const image = data.image;
  const code = data.code;

  return (
    <Container maxW={"1010px"} mt={10}>
      <Section1
        title={title}
        description={description}
        image={image}
        code={code}
      />
      <Section2 code={code} />

      <section></section>
    </Container>
  );
};

export default Analytics;
