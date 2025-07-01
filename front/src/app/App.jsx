import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import MediaRecorer from '../try/MediaRecorer';
import HomePage from '../features/home/HomePage';
import LoginPage from '../features/login/LoginPage';
import PartnerPage from '../features/partner/PartnerPage';
import RehearsalInPage from '../features/rehearsal/rehearsalInput/RehearsalInPage';
import RehearsalOutPage from '../features/rehearsal/rehearsalOutput/RehearsalOutPage';
import ListenConversationPage from '../features/actual/listen/ListenConversation';
import SuggestionPage from '../features/actual/suggestion/SuggestionPage';
import { UIProvider } from '@yamada-ui/react';
import customTheme from '../theme/theme';
import QuestionPage from '../features/question/QuestionPage';
import ConversationLogPage from '../features/actual/conversationLog/conversationLogPage';
import { createContext, useState } from 'react';

export const context = createContext();

function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <UIProvider theme={customTheme}>
        <context.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              {/* トライ中のものを最初に表示させるようにしてます */}
              <Route
                path="/"
                element={<Navigate to="/login" />}
              />

              {/* デモで最低限必要 */}
              <Route
                path="/try"
                element={<MediaRecorer />}
              />
              <Route
                path="/questionPage"
                element={<QuestionPage />}
              />
              <Route
                path="/home"
                element={<HomePage />}
              />
              <Route
                path="/partner"
                element={<PartnerPage />}
              />
              <Route path="/rehearsal">
                <Route
                  path="input"
                  element={<RehearsalInPage />}
                />
                <Route
                  path="output"
                  element={<RehearsalOutPage />}
                />
              </Route>

              {/* アプリとしてここまでやりたい。 */}
              <Route path="/actual">
                <Route
                  path="listen"
                  element={<ListenConversationPage />}
                />
                <Route
                  path="conversationlog"
                  element={<ConversationLogPage />}
                />
                <Route
                  path="suggestion"
                  element={<SuggestionPage />}
                />
              </Route>
              <Route
                path="/login"
                element={<LoginPage />}
              />

              {/* 無効なURL叩いた時ようのナビゲーション */}
              <Route
                path="/*"
                element={<Navigate to="/try" />}
              />
            </Routes>
          </BrowserRouter>
        </context.Provider>
      </UIProvider>
    </>
  );
}

export default App;
