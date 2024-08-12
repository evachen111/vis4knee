import "./App.css";
import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import Profile from "./Panels/Panel1";
import Scatter from "./Panels/Panel2";
import Metadata from "./Panels/Panel3";
import Demographics from "./Panels/Panel4";
import Measurements from "./Panels/Panel5";
import Image from "./Panels/Panel6";
import "./App.css";

function App() {
  const defaultLayout = [33, 67];
  const defaultLeft = [20, 40, 40];
  const defaultRight = [45, 55];
  const defaultRightB = [57, 43];
  return (
    <div className="App h-100">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={defaultLayout[0]}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={defaultLeft[0]} maxSize={75}>
              <div style={{ height: "100%" }}>
                <Profile />
              </div>
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={defaultLeft[1]} maxSize={75}>
              <div style={{ height: "100%" }}>
                <Scatter />
              </div>
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={defaultLeft[2]} maxSize={75}>
              <div style={{ height: "100%" }}>
                <Metadata />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={defaultLayout[1]}>
          <div className="full-height-container">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Preprocessing
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Analysis
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              xxx
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <PanelGroup className = "new" direction="vertical">
                <Panel defaultSize={defaultRight[0]}>
                <div style={{ height: "100%" }}>
                    <Demographics />
                  </div>
                </Panel>
                <PanelResizeHandle />
                <Panel defaultSize={defaultRight[1]}>
                  <PanelGroup direction="horizontal">
                    <Panel defaultSize={defaultRightB[0]}>
                    <div style={{ height: "100%" }}>
                        <Measurements />
                      </div>
                    </Panel>
                    <PanelResizeHandle />
                    <Panel defaultSize={defaultRightB[1]}>
                    <div style={{ height: "100%" }}>
                        <Image />
                      </div>
                    </Panel>
                  </PanelGroup>
                </Panel>
              </PanelGroup>
            </div>
          </div>
          </div>


{/*           
        <PanelGroup direction="vertical">
            <Panel>
              <div className="col-md-12 bg-light h-100">
                <Demographics />
              </div>
            </Panel>
            <PanelResizeHandle />
            <Panel>
              <PanelGroup direction="horizontal">
                <Panel>
                  <div className="col-md-12 bg-light h-100">
                    <Measurements />
                  </div>
                </Panel>
                <PanelResizeHandle />
                <Panel>
                  <div className="col-md-12 bg-light h-100">
                    <Image />
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup> */}

        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
