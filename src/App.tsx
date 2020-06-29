import React from 'react';
import Router from './Router';
import { Navbar } from './components/Navbar';
import { FlashMessages } from './components/UIkit';
import { useSelector } from 'react-redux';
import { selectFlashMessage } from './redux/modules/flashMessages';

function App() {
  const messages = useSelector(selectFlashMessage);
  return (
    <>
      <Navbar />
      <FlashMessages messages={messages} />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;
