import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import Demographics from './Panels/Panel4/demographics';
import PreProcessing from './Panels/Panel7/preprocessing';
import Metadata from './Panels/Panel3/metadata';
import Scatter from './Panels/Panel2/scatter';
import Measurements from './Panels/Panel5/measurement';
import Image from './Panels/Panel6/image';
import * as d3 from 'd3'; // Assuming you're using d3 to fetch your CSV dataset
import TimeSlider from './TimeSlider';

function App() {
  const [dataset, setDataset] = useState(null); 
  const [selectedPoints, setSelectedPoints] = useState([]);
  const defaultLayout = [28, 30, 42];
  const defaultMiddle = [20, 80];
  const defaultRightA = [50, 50];
  const defaultRightB = [60, 40];
  const [selectedOne, setSelectedOne] = useState(null);

  const API_BASE_URL = 'http://127.0.0.1:5000/';

  const handleOneSelect = (point) => {
    setSelectedOne(point);
  };

  const [selectedTimepoint, setTimepoint] = useState(null);

  const handleLabelChange = (label) => {
    console.log('Selected Label:', label);
    setTimepoint(label);
  };

  useEffect(() => {
    // Fetch the dataset only once when the App component is mounted
    const fetchData = async () => {
      try {
        //const response = await fetch('ZIB_demoFeatures_v00_507.csv'); // need to be in "/public/"
        // const text = await response.text();
        // const data = d3.csvParse(text); 
        const response = await fetch(`${API_BASE_URL}/data`);
        const data = await response.json();
        setDataset(data); // Store dataset in state
      } catch (error) {
        console.error('Error fetching dataset:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  // If the dataset is not loaded yet, show a loading message
  if (!dataset) {
    return <div>Loading...</div>;
  }


  const handleSelection = async (points_data) => {
    // console.log("APP: raw event data");
    // console.log(points_data);

    const selection = points_data.points.map((point) => point.pointNumber);
    // console.log("APP: sent-in selectedPoints props");
    // console.log(selection);

    setSelectedPoints(selection);
  };




  return (
    <div className="App h-100">
      <TimeSlider onChange={handleLabelChange} />
      <PanelGroup direction="horizontal">
        <Panel defaultSize={defaultLayout[0]}>
          <div style={{ height: '100%' }}>
          <PreProcessing dataset={dataset} selectedOne={selectedOne} onSelect={handleOneSelect} />
           
          </div>
        </Panel>

        <PanelResizeHandle />

        <Panel defaultSize={defaultLayout[1]}>
          <PanelGroup direction="vertical">
          <Panel defaultSize={defaultMiddle[0]}>
              <div className="col-md-12 bg-light h-100">
                <Metadata dataset={dataset} selectedPoints={selectedPoints} selectedOne={selectedOne} onSelect={handleOneSelect}/>
              </div>
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={defaultMiddle[1]}>
            <div style={{ height: '100%' }}>
              <Demographics dataset={dataset} selectedPoints={selectedPoints} handleSelection={handleSelection} selectedOne={selectedOne}/>
            </div>
            </Panel>
          </PanelGroup> 
        </Panel>

        <PanelResizeHandle />

        <Panel defaultSize={defaultLayout[2]}>
          <PanelGroup direction="vertical">

            <Panel defaultSize={defaultRightA[0]}>
              <div style={{ height: '100%' }}>
                <Scatter dataset={dataset} selectedPoints={selectedPoints} handleSelection={handleSelection} selectedOne={selectedOne}/>
              </div>
            </Panel>

            <PanelResizeHandle />

            <Panel defaultSize={defaultRightA[1]}>
              <PanelGroup direction="horizontal">
                <Panel defaultSize={defaultRightB[0]}>
                  <div className="col-md-12 bg-light h-100">
                    <Measurements data={dataset} selectedOne={selectedOne} onSelect={handleOneSelect}/>
                  </div>
                </Panel>

                <PanelResizeHandle />
                <Panel defaultSize={defaultRightB[1]}>
                  <div className="col-md-12 bg-light h-100">
                    <Image />
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
