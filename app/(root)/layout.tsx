import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
     <div className="flex flex-col h-screen">
  <Header />
          <main >
          
            {children}
          </main>
        <Footer/>
     </div>
      
    );
  }