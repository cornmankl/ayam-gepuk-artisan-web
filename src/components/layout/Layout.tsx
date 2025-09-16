import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AIAssistant from '../ai/AIAssistant';
import OrderButton from '../ordering/OrderButton';
import CookieConsent from '../privacy/CookieConsent';
import { PerformanceMonitor } from '../../utils/performance';
import ButtonTest from '../../test/ButtonTest';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-yellow-50/80">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <AIAssistant />
      <OrderButton />
      <Footer />
      <CookieConsent
        onAccept={preferences => {
          console.log('Cookie preferences accepted:', preferences);
        }}
        onReject={() => {
          console.log('All cookies rejected');
        }}
        onCustomize={preferences => {
          console.log('Cookie preferences customized:', preferences);
        }}
      />
      <PerformanceMonitor />
      {process.env.NODE_ENV === 'development' && <ButtonTest />}
    </div>
  );
}
