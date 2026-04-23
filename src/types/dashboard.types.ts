export interface UserStatistics {
  success: boolean;
  message: string;
  data: {
    personalStats: {
      raw: {
        watchList: number;
        likes: number;
        reviews: number;
        comments: number;
      };
      barChart: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
    };
    subscription: null;
    activity: {
      reviewsByMonth: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
    };
  };
}

export interface AdminStatistics {
  success: boolean;
  message: string;
  data: {
    users: {
      total: number;
      byRole: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
      byStatus: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
    };
    movies: {
      total: number;
      byPricing: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
      byCategory: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
    };
    reviews: {
      total: number;
      averageRating: number;
      byStatus: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
    };
    subscriptions: {
      total: number;
      byPlan: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
      byStatus: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
    };
  };
}
