import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
    return (
        <section className="flex items-center justify-center w-screen h-screen">
            <SignUp />
        </section>
    );
};

export default SignUpPage;
