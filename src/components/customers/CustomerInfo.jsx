import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
} from 'react-router-dom';

import { useQuery, QueryClientProvider, QueryClient } from 'react-query';
import { CustomerData } from './CustomerData';
import Loading from '../global/Loading';

const fetchCustomer = async (id) => {
  const response = await fetch(
    `https://noworriesmovingcrm-default-rtdb.firebaseio.com/customers.json?orderBy="Record Id"&equalTo="${id}"`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};

const Customer = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('id');

  const { isLoading, isError, data } = useQuery({
    queryKey: 'customer',
    queryFn: () => fetchCustomer(customerId),
  });

  if (isLoading) return <Loading />;

  if (isError) return <p>Something went wrong! Try again</p>;

  return <CustomerData data={data} />;
};

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/customers', element: <Customer /> },
]);

const CustomerInfo = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default CustomerInfo;
