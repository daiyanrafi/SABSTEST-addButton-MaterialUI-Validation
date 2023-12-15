import React = require("react");
import { IInputs } from "./generated/ManifestTypes";
import axios from "axios";
import TablePage from "./TablePage";
//import { eventNames } from "process";
// import CaseSummary from "./modules/portal-member/CaseSummary";
// import CaseView from "./modules/portal-member/CaseView";

export default class HelloWorld extends React.Component<
  ComponentFramework.Context<IInputs>,
  IState
> {
  private _props: ComponentFramework.Context<IInputs>;
  constructor(props: ComponentFramework.Context<IInputs>) {
    super(props);

    this._props = props;

    this.state = { events: [], registration: false, id: '' }
  }

  

  public render() {
    return (
      <div>
        <h1>hello world</h1>
        <TablePage/>
      </div>
    );
  }
}

interface IState {
  events: any;
  registration: boolean;
  id: string;
}