import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import GroupModal from "./components/GroupModal";
import NotesArea from "./components/NotesArea";
import "./App.css";

const LOCAL_KEY = "pocketnotes_groups_v1";

const App = () => {
  const [groups, setGroups] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGroupName, setActiveGroupName] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // persist groups whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(groups));
  }, [groups]);

  const handleAddGroup = (newGroup) => {
    if (
      groups.some((g) => g.name.toLowerCase() === newGroup.name.toLowerCase())
    ) {
      alert("Group name already exists!");
      return;
    }
    setGroups((prev) => [...prev, { ...newGroup, messages: [] }]);
    setActiveGroupName(newGroup.name);
  };

  const handleSendMessage = (groupName, messageText) => {
    const nowISO = new Date().toISOString();
    const newMsg = {
      id: Date.now().toString(36),
      text: messageText,
      createdAt: nowISO,
      updatedAt: nowISO,
    };
    setGroups((prev) =>
      prev.map((g) =>
        g.name === groupName
          ? { ...g, messages: [...g.messages, newMsg] }
          : g
      )
    );
  };

  const activeGroup = groups.find((g) => g.name === activeGroupName) || null;

  return (
    <div className="app">
      {/* Desktop view: show both */}
      {!isMobile && (
        <>
          <Sidebar
            groups={groups}
            onAddClick={() => setIsModalOpen(true)}
            onSelectGroup={(name) => setActiveGroupName(name)}
            activeGroupName={activeGroupName}
          />
          <NotesArea group={activeGroup} onSendMessage={handleSendMessage} />
        </>
      )}

      {/* Mobile view: show either sidebar or notes */}
      {isMobile && !activeGroup && (
        <Sidebar
          groups={groups}
          onAddClick={() => setIsModalOpen(true)}
          onSelectGroup={(name) => setActiveGroupName(name)}
          activeGroupName={activeGroupName}
        />
      )}

      {isMobile && activeGroup && (
        <NotesArea
          group={activeGroup}
          onSendMessage={handleSendMessage}
          onBack={() => setActiveGroupName(null)}
          isMobile={true}
        />
      )}

      {isModalOpen && (
        <GroupModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleAddGroup}
        />
      )}
    </div>
  );
};

export default App;
