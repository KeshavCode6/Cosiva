'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FaGoogle, FaTwitter, FaGithub } from "react-icons/fa"
import { CiMail } from "react-icons/ci"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LoginModalProps {
    signIn: (provider?: string, email?: string, password?: string) => void
    signUp: (email: string, password: string) => void
    setIsLoginOpen: (isOpen: boolean) => void
    isLoginOpen: boolean
}

export default function LoginModal({ signIn, signUp, setIsLoginOpen, isLoginOpen }: LoginModalProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        signIn("email", email, password)
    }

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        signUp(signUpEmail, signUpPassword)
    }

    return (
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
                <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Authentication</DialogTitle>
                    <DialogDescription>
                        Login or create an account to get started.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" onClick={()=>{signIn(signUpEmail, signUpPassword)}}>
                                <CiMail className="mr-2 h-4 w-4" />
                                Login with Email
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="signup">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signUpEmail">Email</Label>
                                <Input
                                    id="signUpEmail"
                                    type="email"
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signUpPassword">Password</Label>
                                <Input
                                    id="signUpPassword"
                                    type="password"
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" onClick={()=>{signUp(signUpEmail, signUpPassword)}}>
                                <CiMail className="mr-2 h-4 w-4" />
                                Sign Up with Email
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
                <div className="relative mt-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="mt-4 flex w-full justify-center gap-4">
                    <Button onClick={() => signIn("google")} variant="outline" className="h-10 w-10 p-0">
                        <FaGoogle className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => signIn("twitter")} variant="outline" className="h-10 w-10 p-0">
                        <FaTwitter className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => signIn("github")} variant="outline" className="h-10 w-10 p-0">
                        <FaGithub className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

