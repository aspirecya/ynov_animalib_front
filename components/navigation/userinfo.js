import { useSession, signIn, signOut } from "next-auth/react"

export default function UserInformation() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex items-center">
                <div>
                    <img className="inline-block h-9 w-9 rounded-full"
                         src="/veterinarian.png"
                         alt=""/>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{session.user.name}</p>
                    <p className="text-xs font-medium text-gray-500 hover:underline hover:cursor-pointer">View profile</p>
                    <p className="text-xs font-medium text-gray-500 hover:underline hover:cursor-pointer" onClick={() => signOut()}>Log out</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center">
            <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Not logged in</p>
                <div className="flex">
                    <p className="text-xs font-medium text-gray-500 hover:underline group-hover:text-gray-700 cursor-pointer" onClick={() => signIn()}>Log in </p>
                    <p className="text-xs font-medium text-gray-500">&nbsp;|&nbsp;</p>
                    <a className="text-xs font-medium text-gray-500 hover:underline group-hover:text-gray-700 cursor-pointer" href={"/auth/register"}>Sign up</a>
                </div>
            </div>
        </div>
    )
}