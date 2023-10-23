import React, { useState } from 'react';
import './App.css';
import { Document, Page, pdfjs } from 'react-pdf';
import companyLogo from './assets/logo.png';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Please select a PDF file.');
        }
    };

    const handlePageSelection = (page) => {
        if (selectedPages.includes(page)) {
            setSelectedPages(selectedPages.filter((p) => p !== page));
        } else {
            setSelectedPages([...selectedPages, page]);
        }
    };

    const handleCreatePDF = () => {
        // Implement functionality to create a new PDF based on selected pages
    };

    return (
      <div className="App">
          {/* <img src="../assets/logo.png"></img> */}
          <img src={companyLogo} alt="BigCo Inc. logo"/>
          <h2 class="tool-header">Extract Pages from a PDF</h2><br/>
          <input type="file" onChange={handleFileChange} accept="application/pdf" required />
          <div className="pdf-container">
              {selectedFile && (
                  <Document
                  file={selectedFile}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                  {Array.from(new Array(numPages), (el, index) => (
                      <div key={`page_${index + 1}`} className="page-container" >
                          <div className="checkbox-container">
                              <input
                                  type="checkbox"
                                  id={`page-${index + 1}`}
                                  name={`page-${index + 1}`}
                                  checked={selectedPages.includes(index + 1)}
                                  onChange={() => handlePageSelection(index + 1)}
                              />
                              <label htmlFor={`page-${index + 1}`}>Page {index + 1}</label>
                          </div>
                          <div style={{ margin: 0, padding: 0 }}>
                              <Page pageNumber={index + 1} renderTextLayer={false} />
                          </div>
                      </div>
                  ))}
              </Document>              
              )}
          </div>
          <button onClick={handleCreatePDF}>Create New PDF</button>
      </div>
  );  
};

export default App;
