import { Button } from 'react-bootstrap';
import React from 'react';
// import {  } from "../pages/engines/[clientId]/[engineId]/GraphItem";
import axios from 'axios';
import {
  formatYear,
  formatTime,
} from '../../pages/engines/[clientId]/[engineId]/GraphItem';
import authHeader from '../../services/auth-header';

const FileList = ({ file, setMessage, setError, user }) => (
  <tr key={file.createdAt}>
    <td>
      <a download={file.name} href={file.baseUrl}>
        {file.name}
      </a>
    </td>
    <td>
      {formatYear(new Date(file.createdAt))}{' '}
      {formatTime(new Date(file.createdAt))}
    </td>
    <td>
      {user &&
      (user.roles[0] === 'ROLE_ADMIN' || user.roles[0] === 'ROLE_MODERATOR') ? (
        <Button
          variant="danger"
          size="sm"
          onClick={() => deleteFile(file.id, setError, setMessage)}
        >
          Ta bort
        </Button>
      ) : null}
    </td>
  </tr>
);

const deleteFile = (id, setError, setMessage) => {
  const options = {
    headers: authHeader(),
  };
  axios
    .delete(`/api/moderator/${id}/file`, options)
    .then(response => {
      setMessage(response.data.message);
    })
    .catch(error => {
      setError(error.response.data.message);
    });
};

export default FileList;
