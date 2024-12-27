import Image from "next/image";
import Container from "../Container";
import { SignedIn, SignedOut, UserButton, } from "@clerk/nextjs";
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

                  
                <SignedIn>
            <UserButton  />
          
          </SignedIn>
          <SignedOut>
            <button >
              <Link href="/sign-in">
                Login
              </Link>
            </button>
          </SignedOut>
                </div>

            </Container>
        </header>
    );
};

export default Header;
