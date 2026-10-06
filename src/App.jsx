import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WorldProvider } from '@/contexts/WorldContext';
import { MotionConfig, LayoutGroup } from 'framer-motion';
import ErrorBoundary from '@/components/ErrorBoundary';

function App({ helmetContext }) {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <ErrorBoundary>
          <WorldProvider>
            <MotionConfig reducedMotion="user">
              <LayoutGroup>
                <Layout>
                  <RoutesConfig />
                </Layout>
              </LayoutGroup>
            </MotionConfig>
          </WorldProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
