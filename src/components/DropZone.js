import React, { useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const checkStyle = { color: "var(--success-green)" }

const DropBox = styled.div`
    border: 1px solid var(--lightgrey);
    border-style: dashed;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Text = styled.span`
    
`
const Container = styled.div`
    width: 100%;
    margin-top: 30px;
`
export default function DropZone({setFiles}) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
      if(acceptedFiles) setFiles(acceptedFiles)
  }, [acceptedFiles])
  return (
    <Container>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <DropBox>{files.length > 0 ? <Text>{files.length} files added <CheckCircleIcon /></Text>: <Text>Drop files here</Text>}</DropBox>
      </div>
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </Container>
  );
}
