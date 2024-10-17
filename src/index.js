import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './Components/Pages/Dashboard.jsx';
import ImportScholar from './Components/Pages/ImportScholar.jsx';
import MessageDraft from './Components/Pages/MessageDraft.jsx';
import ReplyReceived from './Components/Pages/ReplyReceived.jsx';
import GroupMaster from './Components/Pages/GroupMaster.jsx';
import NoticeBoard from './Components/Pages/NoticeBoard.jsx';
import UserManagement from './Components/Pages/UserManagement.jsx';
import SchoolMaster from './Components/Pages/SchoolMaster.jsx';
import ChangePassword from './Components/Pages/ChangePassword.jsx';
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/Register.jsx';
import Messages from './Components/Pages/Messages.jsx';
import SubGroupMaster from './Components/Pages/SubGroupMaster.jsx';
import Chat from './Components/Pages/Chat.jsx';
import { interceptor } from './commonMethod/api.js';
import ProtectedRoute from './commonMethod/ProtectedRoute.jsx';

interceptor();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/import-scholar" element={<ProtectedRoute element={<ImportScholar />} />} />
        <Route path="/messages" element={<ProtectedRoute element={<Messages />} />} />
        <Route path="/notice-board" element={<ProtectedRoute element={<NoticeBoard />} />} />
        <Route path="/message-draft" element={<ProtectedRoute element={<MessageDraft />} />} />
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
        <Route path="/reply-received" element={<ProtectedRoute element={<ReplyReceived />} />} />
        <Route path="/group-master" element={<ProtectedRoute element={<GroupMaster />} />} />
        <Route path="/sub-group" element={<ProtectedRoute element={<SubGroupMaster />} />} />
        <Route path="/user-management" element={<ProtectedRoute element={<UserManagement />} />} />
        <Route path="/school-master" element={<ProtectedRoute element={<SchoolMaster />} />} />
        <Route path="/change-password" element={<ProtectedRoute element={<ChangePassword />} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
