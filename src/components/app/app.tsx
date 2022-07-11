import { Route, Routes } from 'react-router-dom';
import AddReview from '../AddReview/AddReview';
import Main from '../Main/Main';
import Film from '../Film/Film';
import MyList from '../MyList/MyList';
import NotFound from '../NotFound/NotFound';
import Player from '../Player/Player';
import SignIn from '../SignIn/SignIn';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/mylist" element={<MyList />} />
      <Route path="/films/:id/review" element={<AddReview />} />
      <Route path="/films/:id" element={<Film/>} />
      <Route path="/player/:id" element={<Player/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
