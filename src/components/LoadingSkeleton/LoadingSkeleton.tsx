import { Box, Card, CardContent, Skeleton } from "@mui/material";

export interface LoadingSkeletonProps {
  variant?: "card" | "list" | "table" | "text";
  count?: number;
}

const LoadingSkeleton = ({
  variant = "card",
  count = 3,
}: LoadingSkeletonProps) => {
  const renderCardSkeleton = () => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Skeleton
          variant="rectangular"
          height={140}
          sx={{ mb: 2, borderRadius: 1 }}
        />
        <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </CardContent>
    </Card>
  );

  const renderListSkeleton = () => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="60%" />
      </Box>
    </Box>
  );

  const renderTableSkeleton = () => (
    <Box sx={{ mb: 1 }}>
      <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} />
    </Box>
  );

  const renderTextSkeleton = () => (
    <Box sx={{ mb: 2 }}>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="70%" />
    </Box>
  );

  const skeletonMap = {
    card: renderCardSkeleton,
    list: renderListSkeleton,
    table: renderTableSkeleton,
    text: renderTextSkeleton,
  };

  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>{skeletonMap[variant]()}</Box>
      ))}
    </Box>
  );
};

export default LoadingSkeleton;
