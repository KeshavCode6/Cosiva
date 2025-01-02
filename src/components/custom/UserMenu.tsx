import { useRouter } from "next/router";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useAuth } from "@/lib/authContext";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { ThreeDots } from "./Loading";


export function UserMenu() {
    const { user, status, logOut } = useAuth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full w-9 h-9">
                    <Avatar>
                        <AvatarFallback>          
                            {user?.displayName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-w-72">
                <DropdownMenuLabel>{user?.email || user?.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={logOut} className="hover:cursor-pointer">Log out</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
