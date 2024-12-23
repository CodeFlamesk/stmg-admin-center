import Container from "@/components/Container";

import Image from "next/image";

export default async function Signin() {
    return (
        <Container styles="flex justify-between  xl:flex-row  flex-col ">
            <div className="pt-52 flex flex-col items-center justify-center  w-full">
                <p className="text-3xl font-bold text-center">
                    Sign in to your accountв
                </p>
             {/*    <form  className="flex max-w-[358px] w-full flex-col pt-[70px]">
                    <label htmlFor="Email" className="auth-text">Email</label>
                    <input type="email" id="Email" className="auth-input  input-shadow inputs focus:outline-none    focus:ring-0" placeholder="Email" required/>
                    <label htmlFor="password" className="auth-text pt-6">Password</label>
                    <input type="password" id="password" className="auth-input  input-shadow inputs focus:outline-none  focus:ring-0" placeholder="Password" required/>
                    <button className="mt-[26px] flex text-textwhite  text-base font-medium  justify-center items-center px-6 py-[11px] bg-btn rounded-md  border-2 border-btn hover:bg-opacity-0 hover:text-btn duration-500  transition-all  ease-in-out  ">
                        Sign In
                    </button>

                </form> */}
          
            </div>
            <div className="object-cover mx-auto w-full max-w-[358px]  xl:max-w-[44%] mt-[70px] " >
                <Image
                    src="/stmg-big.png"
                    alt="big-logo"
                    className="w-full h-full"
                    width={640}
                    height={640}
/>

            </div>
        </Container>
    );
}