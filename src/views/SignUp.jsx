import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { Checkbox } from "@/components/ui/checkbox"


export function SignUp() {
    const [checked, setChecked] = useState(false);
    const {createUserForm, handleSignupFormChange, handleSignup} = useContext(UserContext);

    return (
        <div className="flex justify-center items-center min-h-screen w-sm">
            <Card className="w-full max-w-sm h-fit">
                    <CardHeader className="text-center">
                        <CardTitle className="font-bold text-2xl">Create your account</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSignup}>
                        <CardContent className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    autoFocus
                                    value={createUserForm.fullName}
                                    onChange={handleSignupFormChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    pattern="^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                                    required
                                    value={createUserForm.email}
                                    onChange={handleSignupFormChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    name="password"
                                    type={checked ? "text" : "password" } 
                                    required 
                                    minLength="8"
                                    maxLength="16"
                                    value={createUserForm.password}
                                    onChange={handleSignupFormChange}
                                />
                                <div className="flex gap-2">
                                    <Checkbox 
                                        checked={checked} 
                                        onCheckedChange={() => setChecked(checked ? false : true)} 
                                    />
                                    <Label htmlFor="showPassword">Show password</Label>
                                </div>    
                            </div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </CardContent>
                    </form> 
                    <CardFooter className="flex-col gap-4">
                        <CardDescription>
                            Already have an account? <Link to='/login' className="text-blue-600 cursor-pointer underline-offset-4 hover:underline">Log in</Link>
                        </CardDescription>
                    </CardFooter>
            </Card>     
        </div>
        
    )
}
