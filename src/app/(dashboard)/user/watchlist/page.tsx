import React from "react";
import { WatchListGrid } from "@/components/modules/dashboard/user/WatchList";
import { watchListService } from "../../../../services/watch-list.service";

export const dynamic = 'force-dynamic';

async function WatchListPage() {
  const { data: watchList, error } = await watchListService.getMyWatchList();
  console.log(watchList);
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 text-lg">Failed to load watchlist</p>
        <p className="text-gray-400 text-sm mt-2">{error}</p>
      </div>
    );
  }

  return <WatchListGrid watchList={watchList || []} />;
}

export default WatchListPage;
