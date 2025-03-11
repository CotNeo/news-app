import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function NewsCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-none shadow-md">
        <Skeleton className="h-48 w-full rounded-b-none" />
        <CardHeader className="p-4 pb-0 space-y-2">
          <Skeleton className="h-6 w-full mb-1" />
          <Skeleton className="h-6 w-4/5" />
          <div className="flex gap-2 mt-1">
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </CardFooter>
      </Card>
    </motion.div>
  );
} 