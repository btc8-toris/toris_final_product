import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import MediaRecorer from '../try/MediaRecorer';
import HomePage from '../features/home/HomePage';
import LoginPage from '../features/login/LoginPage';
import PartnerPage from '../features/partner/PartnerPage';
import RehearsalInPage from '../features/rehearsal/rehearsalInput/rehearsalInPage';
import RehearsalOutPage from '../features/rehearsal/rehearsalOutput/rehearsalOutPage';
import ListenConversationPage from '../features/actual/listen/ListenConversation';
import SuggestionPage from '../features/actual/suggestion/SuggestionPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

{/* トライ中のものを最初に表示させるようにしてます */}
          <Route path="/" element={<Navigate to="/try" />} />

{/* デモで最低限必要 */}
          <Route path="/try" element={<MediaRecorer />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/rehearsal">
            <Route path="input" element={<RehearsalInPage />} />
            <Route path="output" element={<RehearsalOutPage />} />
          </Route>

{/* アプリとしてここまでやりたい。 */}
          <Route path="/actual">
            <Route path="listen" element={<ListenConversationPage />} />
            <Route path="suggestion" element={<SuggestionPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/try" />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
