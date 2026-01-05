import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
    return (
        <section className="flex items-center justify-center w-screen h-screen">
            <SignIn />
        </section>
    );
};

export default LoginPage;
