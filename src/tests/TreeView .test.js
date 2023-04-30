import TreeView from "../tree";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

Enzyme.configure({ adapter: new Adapter() });

describe("TreeView", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.createRoot(div).render(<TreeView />);
    ReactDOM.unmountComponentAtNode(div);
  });

  //renders the root node
  test("renders the mammals node", () => {
    render(<TreeView />);
    const rootNode = screen.getByText("mammals");
    expect(rootNode).toBeInTheDocument();
  });
  test("renders the cheetah node", () => {
    render(<TreeView />);
    const rootNode = screen.getByText("cheetah");
    expect(rootNode).toBeInTheDocument();
  });
  test("renders the bear node", () => {
    render(<TreeView />);
    const rootNode = screen.getByText("bear");
    expect(rootNode).toBeInTheDocument();
  });
  test("renders the ape node", () => {
    render(<TreeView />);
    const rootNode = screen.getByText("ape");
    expect(rootNode).toBeInTheDocument();
  });

  //skipping it since we ane not able to get id here
  xit("updates the tree data when adding a new child node", () => {
    const wrapper = shallow(<TreeView />);
    const inputBox = wrapper.find(".inputBox").first();
    inputBox.simulate("keydown", {
      key: "Enter",
      target: { value: "New Node" },
    });
    expect(wrapper.find(".node")).toHaveLength(1);
  });

  xit("deletes a node when clicking on the delete icon", () => {
    const wrapper = shallow(<TreeView />);
    const deleteIcon = wrapper.find("AiOutlineDelete").first();
    deleteIcon.simulate("click");
    expect(wrapper.state("treeData")[0].children).toHaveLength(2);
  });

  it("renders the tree structure correctly", () => {
    const wrapper = shallow(<TreeView />);
    expect(wrapper.find(".tree").children()).toHaveLength(4);
    expect(wrapper.find(".tree").find(".inputBox")).toHaveLength(7);
    expect(wrapper.find(".tree").find("span").first().text()).toEqual(
      "mammals"
    );
    expect(wrapper.find(".tree").find("span").at(1).text()).toEqual("cheetah");
    expect(wrapper.find(".tree").find("span").at(2).text()).toEqual("bear");
    expect(wrapper.find(".tree").find("span").at(3).text()).toEqual("lion");
    expect(wrapper.find(".tree").find("span").at(4).text()).toEqual("dog");
    expect(wrapper.find(".tree").find("span").at(5).text()).toEqual("elephant");
  });
});
