import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { CrowdfundingContext } from "../context/CrowdfundingContext";
import Transaction from "./Transaction";

const InitiativeCard = ({
  id,
  collected,
  description,
  owner,
  poster,
  target,
  title,
  transactions,
}) => {
  const { transfer, currentAccount, deleteInitiative, changeTarget } =
    useContext(CrowdfundingContext);
  const [transactionsArray, setTransactionsArray] = useState([]);
  const [isDonate, setIsDonate] = useState(false);
  const [isChangeTarget, setIsChangeTarget] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [transferAmount, setTransferAmount] = useState(0);
  const [newTarget, setNewTarget] = useState(target);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDonate(false);
    if (!transferAmount || transferAmount > target - collected) return;
    transfer(id, transferAmount, message);
    setIsDonate(false);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDonate(false);
    deleteInitiative(id);
  };
  const handleChangeTarget = async (e) => {
    e.preventDefault();
    if (newTarget == target && newTarget < collected) return;
    changeTarget(id, newTarget);
    setIsChangeTarget(false);
  };
  const structuredTransactions = transactions.map((transaction) =>
    parseInt(transaction._hex, 16)
  );
  useEffect(() => {
    setTransactionsArray(structuredTransactions);
  }, []);
  console.log(poster);
  return (
    <Col>
      <Card bg="dark" text="white">
        <Card.Img
          variant="top"
          src={poster}
          alt={title}
          className="mv15-mhauto text-align-center"
          style={{ height: "200px", width: "max-content" }}
        />
        <Card.Body>
          <Card.Title className="text-align-center mv15-mhauto">
            {title}
          </Card.Title>
          {/* <Row className="mv15-mhauto">{`Owner: ${owner.substring(
            0,
            4
          )}...${owner.substring(owner.length - 4)}`}</Row>
          {isChangingVal != id &&
            (!isChangeVal ? (
              <Row className="mv15-mhauto"> {`VALUE: ${value}`}</Row>
            ) : (
              <Row className="mv15-mhauto">
                <input
                  type="number"
                  step="0.0001"
                  name="value"
                  placeholder="Enter new value"
                  onChange={(e) => setNewVal(e.target.value)}
                />
              </Row>
            ))} */}
          <Row className="mv15-mhauto">{`Description: ${description}`}</Row>
          <Row className="mv15-mhauto">{`Owner: ${owner.substring(
            0,
            4
          )}...${owner.substring(owner.length - 4)}`}</Row>
          <Row className="mv15-mhauto">{`Collected: ${collected}`}</Row>
          <Row className="mv15-mhauto">{`Target: ${target}`}</Row>
          {currentAccount == owner && transactionsArray.length > 0 && (
            <>
              <Row className="mv15-mhauto">Transactions</Row>
              <Row className="mv15-mhauto">
                {transactionsArray.map((transaction) => (
                  <Transaction key={transaction} id={transaction - 1} />
                ))}
              </Row>
            </>
          )}
          {isDonate ? (
            <>
              <input
                type="number"
                name="transferAmount"
                value={transferAmount}
                step="0.0001"
                className="mv15-mhauto"
                style={{ width: "100%" }}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <input
                type="text"
                name="message"
                placeholder="Enter message"
                value={message}
                className="mv15-mhauto"
                style={{ width: "100%" }}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Row className="mv15-mhauto">
                <Button
                  variant="success"
                  onClick={handleSubmit}
                  style={{ width: "80%", margin: "auto" }}
                >
                  Donate
                </Button>
              </Row>
              <Row className="mv15-mhauto">
                <Button
                  variant="danger"
                  onClick={() => setIsDonate(false)}
                  style={{ width: "80%", margin: "auto" }}
                >
                  Cancel
                </Button>
              </Row>
            </>
          ) : (
            target !== collected &&
            !isChangeTarget &&
            !isDelete && (
              <Row className="mv15-mhauto">
                <Button
                  variant="success"
                  onClick={() => setIsDonate(true)}
                  style={{ width: "80%", margin: "auto" }}
                >
                  Donate
                </Button>
              </Row>
            )
          )}
          {currentAccount == owner && !isDonate && (
            <>
              {isChangeTarget ? (
                <>
                  <input
                    type="number"
                    name="newTarget"
                    value={newTarget}
                    step="0.0001"
                    className="mv15-mhauto"
                    style={{ width: "100%" }}
                    onChange={(e) => setNewTarget(e.target.value)}
                  />
                  <Row className="mv15-mhauto">
                    <Button
                      variant="success"
                      onClick={handleChangeTarget}
                      style={{ width: "80%", margin: "auto" }}
                    >
                      Change
                    </Button>
                  </Row>
                  <Row className="mv15-mhauto">
                    <Button
                      variant="danger"
                      onClick={() => setIsChangeTarget(false)}
                      style={{ width: "80%", margin: "auto" }}
                    >
                      Cancel
                    </Button>
                  </Row>
                </>
              ) : (
                !isDelete && (
                  <Row className="mv15-mhauto">
                    <Button
                      variant="warning"
                      onClick={() => setIsChangeTarget(true)}
                      style={{ width: "80%", margin: "auto" }}
                    >
                      Change Target
                    </Button>
                  </Row>
                )
              )}
              {isDelete ? (
                <>
                  <Row className="mv15-mhauto" style={{ color: "red" }}>
                    Do you want to delete this Initiative?
                  </Row>
                  <Row className="mv15-mhauto">
                    <Button
                      variant="success"
                      onClick={handleDelete}
                      style={{ width: "80%", margin: "auto" }}
                    >
                      Delete
                    </Button>
                  </Row>
                  <Row className="mv15-mhauto">
                    <Button
                      variant="danger"
                      onClick={() => setIsDelete(false)}
                      style={{ width: "80%", margin: "auto" }}
                    >
                      Cancel
                    </Button>
                  </Row>
                </>
              ) : (
                !isChangeTarget && (
                  <Row className="mv15-mhauto">
                    <Button
                      variant="danger"
                      onClick={() => setIsDelete(true)}
                      style={{ width: "80%", margin: "auto" }}
                    >
                      Delete
                    </Button>
                  </Row>
                )
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default InitiativeCard;
