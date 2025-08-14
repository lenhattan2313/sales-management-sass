"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Home, Shield } from "lucide-react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorDetails = (errorCode: string | null) => {
    switch (errorCode) {
      case "AccessDenied":
        return {
          title: "Access Denied",
          description: "You don't have permission to access this resource.",
          icon: Shield,
        };
      case "Configuration":
        return {
          title: "Configuration Error",
          description:
            "There is a problem with the authentication configuration.",
          icon: AlertTriangle,
        };
      case "Verification":
        return {
          title: "Verification Failed",
          description: "The verification link is invalid or has expired.",
          icon: AlertTriangle,
        };
      default:
        return {
          title: "Authentication Error",
          description: "An unexpected error occurred during authentication.",
          icon: AlertTriangle,
        };
    }
  };

  const errorDetails = getErrorDetails(error);
  const IconComponent = errorDetails.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <IconComponent className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {errorDetails.title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {errorDetails.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <Button asChild className="w-full">
                <Link href="/auth/signin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Home
                </Link>
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Error Code:</strong> {error}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
