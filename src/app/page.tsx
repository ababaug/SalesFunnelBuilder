import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Build High-Converting Sales Funnels with AI
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Generate complete, professional, mobile-responsive sales pages in minutes. Just describe your product and let AI do the rest.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg">Start Building Free</Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">Watch Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle>AI Copywriting</CardTitle>
                <CardDescription>Persuasive sales copy generated in seconds.</CardDescription>
              </CardHeader>
              <CardContent>
                Our AI engine writes high-converting headlines, benefit-driven product descriptions, and compelling calls to action based on your product details.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Beautiful Templates</CardTitle>
                <CardDescription>Designed for maximum conversion.</CardDescription>
              </CardHeader>
              <CardContent>
                Choose from a variety of professional templates tested for high conversion rates. Fully customizable to match your brand.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Seamless Checkout</CardTitle>
                <CardDescription>Built-in payments and lead generation.</CardDescription>
              </CardHeader>
              <CardContent>
                Integrate with Stripe, Paystack, or Flutterwave instantly. Collect leads or process orders securely right on your funnel.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
