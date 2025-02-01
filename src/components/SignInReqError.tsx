import { Link } from "react-router"

const SignInReqError = () => {
    return (
        <section className="bg-info/20">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
                        SIGN IN
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold opacity-50 md:text-4xl">
                        You need to sign in
                    </p>
                    <p className="mb-4 text-lg font-light opacity-80">
                        Sorry, you can't access this page. You'll need to sign in to continue.
                    </p>
                    <Link to="/" className="btn my-4">
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default SignInReqError