import React, { useState, useEffect } from "react";
import "./index.css";
import data from "./data.json";
import { Col, Container, Row } from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";

const TreeView = () => {
  const [treeData, setTreeData] = useState([data]);
  const [updated, setUpdated] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setUpdated(event.target.value);
      let childId = event.target.previousSibling.id;
      const result = findChildById(data, childId);
      result.children.push({
        id: Math.floor(Math.random() * 100),
        label: event.target.value,
        children: [],
      });
    }
  };

  function findChildById(node, targetId) {
    if (node.id == targetId) {
      return node;
    }
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const result = findChildById(child, targetId);
      if (result) {
        return result;
      }
    }
    return null;
  }

  function Tree(childData) {
    return (
      <div className="tree">
        <Container key={childData.id}>
          <Row>
            {childData.map((item) => (
              <>
                <Col key={item.id} sm={11} style={{ marginTop: "2vh" }}>
                  <div style={{ display: "flex" }}>
                    <span id={item.id}>{item.label}</span>
                    <input
                      type="text"
                      className="inputBox"
                      onKeyDown={handleKeyDown}
                    />
                    <AiOutlineDelete />
                  </div>
                  {item.children && item.children.length
                    ? Tree(item.children)
                    : ""}
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </div>
    );
  }

  return <>{Tree(treeData)}</>;
};

export default TreeView;
