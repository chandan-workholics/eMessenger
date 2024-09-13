import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Dashboard from './Components/Pages/Dashboard.jsx';
import ImportScholar from './Components/Pages/ImportScholar.jsx'
import MessageDraft from './Components/Pages/MessageDraft.jsx'
import ReplyReceived from './Components/Pages/ReplyReceived.jsx'
import GroupMaster from './Components/Pages/GroupMaster.jsx'
import SubGroupMaster from './Components/Pages/SubGroupMaster.jsx'
import UserManagement from './Components/Pages/UserManagement.jsx'
import SchoolMaster from './Components/Pages/SchoolMaster.jsx'
import ChangePassword from './Components/Pages/ChangePassword.jsx'
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/Register.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index path="/" element={<Dashboard />} />
        <Route path='/import-scholar' element={<ImportScholar />} />
        <Route path='/message-draft' element={<MessageDraft />} />
        <Route path='/reply-received' element={<ReplyReceived />} />
        <Route path='/group-master' element={<GroupMaster />} />
        <Route path='/sub-group-master' element={<SubGroupMaster />} />
        <Route path='/user-management' element={<UserManagement />} />
        <Route path='/school-master' element={<SchoolMaster />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
