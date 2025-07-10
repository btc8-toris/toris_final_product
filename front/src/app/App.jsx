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
import { createContext, useEffect, useState } from 'react';
import QuestionIntroPage from '../features/question/questionIntro/QuestionIntroPage';
import QuestionCompletePage from '../features/question/questionComplete/QuestionCompletePage';
import PartnerLogPage from '../features/actual/partnerLog/PartnerLogPage';
import ApprovalPage from '../features/actual/approval/ApprovalPage';

export const context = createContext();
import ModePage from '../features/mode/ModePage';
import SplashPage from '../features/splash/SplashPage';

function App() {
  const [user, setUser] = useState({});
  const JSON_HEADER = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const BASE_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL : '';

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('tact-user');
      setUser(JSON.parse(storedUser));
    };
    initializeAuth();
  }, []);

  const login = (user) => {
    setUser(JSON.parse(user));
    localStorage.setItem('tact-user', user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tact-user');
  };
  return (
    <>
      <UIProvider theme={customTheme}>
        <context.Provider value={{ user, login, logout, JSON_HEADER, BASE_URL }}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/splash" />}
              />
              <Route
                path="/splash"
                element={<SplashPage />}
              />

              {/* デモで最低限必要 */}
              <Route
                path="/try"
                element={<MediaRecorer />}
              />
              <Route path="/question">
                <Route
                  path="form"
                  element={<QuestionPage />}
                />
                <Route
                  path="intro"
                  element={<QuestionIntroPage />}
                />
                <Route
                  path="complete"
                  element={<QuestionCompletePage />}
                />
              </Route>
              <Route
                path="/home"
                element={<HomePage />}
              />
              <Route
                path="/partner"
                element={<PartnerPage />}
              />
              <Route
                path="/mode"
                element={<ModePage />}
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
                  path="partnerlog"
                  element={<PartnerLogPage />}
                />
                <Route
                  path="approval"
                  element={<ApprovalPage />}
                />

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
                element={<Navigate to="/login" />}
              />
            </Routes>
          </BrowserRouter>
        </context.Provider>
      </UIProvider>
    </>
  );
}

export default App;
