"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // ✅ Add this import
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner"; // ✅ Adjust path if needed
import { useTRPC } from "@/trpc/client";

const Page = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();

  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background job started");
    },
  }));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value: value })}
        className="mt-4"
      >
        Invoke Background Job
      </Button>
    </div>
  );
};

export default Page;
