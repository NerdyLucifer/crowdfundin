import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { CrowdfundingContext } from "../context/CrowdfundingContext";
import InitiativeCard from "./InitiativeCard";

const YourInitiatives = () => {
  const { initiatives, currentAccount } = useContext(CrowdfundingContext);
  return (
    <Container className="container">
      <h1 className="mv30-mhauto text-align-center">Your Initiatives</h1>
      <Row xs={1} sm={2} md={4} className="g-4 mv30-mhauto">
        {initiatives.map(
          (initiative, _idx) =>
            initiative.owner == currentAccount &&
            initiative.isActive && (
              <InitiativeCard key={initiative.id} {...initiative} />
            )
        )}
      </Row>
    </Container>
  );
};

export default YourInitiatives;
