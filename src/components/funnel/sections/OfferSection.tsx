import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderForm } from "../OrderForm";
import { useState } from "react";

export function OfferSection({ content, isEditing, funnelId }: { content: any; isEditing?: boolean; funnelId?: string }) {
  const price = content.price ?? 99;
  const originalPrice = content.originalPrice ?? 199;
  const currency = content.currency || "$";
  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <section className="w-full py-12 md:py-24 relative group bg-muted/10">
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
           <Button variant="outline" size="sm">Edit Section</Button>
        </div>
      )}
      <div className="container px-4 md:px-6 mx-auto flex justify-center">
        <Card className="w-full max-w-lg border-primary/50 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg font-medium text-sm">
            Best Value
          </div>
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-3xl font-bold">{content.headline || "Limited Time Offer"}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 text-center">
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-extrabold">{currency}{price}</span>
              {originalPrice && (
                <span className="text-xl text-muted-foreground line-through">{currency}{originalPrice}</span>
              )}
            </div>
            {content.guaranteeText && (
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                ✓ {content.guaranteeText}
              </p>
            )}

            {!isEditing && showOrderForm ? (
              <OrderForm
                funnelId={funnelId || ""}
                productName={content.headline || "Offer"}
                price={price}
                currency={currency}
                ctaText={content.ctaText}
              />
            ) : null}

            {(!showOrderForm || isEditing) && (
              <div className="w-full mt-6">
                <Button
                  size="lg"
                  className="w-full text-lg h-14"
                  onClick={() => !isEditing && setShowOrderForm(true)}
                >
                  {content.ctaText || "Claim Offer Now"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
