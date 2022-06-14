import React, { useContext, useState } from "react";
import { Card, Row, Button, Badge } from "react-bootstrap";
import { CrowdfundingContext } from "../context/CrowdfundingContext";
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="mv15-mhauto"
    style={{ width: "100%" }}
  />
);
const UploadInitiative = () => {
  const { handleChange, formData, isUploading, uploadInitiative } =
    useContext(CrowdfundingContext);
  const handleSubmit = async (e) => {
    const { title, target, description } = formData;
    e.preventDefault();
    if (!title || !target || !description) return;
    uploadInitiative();
  };
  return (
    <div className="container">
      <Card
        bg="dark"
        text="white"
        className="mv30-mhauto"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <Card.Body>
          <Card.Title className="text-align-center mv15-mhauto">
            Upload your Initiative
          </Card.Title>
          <Input
            placeholder="Enter Title"
            name="title"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder="Value (ETH)"
            name="target"
            type="number"
            handleChange={handleChange}
          />
          <Input
            placeholder="Enter Description"
            name="description"
            type="text"
            handleChange={handleChange}
          />
          <Row className="mv15-mhauto">
            {isUploading ? (
              <span>Uploading...</span>
            ) : (
              <Button
                variant="success"
                onClick={handleSubmit}
                style={{ width: "80%", margin: "auto" }}
              >
                Upload
              </Button>
            )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UploadInitiative;
