"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function ButtonTest() {
  return (
    <Button
      onClick={() =>
        toast({
          title: "Test",
        })
      }>
      Button
    </Button>
  );
}
