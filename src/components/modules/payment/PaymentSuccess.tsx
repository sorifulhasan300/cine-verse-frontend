"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, Loader2, Crown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { subscriptionService } from "@/services/subscription.service";
import { updateSession } from "@/lib/auth-client";
import Link from "next/link";

interface SubscriptionStatus {
  success: boolean;
  status: string;
  message: string;
  data: {
    plan: string;
    currentPeriodEnd: string | null;
  } | null;
}

export default function PaymentSuccess() {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const checkStatus = async () => {
    try {
      setRefreshing(true);
      const response = await subscriptionService.checkSubscriptionStatus();
      if (response.success && response.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setStatus(response.data as any);
        setError(null);
        setLoading(false);
        // Update session to reflect new subscription status
        await updateSession();
      } else {
        setError(response.message || "Failed to verify subscription");
        setStatus(null);
        setLoading(false);
      }
    } catch {
      setError("An error occurred while verifying your subscription");
      setStatus(null);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Card className="w-full max-w-md bg-slate-900 border-slate-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Verifying Payment
            </h2>
            <p className="text-slate-400 text-center">
              Please wait while we confirm your subscription...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Card className="w-full max-w-md bg-slate-900 border-slate-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Payment Processing
            </h2>
            <p className="text-slate-400 text-center mb-6">
              {error ||
                "Your payment is being processed. Please check back later."}
            </p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/user">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isVerified = status.success && status.status === "verified";
  const plan = status.data?.plan || "Unknown";
  const endDate = status.data?.currentPeriodEnd
    ? new Date(status.data.currentPeriodEnd).toLocaleDateString()
    : "N/A";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-900 border-slate-800">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Payment Successful!
          </CardTitle>
          <p className="text-slate-400 text-lg">Welcome to CineVerse Premium</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-yellow-500" />
                <span className="text-white font-semibold">
                  {plan === "YEARLY" ? "Yearly Plan" : "Monthly Plan"}
                </span>
              </div>
              <Badge
                variant="secondary"
                className={`${
                  isVerified
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {isVerified ? "Active" : "Processing"}
              </Badge>
            </div>

            {status.data?.currentPeriodEnd && (
              <div className="flex items-center gap-3 text-slate-300">
                <Calendar className="w-5 h-5" />
                <span>
                  Valid until: <span className="font-semibold">{endDate}</span>
                </span>
              </div>
            )}
          </div>

          <div className="text-center space-y-4">
            <p className="text-slate-400">
              Thank you for subscribing! You now have unlimited access to our
              premium content.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/">Go to Home</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-slate-700 hover:bg-slate-800"
              >
                <Link href="/user">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
