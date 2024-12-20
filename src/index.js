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
import SendMsg from './Components/Pages/SendMsg.jsx';
import WelcomeMsg from './Components/Pages/WelcomeMsg.jsx';
import AppScrollNews from './Components/Pages/AppScrollNews.jsx';
import FeesMaster from './Components/Pages/FeesMaster.jsx';
import EditCreatedMsg from './Components/Pages/EditCreatedMsg.jsx';
import SupportMaster from './Components/Pages/SupportMaster.jsx';

interceptor();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredRoles={['admin', 'user', 'superadmin', 'management']} />} />
        <Route path="/import-scholar" element={<ProtectedRoute element={<ImportScholar />} requiredRoles={['admin', 'superadmin']} />} />
        <Route path="/messages" element={<ProtectedRoute element={<Messages />} requiredRoles={['admin', 'superadmin']} />} />
        <Route path="/notice-board" element={<ProtectedRoute element={<NoticeBoard />} requiredRoles={['admin', 'superadmin']} />} />
        <Route path="/message-draft" element={<ProtectedRoute element={<MessageDraft />} requiredRoles={['admin', 'user', 'superadmin', 'management']} />} />
        <Route path="/edit-created-message" element={<ProtectedRoute element={<EditCreatedMsg />} requiredRoles={['admin', 'user', 'superadmin', 'management']} />} />
        <Route path="/send-message" element={<ProtectedRoute element={<SendMsg />} requiredRoles={['admin', 'user', 'superadmin', 'management']} />} />
        <Route path="/welcome-message" element={<ProtectedRoute element={<WelcomeMsg />} requiredRoles={['admin', 'superadmin']} />} />
        <Route path="/app-scroll-news" element={<ProtectedRoute element={<AppScrollNews />} requiredRoles={['admin', 'superadmin']} />} />
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} requiredRoles={['admin']} />} />
        <Route path="/reply-received" element={<ProtectedRoute element={<ReplyReceived />} requiredRoles={['admin', 'user', 'superadmin', 'management']} />} />
        <Route path="/fees-master" element={<ProtectedRoute element={<FeesMaster />} requiredRoles={['admin', 'superadmin']} />} />
        <Route path="/group-master" element={<ProtectedRoute element={<GroupMaster />} requiredRoles={['admin', 'superadmin', 'management']} />} />
        <Route path="/sub-group" element={<ProtectedRoute element={<SubGroupMaster />} requiredRoles={['admin', 'superadmin', 'management']} />} />
        <Route path="/user-management" element={<ProtectedRoute element={<UserManagement />} requiredRoles={['admin', 'superadmin', 'management']} />} />
        <Route path="/school-master" element={<ProtectedRoute element={<SchoolMaster />} requiredRoles={['admin', 'superadmin']} />} />
        <Route path="/support-master" element={<ProtectedRoute element={<SupportMaster />} requiredRoles={['admin', 'superadmin']} />} />
        <Route path="/change-password" element={<ProtectedRoute element={<ChangePassword />} requiredRoles={['admin', 'superadmin']} />} />

      </Route>
    </Routes>

  </BrowserRouter>
);
