import React from 'react';
import UserList from './UserList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>User Directory</h1>
      </header>
      <main>
        <UserList />
      </main>
      <footer>
        <p>Data from JSONPlaceholder API</p>
      </footer>
    </div>
  );
}

export default App;