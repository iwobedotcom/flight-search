import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import FlightsSkeleton from "./FlightsSkeleton";
import { FlightTable } from "./Flights/FlightTable";

interface FlightContentProps {
  isLoading: boolean;
  isError: boolean;
  hasSearch: boolean;
  hasResults: boolean;
  flights: any[];
  onRetry: () => void;
}

export function FlightContent({
  isLoading,
  isError,
  hasSearch,
  hasResults,
  flights,
  onRetry,
}: FlightContentProps) {
  if (isLoading) {
    return <FlightsSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Something went wrong"
        message="We couldn't fetch flight results. Please try again."
        onRetry={onRetry}
      />
    );
  }

  if (!hasSearch) {
    return (
      <EmptyState
        title="Search for flights"
        message="Enter your origin, destination, and dates to see available flights."
      />
    );
  }

  if (!hasResults) {
    return (
      <EmptyState
        title="No flights found"
        message="Try adjusting your dates or filters to see more results."
      />
    );
  }

  return <FlightTable rows={flights} loading={false} />;
}
