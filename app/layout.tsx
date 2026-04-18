import './globals.css';
import {AuthProvider} from "../src/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  
  return (
    <html lang="it">
      <body className="flex background-gray-100 min-h-screen background-gray-100">
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}


