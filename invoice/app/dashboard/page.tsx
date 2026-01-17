import LogoutButton from "../logout/page";

export default function dashboardPage (){
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
             <p>You are Logged in </p>

             <div className="mt-4"></div>
             <LogoutButton />
        </div>
    )
}