// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
// import Body from './components/Body';
import Header from './components/Header';
import NoteListPage from './pages/NoteListPage';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import NotePage from './pages/NotePage';

function App() {
  return (
    <BrowserRouter>
      <div className="container dark">
        <div className='app'>
          <Header />
          <Route path="/" exact component={NoteListPage} />
          <Route path="/note/:id" component={NotePage} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
