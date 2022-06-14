import React, { useContext } from "react";
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { CrowdfundingContext } from "../context/CrowdfundingContext";
const Navigationbar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdfundingContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="container">
        <Navbar.Brand href="/">Crowdfundin</Navbar.Brand>
        <Nav>
          {currentAccount ? (
            <Badge bg="light" text="dark" style={{ fontSize: "1rem" }}>
              {`Account: ${currentAccount.substring(
                0,
                4
              )}...${currentAccount.substring(currentAccount.length - 4)}`}
            </Badge>
          ) : (
            <Button
              variant="light"
              onClick={() => connectWallet()}
              style={{ float: "right" }}
            >
              Connect Wallet
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
