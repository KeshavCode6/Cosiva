"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaFacebook, FaGoogle } from "react-icons/fa"
import { TiVendorMicrosoft } from "react-icons/ti"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { useRouter } from "next/navigation"
import Logo from "@/components/navbar/logo"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Authentication() {
  const { signIn, signUp, firebaseUser } = useFirebaseAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [feedback, setFeedback] = useState<{ message: string; type: "error" | "success" } | null>(null)

  const handleTabChange = (value: string) => {
    setActiveTab(value as "login" | "signup")
    setFeedback(null)
  }

  useEffect(() => {
    if (firebaseUser) {
      router.push("/dashboard")
    }
  }, [firebaseUser, router])

  const handleLogin = async () => {
    try {
      await signIn("email", email, password)
      setFeedback({ message: "Login successful!", type: "success" })
    } catch (error: any) {
      let errorMessage = "Login failed. Please check your credentials.";

      if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid. Please check your email.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      }

      setFeedback({ message: errorMessage, type: "error" })
    }
  }

  const handleSignUp = async () => {
    try {
      await signUp(email, password)
      setFeedback({ message: "Sign up successful! ", type: "success" })
    } catch (error: any) {
      let errorMessage = "Sign up failed. Please try again.";

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use. Please use a different one.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid. Please check your email.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "The password is too weak. Please use a stronger password.";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "Email/password accounts are not enabled. Please check your Firebase settings.";
      }

      setFeedback({ message: errorMessage, type: "error" })
    }
  }


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px] flex flex-col">
        <CardHeader className="flex items-center">
          <Logo />
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            {feedback && (
              <Alert variant={feedback.type === "error" ? "destructive" : "default"}>
                <AlertDescription>{feedback.message}</AlertDescription>
              </Alert>
            )}
            <div className="my-2">
              <Label htmlFor="email-login">Email</Label>
              <Input
                id="email-login"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-2">
              <Label htmlFor="password-login">Password</Label>
              <Input
                id="password-login"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full my-2" onClick={activeTab == "login" ? handleLogin : handleSignUp}>
              {activeTab == "login" ? "Login" : "Sign Up"}
            </Button>

            <p className="text-sm text-center">
              {"Forgot your password? "}
              <Button variant="link" className="p-0">
                Reset it
              </Button>
            </p>

          </Tabs>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center mt-6">
            <Button variant="outline" size="icon">
              <FaFacebook />
            </Button>
            <Button variant="outline" size="icon" onClick={async () => await signIn("google")}>
              <FaGoogle />
            </Button>
            <Button variant="outline" size="icon">
              <TiVendorMicrosoft />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}

