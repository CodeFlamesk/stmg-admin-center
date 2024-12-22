import Image from "next/image";
import Container from "./Container";
import { SignedIn, SignedOut, SignInButton, SignUp, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
const Header: React.FC = () => {
    return (
        <header>
            <Container styles='flex py-5 items-center justify-between '>
               
                <Link href="/" className="flex text-xl font-bold">
                    STMG
                </Link>
                  
                <nav className=" font-medium flex-wrap">
                        <ul className="hover:text-purple duration-300 transition-all ease-in-out cursor-pointer">Games/training</ul>
                    </nav>
             <div>
            
                <div className=" font-medium text-dark items-center flex" >
                <SignedOut>
  <div className="flex gap-x-4">
   <p className="hover:text-purple duration-300 transition-all ease-in-out"><SignInButton mode="modal" /></p> 
   
  </div>
</SignedOut>

<SignedIn>
  <UserButton />
</SignedIn>

                </div>
          
             </div>

            </Container>
        </header>
    );
};

export default Header;
