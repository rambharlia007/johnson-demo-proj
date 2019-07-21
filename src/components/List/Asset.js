import React, { Component } from "react";
import ReactDOM from "react-dom";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";


var $ = require("jquery");
require("datatables.net");

class AssetGrid extends Component {
  constructor() {
    super();
    this.state = {
      assetData: {
        name: "",
        areaCode: "",
        code: "",
        connectingArea: "",
        direction: "A10",
        reason: ""
      }
    };
    this.table = null;
  }

  registerEvents = () => {
    var self = this;

    $("#btn-add-asset").click(function () {
      $("#asset_modal").modal("show");
    });

    $(".asset-edit-cls").click(function (e) {
      alert("Edit Assets")
    })

    $(".asset-delete-cls").click(function (e) {
      alert("Delete Assets")
    })
  };

  componentDidMount() {
    var self = this;
    this.table = $(this.refs.asset_grid).DataTable({
      ajax: {
        url: "https://api.jsonbin.io/b/5d33f821c55c97707db519c0",
        type: "GET",
        dataSrc: function (json) {
          return json;
        },
        error: function (xhr, error) {
          if (xhr.status == 501) alert("Unauthorised user");
        }
      },
      fixedHeader: {
        header: true,
        footer: true
      },
      initComplete: self.registerEvents,  // Register Click event
      columns: [
        // {
        //   data: "imageUrl",
        //   render: function (data, type, row, meta) {
        //     return `<span>
        //           <img src="${data}" className="img-thumbnail" style="height:50px" alt="not available">
        //           </span>`;
        //   }
        // },
        { data: "name" },
        { data: "eanCode" },
        { data: "brpCode" },
        { data: "acquiringArea" },
        { data: "ConnectingArea" },
        {
          render: function () {
            return `<span>
            <button type="button" class="btn btn-link asset-edit-cls">Edit</button>
                  </span>`;
          }
        },
        {
          render: function () {
            return `<span>
            <button type="button" class="btn btn-link asset-delete-cls">Delete</button>
                  </span>`;
          }
        }
      ],
      lengthMenu: [[15, 20, 25, 30, 100], [15, 20, 25, 30, 100]]
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const formData = { ...this.state.assetData };
    formData[name] = value;
    this.setState({
      assetData: formData
    });
  }

  saveAsset = () => {
    var self = this;
    console.log(this.state.assetData);
    // axios
    //   .patch(
    //     `API_END_POINT`,
    //     this.state.assetData,
    //     {
    //       headers: {}
    //     }
    //   )
    //   .then(response => {
    //     if (response.status == 200) {
    //       $("#asset_modal").modal("hide");
    //       // self.table.ajax.reload(self.initCallback);
    //     }
    //   });
  };

  render() {
    return (
      <div>
        <div className="row justify-content-md-center p50">
          <div className="col-md-11 pb15">
            <div className="card">
              <div className="card-body">
                <div className="pb15">
                  <button type="button" id="btn-add-asset" className="btn btn-success btn-sm">Add Asset</button>
                </div>
                <table
                  ref="asset_grid"
                  className="display custom-datatable"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Asset Name</th>
                      <th>EAN Code</th>
                      <th>BRP Code</th>
                      <th>Acquiring Area</th>
                      <th>Connecting Area</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="asset_modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Asset</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-9">
                      <input
                        name="name"
                        className="form-control"
                        value={this.state.assetData.name}
                        onChange={e => {
                          this.handleInputChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Asset Code</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        name="code"
                        value={this.state.assetData.code}
                        onChange={e => {
                          this.handleInputChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Direction</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control form-control-sm"
                        name="direction"
                        value={this.state.assetData.direction}
                        onChange={e => {
                          this.handleInputChange(e);
                        }}
                      >
                        <option value="A10">A10</option>
                        <option value="A20">A20</option>
                        <option value="A30">A30</option>
                        <option value="A40">A40</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Area Code</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        name="areaCode"
                        value={this.state.assetData.areaCode}
                        onChange={e => {
                          this.handleInputChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Connecting Area</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        name="connectingArea"
                        value={this.state.assetData.connectingArea}
                        onChange={e => {
                          this.handleInputChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Reason</label>
                    <div className="col-sm-9">
                      <input
                        type="textarea"
                        name="reason"
                        className="form-control"
                        value={this.state.assetData.reason}
                        onChange={e => {
                          this.handleInputChange(e);
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    this.saveAsset();
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    $("#asset_modal").modal("hide");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssetGrid;
