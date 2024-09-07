import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to NEAR Founder Copilot</h1>
      <p className="text-lg mb-6">Sign in with your GitHub account to get started</p>
      <LoginButton />
      <p className="mt-4 text-xs text-gray-500">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
