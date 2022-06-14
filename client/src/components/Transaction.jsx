import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CrowdfundingContext } from "../context/CrowdfundingContext";

const Transaction = ({ id }) => {
  const { getTransaction } = useContext(CrowdfundingContext);
  const [transaction, setTransaction] = useState({});
  useEffect(() => {
    getTransaction(id).then((res) => {
      setTransaction(res);
    });
  }, []);
  console.log(transaction);
  return (
    <>
      {transaction.from && (
        <Card style={{ color: "black", fontSize: "0.8rem", margin: "5px 0" }}>
          <Card.Body>
            <Card.Title
              style={{ color: "black", fontSize: "0.8rem" }}
            >{`FROM: ${transaction.from.substring(
              0,
              4
            )}...${transaction.from.substring(
              transaction.from.length - 4
            )}`}</Card.Title>
            <Card.Subtitle
              className="mb-2 text-muted"
              style={{ color: "black", fontSize: "0.8rem" }}
            >
              {`TIME: ${transaction.time}`}
            </Card.Subtitle>
            <Card.Text
              style={{ margin: "0" }}
            >{`AMOUNT: ${transaction.amount} ETH`}</Card.Text>
            <Card.Text>{`Message: ${transaction.message}`}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Transaction;
